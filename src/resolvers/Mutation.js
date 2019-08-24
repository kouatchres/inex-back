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
  
    const division = await ctx.db.mutation.createDivision({


data: { region: {connect: {id: args.region }}, ...args }
            }, info);
            return division;
    },


   async  createRegion(parents, args, ctx, info) {
       
       const region =  await ctx.db.mutation.createRegion({
           data: {
               ...args
            }
        }, info);
        return region;
    },
    



async  createItem(parents, args, ctx, info) {
 const item =  await ctx.db.mutation.createItem({
                      data: {
                          ...args
                      }
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
      
};

module.exports = Mutation;