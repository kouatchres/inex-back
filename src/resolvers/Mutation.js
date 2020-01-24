const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
// require('dotenv').config({path: '../variables.env'});


const Mutation = {


  async  createCandidate(parents, args, ctx, info) {

    const newCand = {...args};
    const {gender,...others}= newCand
const candidate = await ctx.db.mutation.createCandidate({
                data: {
                  gender:{
                    connect:{id: gender.id },
                  },
            ...others,
                },
            }, info);
          
            return candidate;
    },

  async  createDivision(parents, args, ctx, info) {
  console.log('we are in create division of mutations') 
  console.log(args) ;
//    make a copy  of the args
   const newRegs = {...args};
   // show the region name from the new regions array because will not have to update the id

  const {region, ...others}=newRegs

    const division = await ctx.db.mutation.createDivision({
        data: {
         ...others,
             region: {
                connect: {id:region.id },
                }, 
            },
    }, info);
    console.log(args);
            return division;
    },

    
    

  async  createSubDivision(parents, args, ctx, info) {
  
//    make a copy  of the args
   const newDivs = {...args};
   // show the region name from the new regions array because will not have to update the id

  const { division,...others}=newDivs

    const subDivision = await ctx.db.mutation.createSubDivision({
        data: {
          division: {
            connect: {id:division.id },
          }, 
           ...others,          
            },
    }, info);
    console.log(args);
            return subDivision;
    },


  async  createTown(parents, args, ctx, info) {
  console.log('we are in create town mutation') 
  console.log(args) ;
//    make a copy  of the args
   const newTowns = {...args};
   // show the region name from the new regions array because will not have to update the id

  const { subDiv,...others}=newTowns

    const town = await ctx.db.mutation.createTown({
        data: {
          subDiv: {
            connect: {id:subDiv.id },
          }, 
           ...others,          
            },
    }, info);
    console.log(args);
            return town;
    },

    

  async  createCenter(parents, args, ctx, info) {
//    make a copy  of the args
   const newCenters = {...args};
   // show the region name from the new regions array because will not have to update the id

  const {town, ...others}=newCenters

    const center = await ctx.db.mutation.createCenter({
        data: {
          town: {
            connect: {id:town.id },
          }, 
           ...others,
          },
    }, info);
    console.log(args);
            return center;
    },

    
    
    

    

  async  createRegistration(parents, args, ctx, info) {
  console.log(args) ;
  // console.log(ctx)
//    make a copy  of the args
   const newRegistartionInfos = {...args};
   // show the region name from the new regions array because will not have to update the id
  const {candidate,  center, series, session, exam}=newRegistartionInfos
  const [existingRegistration] = await ctx.db.query.registrations({
    where: {
      candidate: {candCode:candidate.candCode},
      session: {id: session.id},
      exam: {id: exam.id},
     },
   });
   if (existingRegistration){
     throw new Error('Vous etes deja inscrit a cet examen pour cette annee')
   }
 
  
  const where= {id: args.series.id}
  let subjsOfSeries = await ctx.db.query.series({where}, 
   
    `
     { 
        id
        subjectSeries{
          id
        subject {
          id
          subjectName
         subjectCode
        
      }}}`
      )

      console.log('line 154')
      const {subjectSeries} = subjsOfSeries
      
     // //make an array of the subjects for the candidate according to the chosen series 
const subjectScoreItems =subjectSeries.map(item=>{
  
  //each subject with the accompanying attributes
  const subjectScoreItems= {
   subject: {
     connect:{
       id: item.subject.id}
    }  

  }
  console.log(subjectScoreItems)
return subjectScoreItems;
});

//now  drop the list of subjects on the score table linking it up with the just created registration

const newRegistration = ctx.db.mutation.createRegistration({
  data: {
          
          center: {
            connect: {id:center.id },
          }, 
          series: {
            connect: {id:series.id },
          }, 
          session: {
            connect: {id:session.id },
          }, 
          exam: {
            connect: {id:exam.id },
          }, 
          candidate: {
            connect: {candCode: candidate.candCode },
          }, 
          scores: {
            create:subjectScoreItems,
          },
        },
}, info);

       return newRegistration;
  },

    

//   async  createRegistrationz(parents, args, ctx, info) {
//   console.log(args) ;
// //    make a copy  of the args
//    const newRegistartionInfos = {...args};
//    // show the region name from the new regions array because will not have to update the id
//   const {candExamSession , candidate,  center, series, session, exam}=newRegistartionInfos

//     const newRegistration = await ctx.db.mutation.createRegistration({
//         data: {
          
//           center: {
//             connect: {id:center.id },
//           }, 
//           series: {
//             connect: {id:series.id },
//           }, 
//           session: {
//             connect: {id:session.id },
//           }, 
//           exam: {
//             connect: {id:exam.id },
//           }, 
//           candidate: {
//             connect: {candCode: candidate.candCode },
//           }, 
//           candExamSession ,
//         },
//     }, info);
//     console.log(args);
//        return newRegistration;
//   },

    

  async  createCenterAdmin(parents, args, ctx, info) {
  console.log(args) ;
//    make a copy  of the args
   const newCenterAdminInfos = {...args};
   // show the region name from the new regions array because will not have to update the id

  const { center, rank, session, exam }=newCenterAdminInfos
   const [existingCenterAdmin] = ctx.db.query.centerAdmins({
     where:{
     center:{id: center.id},
     rank:  {id:rank.id },
     session: {id:session.id },
     exam:   {id:exam.id },
     },
   });

   if(existingCenterAdmin){
     throw new Error('Quelcun est deja inscrit a cette position pour ce centre, session et examen')
   }

    const centerAdmin = await ctx.db.mutation.createCenterAdmin({
        data: {
          center: {
            connect: {id:center.id },
          }, 
          rank: {
            connect: {id:rank.id },
          }, 
          session: {
            connect: {id:session.id },
          }, 
          exam: {
            connect: {id:exam.id },
          },
            
            },
    }, info);
    console.log(args);
            return centerAdmin;
    },

    
  async  createSubjectSeries(parents, args, ctx, info) {
  console.log(args) ;
//    make a copy  of the args
   const subjSeriesInfos = {...args};
   // show the region name from the new regions array because will not have to update the id

  const {  subject, series }=subjSeriesInfos
  const [existingSubj] = await ctx.db.query.subjectSerieses({
   where: {
     series: {id:series.id},
     subject: {id: subject.id},
    },
  });
  if (existingSubj){
    throw new Error('Cette matiere est deja presente pour  la series')
  }

    const subjSeries = await ctx.db.mutation.createSubjectSeries({
      data: {
       
          subject:{
          connect:{id: subject.id},
          },
         
          series: {
            connect: {id:series.id },
          },
            },
    }, info);
    console.log(args);
            return subjSeries;
    },

    
   async  createRegion(parents, args, ctx, info) {
       
       const region =  await ctx.db.mutation.createRegion({
           data: {...args}
        }, info);
        return region;
    },
    
   async  createSubjectType(parents, args, ctx, info) {
       
       const subjectType =  await ctx.db.mutation.createSubjectType({
           data: {...args}
        }, info);
        return subjectType;
    },
    
    
    
   async  createRank(parents, args, ctx, info) {
       
       const rank =  await ctx.db.mutation.createRank({
           data: {...args}
        }, info);
        return rank;
    },
    
    
    
   async  createEducationType(parents, args, ctx, info) {
     const allArgs ={...args}
     const {exam, ...others} = allArgs
       
       const educationType =  await ctx.db.mutation.createEducationType({
           data: {
             exam:{
               connect:{id: exam.id}
             },
            ...others}
        }, info);
        return educationType;
    },
    
    
    
   async  createExam(parents, args, ctx, info) {
       
       const exam =  await ctx.db.mutation.createExam({
           data: {...args}
        }, info);
        return exam;
    },
    
   async  createSession(parents, args, ctx, info) {
       
       const session =  await ctx.db.mutation.createSession({
           data: {...args}
        }, info);
        return session;
    },
    
   async  createReport(parents, args, ctx, info) {
       const  allArgs = {...args}
       const { centerAdmin,...others } = allArgs ;
       const report =  await ctx.db.mutation.createReport({
           data: {
             centerAdmin: {
               connect: {authCode: centerAdmin.authCode}
             },
         ...others,
            },
        }, info);
        return report;
    },
    
   async  createPresence(parents, args, ctx, info) {
       
       const presence =  await ctx.db.mutation.createPresence({
           data: {...args}
        }, info);
        return presence;
    },
    
   async  createSeries(parents, args, ctx, info) {
    //make a copy  of the args
    const newEducTypes = {...args};
    // show the region name from the new regions array because will not have to update the id
 
   const { educationType, ...others}=newEducTypes
 
       const  series =  await ctx.db.mutation.createSeries({

           data: {
             educationType:{
              connect: {id:educationType.id },
             },
             ...others,
            },
            }, info);
        return series;
    },
    
   async  createSubject(parents, args, ctx, info) {
       
     const newSbujectTypes = {...args};
       const {  subjectType, subjectName, subjectCode} = newSbujectTypes
    // const [existingSubject] = ctx.db.query.subjects({
    //   where:{
    //   subjectName:subjectName,
    //    subjectCode: subjectCode
    //   },
    // });
     
    // if(existingSubject) {
    //   throw new Error('Cette matiere est deja  inscrite')
    // }
       const subject =  await ctx.db.mutation.createSubject({

            data: {
              subjectType:{
               connect: {id: subjectType.id },
              },
              subjectName,
              subjectCode,
            }
        }, info);
        return subject;
    },
    

    


async  createGender(parents, args, ctx, info) {
 const gender =  await ctx.db.mutation.createGender({
                      data: {
                          ...args
                        }
                  }, info);

                  console.log(gender);
                  return gender;
          },
async  createUser(parents, args, ctx, info) {
 const user =  await ctx.db.mutation.createUser({
                      data: {
                          ...args
                      }
                  }, info);

                  console.log(user);
                  return user;
                },


  updateCandidate(parent, args, ctx, info){
              // first get a copy of the updates
              const where ={ id:  args.id}; 
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the candidate update mutation!!')
              return ctx.db.mutation.updateCandidate({
                  data: updates,
                  where:{ id: args.id,} ,},info);
                  

          }, 

  updateDivision(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling division update mutation!!')
              return ctx.db.mutation.updateDivision({
                  data: updates,
                  where:{ id: args.id,} ,},info);
                  console.log(updates);
          }, 
      

  updateGender(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling Gender update mutation!!')
              return ctx.db.mutation.updateGender({
                  data: updates,
                  where:{ id: args.id,} ,},info);
                  console.log(updates);
          }, 
      
  updateRegion(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateRegion({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
      
  updateSubjectType(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateSubjectType({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
      
  updateSeries(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the update series mutation!!')
              return ctx.db.mutation.updateSeries({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateRank(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the update Rank mutation!!')
              return ctx.db.mutation.updateRank({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateSession(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the update Session mutation!!')
              return ctx.db.mutation.updateSession({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateEducationType(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the update Educ Type mutation!!')
              return ctx.db.mutation.updateEducationType({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },

  updateExam(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateExam({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateSubject(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateSubject({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateTown(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateTown({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateSubDivision(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateSubDivision({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },
  updateCenter(parent, args, ctx, info){
              // first get a copy of the updates
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the update center mutation!!')
              return ctx.db.mutation.updateCenter({
                  data: updates,
                  where:{ id: args.id} },info);
                  console.log(args.id);
                },

   async deleteCandidate(parent, args, ctx, info){
//   make a where variable 
const where= {id: args.id};
// 1 find the item
const candidate = await ctx.db.query.candidate({where}, info);

// 2. check if they own the item or have the permissions for the item
//   todo
// 3.delelte it
return ctx.db.mutation.deleteCandidate({where}, info);


 },

   async deleteRegion(parent, args, ctx, info){
//   make a where variable 
const where= {id: args.id};
// 1 find the item
const regionToDelete = await ctx.db.query.region({where}, info);

// 2. check if they own the item or have the permissions for the item
//   todo
// 3.delelte it
return ctx.db.mutation.deleteRegion({where}, info);
},


async signUp(parent, args, ctx, info) {
  const APP_SECRET='jwtsecret123'
  // lowercase their email
  args.email = args.email.toLowerCase();
  // hash their password
  const password = await bcrypt.hash(args.password, 10);
  // create the user in the database
  const user = await ctx.db.mutation.createUser(
    {
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] },
      },
    },
    info
  );
  // create the JWT token for them
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  // We set the jwt as a cookie on the response
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
  // Finally we return the user to the browser
  // console.log(`Your port is ${APP_SECRET}`);
  return  user

},

  

};
module.exports = Mutation;
