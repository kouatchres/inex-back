 const { forwardTo } =require('prisma-binding');
 
const Query = {
              async candidates(parent, args, ctx, info){
 const allCandidates = await ctx.db.query.candidates();
 return allCandidates;
              },
async candidate(parent, args, ctx, info){
              const where ={ id:  args.id}; 
 const oneCandidate = await ctx.db.query.candidate({where},info);
 return oneCandidate;
              },
async region(parent, args, ctx, info){
              const where ={ id:  args.id}; 
 const oneRegion = await ctx.db.query.region({where},info);
 return oneRegion;
              },
              async regions(parent, args, ctx, info){
 const allRegions = await ctx.db.query.regions();
 return allRegions;
              },
              async genders(parent, args, ctx, info){
 const allGenders = await ctx.db.query.genders();
 return allGenders;
              },
              async users(parent, args, ctx, info){
 const allUsers = await ctx.db.query.users();
 return allUsers;},
              async divisions(parent, args, ctx, info){
 const allDivisions = await ctx.db.query.divisions();
 return allDivisions;
              },
async division(parent, args, ctx, info){
 const where ={ id:  parent.id}; 
const oneDivision = await ctx.db.query.division({where},info);
 return oneDivision;
  },
              


};



module.exports= Query;