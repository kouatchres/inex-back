const Query = {
              async candidates(parent, args, ctx, info){
 const allCandidates = await ctx.db.query.candidates();
 return allCandidates;
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
 return allUsers;
              },
             
              async items(parent, args, ctx, info){
 const allItems = await ctx.db.query.items();
 return allItems;
              },
              async divisions(parent, args, ctx, info){
 const allDivisions = await ctx.db.query.divisions();
 return allDivisions;
              },
};



module.exports= Query;