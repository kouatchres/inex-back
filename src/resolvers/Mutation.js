const Mutation = {
  async  createCandidate(parents, args, ctx, info) {

    const newCand = {...args};
    const {
      cand1stName,
      cand2ndName,
      cand3rdName,
      email,
      phoneNumb,
      image,
      candCode,
      placeOfBirth,
      gender
    }= newCand
const candidate = await ctx.db.mutation.createCandidate({
                data: {
                  gender:{
                    connect:{id: gender.id },
                  },
                  cand1stName,
            cand2ndName,
            cand3rdName,
            email,
            phoneNumb,
            image,
            candCode,
            placeOfBirth
                },
            }, info);
            console.log('logging candidate properties')
            console.log(args)
            return candidate;
    },

  async  createDivision(parents, args, ctx, info) {
  console.log('we are in create division of mutations') 
  console.log(args) ;
//    make a copy  of the args
   const newRegs = {...args};
   // show the region name from the new regions array because will not have to update the id

  const {divName, divCode, region}=newRegs

    const division = await ctx.db.mutation.createDivision({
        data: {
          divName,
          divCode,
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

  const {subDivName, subDivCode, division}=newDivs

    const subDivision = await ctx.db.mutation.createSubDivision({
        data: {
          division: {
            connect: {id:division.id },
          }, 
            subDivName,
           subDivCode ,           
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

  const {townName, townCode, subDiv}=newTowns

    const town = await ctx.db.mutation.createTown({
        data: {
          subDiv: {
            connect: {id:subDiv.id },
          }, 
            townName,
           townCode ,           
            },
    }, info);
    console.log(args);
            return town;
    },

    

  async  createCenter(parents, args, ctx, info) {
//    make a copy  of the args
   const newCenters = {...args};
   // show the region name from the new regions array because will not have to update the id

  const {centerName,centerNumber, centerCode, town}=newCenters

    const center = await ctx.db.mutation.createCenter({
        data: {
          town: {
            connect: {id:town.id },
          }, 
            centerName,
           centerCode ,
           centerNumber
          },
    }, info);
    console.log(args);
            return center;
    },

    
    
    

    

  async  createRegistration(parents, args, ctx, info) {
  console.log(args) ;
//    make a copy  of the args
   const newRegistartionInfos = {...args};
   // show the region name from the new regions array because will not have to update the id

  const { candidate,  center, series, session, exam}=newRegistartionInfos

    const registration = await ctx.db.mutation.createRegistration({
        data: {
          candidate:{
          connect:{id: candidate.id}
          },
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

            },
    }, info);
    console.log(args);
            return registration;
    },

    
   async  createRegion(parents, args, ctx, info) {
       
       const region =  await ctx.db.mutation.createRegion({
           data: {...args}
        }, info);
        return region;
    },
    
    
    
   async  createRank(parents, args, ctx, info) {
       
       const rank =  await ctx.db.mutation.createRank({
           data: {...args}
        }, info);
        return rank;
    },
    
    
    
   async  createEducationType(parents, args, ctx, info) {
       
       const educationType =  await ctx.db.mutation.createEducationType({
           data: {...args}
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
       
       const report =  await ctx.db.mutation.createReport({
           data: {...args}
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
 
   const {seriesName, seriesCode, educationType}=newEducTypes
 
       const  series =  await ctx.db.mutation.createSeries({

           data: {
             educationType:{
              connect: {id:educationType.id },
             },
             seriesName,
             seriesCode
            },
            }, info);
        return series;
    },
    
   async  createSubject(parents, args, ctx, info) {
       
       const subject =  await ctx.db.mutation.createSubject({
           data: {...args}
        }, info);
        return subject;
    },
    

    

async  createItem(parents, args, ctx, info) {
 const item =  await ctx.db.mutation.createItem({
                      data: {
                          user:{
                              connect:{id: ctx.request.userId},
                          },
                          ...args,
                      },
                  }, info);

                  console.log(item);
                  return item;
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
              const updates = {...args};
              // remove the ID from the updates because will not have to update the id
              delete updates.id;
              // run the update method
              console.log('calling the mutation!!')
              return ctx.db.mutation.updateCandidate({
                  data: updates,
                  where:{ id: args.id,} ,},info);
                  console.log(updates);
                  console.log(args.id);
                  console.log(ctx);
                  

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


};
module.exports = Mutation;
