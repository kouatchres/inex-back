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
const oneRegion = 
await ctx.db.query.region({where},info);
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
    async gender(parent, args, ctx, info){
              const where ={ id:  args.id}; 
 const oneGender = await ctx.db.query.gender({where},info);
 return oneGender;
              },



async users(parent, args, ctx, info){
    const allUsers = await ctx.db.query.users();
 return allUsers;
    },
  async divisions(parent, args, ctx, info){
const allDivisions = await ctx.db.query.divisions();
return allDivisions;
   },
  async division(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneDivision = await ctx.db.query.division({where},info);
return oneDivision;
   },

                            
  async subDivisions(parent, args, ctx, info){
const allSubDivisions = await ctx.db.query.subDivisions();
return allSubDivisions;
   },
  async subDivision(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSubDivision = await ctx.db.query.subDivision({where},info);
return oneSubDivision;
   },
                            
  async centerAdminSignIn(parent, args, ctx, info){
    const where={authCode: args.authCode}
const centerAdmin = await ctx.db.query.subjectTypes({where},info);
const getCAID= centerAdmin.id
console.log(getCAID)
return getCAID;
   },
  async subjectTypes(parent, args, ctx, info){
const allSubjectTypes = await ctx.db.query.subjectTypes();
return allSubjectTypes;
   },
  async subjectType(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSubjectType = await ctx.db.query.subjectType({where},info);
return oneSubjectType;
   },

                            
                            
  async towns(parent, args, ctx, info){
const allTowns = await ctx.db.query.towns();
return allTowns;
   },
  async town(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneTown = await ctx.db.query.town({where},info);
return oneTown;
   },
                            
  async centers(parent, args, ctx, info){
const allCenters = await ctx.db.query.centers();
return allCenters;
   },
  async center(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneCenter = await ctx.db.query.center({where},info);
return oneCenter;
   },
                            
  async exams(parent, args, ctx, info){
const allExams = await ctx.db.query.exams();
return allExams;
   },
  async exam(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneExam = await ctx.db.query.exam({where},info);
return oneExam;
   },
                            
  async presences(parent, args, ctx, info){
const allPresences = await ctx.db.query.presences();
return allPresences;
   },
  async presence(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const onePresence = await ctx.db.query.presence({where},info);
return onePresence;
   },
                            
  async serieses(parent, args, ctx, info){
const allSeries = await ctx.db.query.serieses();
return allSeries;
   },
  async series(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSeries = await ctx.db.query.series({where},info);
return oneSeries;
   },
                            
  async subjects(parent, args, ctx, info){
const allSubject = await ctx.db.query.subjects();
return allSubject;
   },
  async subject(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSubject = await ctx.db.query.subject({where},info);
return oneSubject;
   },
                            
                    
                            
  async subjectSerieses(parent, args, ctx, info){
const allSubjectSeries = await ctx.db.query.subjectSerieses();
return allSubjectSeries;
   },
  async subjectSeries(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSubjectSeries = await ctx.db.query.subjectSeries({where},info);
return oneSubjectSeries;
   },
                            
  async reports(parent, args, ctx, info){
const allReport = await ctx.db.query.reports();
return allReport;
   },
  async report(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneReport = await ctx.db.query.report({where},info);
return oneReport;
   },
                            
  async sessions(parent, args, ctx, info){
const allSession = await ctx.db.query.sessions();
return allSession;
   },
  async session(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneSession = await ctx.db.query.session({where},info);
return oneSession;
   },
  async ranks(parent, args, ctx, info){
const allRank = await ctx.db.query.ranks();
return allRank;
   },
  async rank(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneRank = await ctx.db.query.rank({where},info);
return oneRank;
   },

  async educationTypes(parent, args, ctx, info){
const allEducationType = await ctx.db.query.educationTypes();
return allEducationType;
   },
  async educationType(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneEducationType = await ctx.db.query.educationType({where},info);
return oneEducationType;
   },

  async registrations(parent, args, ctx, info){
const allRegistration = await ctx.db.query.registrations();
return allRegistration;
   },
  async registration(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneRegistration = await ctx.db.query.registration({where},info);
return oneRegistration;
   },

  async centerAdmins(parent, args, ctx, info){
const allCenterAdmin = await ctx.db.query.centerAdmins();
return allCenterAdmin;
   },
  async centerAdmin(parent, args, ctx, info){
    const where ={ id:  args.id}; 
const oneCenterAdmin = await ctx.db.query.centerAdmin({where},info);
return oneCenterAdmin;
   },




}

module.exports= Query;