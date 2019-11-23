const Mutation = {
  async  createCandidate(parents, args, ctx, info) {

        const candidate = await ctx.db.mutation.createCandidate({
                data: {
                    ...args
                }
            }, info);
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
             region: {
                connect: {id:region.id },
                }, 
              divName,
              divCode
            },
    }, info);
    console.log(args);
            return division;
    },

    
    
    
   async  createRegion(parents, args, ctx, info) {
       
       const region =  await ctx.db.mutation.createRegion({
           data: {...args}
        }, info);
        return region;
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
