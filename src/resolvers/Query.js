const { forwardTo } = require('prisma-binding');


const Query = {

	registrationsConnection: forwardTo('db'),


	// async registrationsConnection(parent, args, ctx, info) {
	// 	const { candRegistrationNumber } = { ...args }

	// 	const candCount = await ctx.db.query.registrationsConnection({
	// 		where: {
	// 			candRegistrationNumber_contains: candRegistrationNumber.slice(0, -5)
	// 		}
	// 	}, info);

	// 	return candCount;
	// },
	async candidates(parent, args, ctx, info) {
		const allCandidates = await ctx.db.query.candidates();
		return allCandidates;
	},
	async candidate(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneCandidate = await ctx.db.query.candidate({ where }, info);
		return oneCandidate;
	},

	async region(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneRegion = await ctx.db.query.region({ where }, info);
		return oneRegion;
	},

	async regions(parent, args, ctx, info) {
		console.log(args);
		// const where ={ orderBy: {field: args.regionName, direction:DESC}};
		const allRegions = await ctx.db.query.regions();
		return allRegions;
	},

	async genders(parent, args, ctx, info) {
		const allGenders = await ctx.db.query.genders();
		return allGenders;
	},
	async gender(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneGender = await ctx.db.query.gender({ where }, info);
		return oneGender;
	},

	async users(parent, args, ctx, info) {
		const allUsers = await ctx.db.query.users();
		return allUsers;
	},
	async divisions(parent, args, ctx, info) {
		const allDivisions = await ctx.db.query.divisions();
		return allDivisions;
	},
	async division(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneDivision = await ctx.db.query.division({ where }, info);
		return oneDivision;
	},

	async subDivisions(parent, args, ctx, info) {
		const allSubDivisions = await ctx.db.query.subDivisions();
		return allSubDivisions;
	},
	async subDivision(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSubDivision = await ctx.db.query.subDivision({ where }, info);
		return oneSubDivision;
	},

	async  countRegisteredCandidates(parent, args, ctx, info) {
		console.log('in countRegistered Candidates')
		console.log(args)

		const where = { id: args.id }
		const getCount = await ctx.db.query.centerExamSessions({ where }, info)

		return getCount

	},

	async subjectTypes(parent, args, ctx, info) {
		const allSubjectTypes = await ctx.db.query.subjectTypes();
		return allSubjectTypes;
	},
	async subjectType(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSubjectType = await ctx.db.query.subjectType({ where }, info);
		return oneSubjectType;
	},

	async towns(parent, args, ctx, info) {
		const allTowns = await ctx.db.query.towns();
		return allTowns;
	},
	async town(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneTown = await ctx.db.query.town({ where }, info);
		return oneTown;
	},

	async centers(parent, args, ctx, info) {
		const allCenters = await ctx.db.query.centers();
		return allCenters;
	},
	async center(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneCenter = await ctx.db.query.center({ where }, info);
		return oneCenter;
	},
	async centerByNumber(parent, args, ctx, info) {
		console.log(args)
		const { centerNumber } = { ...args }
		const where = { centerNumber };
		const oneCenter = await ctx.db.query.center({ where }, info);

		if (!oneCenter) {
			throw new Error('Numéro de centre inexistent')
		}
		return oneCenter;
	},
	async centerByCode(parent, args, ctx, info) {
		console.log(args)
		const { centerCode } = { ...args }
		const where = { centerCode };
		const oneCenter = await ctx.db.query.center({ where }, info);

		if (!oneCenter) {
			throw new Error('Code centre inexistent')
		}
		return oneCenter;
	},

	async exams(parent, args, ctx, info) {
		const allExams = await ctx.db.query.exams();
		return allExams;
	},
	async exam(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneExam = await ctx.db.query.exam({ where }, info);
		return oneExam;
	},

	async scores(parent, args, ctx, info) {
		console.log('this is in the scores query');
		console.log(args);
		const where = { candExamSecretCode: args.candExamSecretCode };
		const allScores = await ctx.db.query.scores({ where }, info);
		return allScores;
	},
	async score(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneScore = await ctx.db.query.score({ where }, info);
		return oneScore;
	},

	async series(parent, args, ctx, info) {
		const allSeries = await ctx.db.query.serieses();
		return allSeries;
	},
	async serieses(parent, args, ctx, info) {
		const allSeries = await ctx.db.query.serieses();
		return allSeries;
	},

	async subjSeries(parent, args, ctx, info) {
		const where = { id: args.id };
		let subjsOfSeries = await ctx.db.query.series({ where }, info);
		return subjsOfSeries;
	},

	async series(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSeries = await ctx.db.query.series({ where }, info);
		return oneSeries;
	},

	async getCandidateByCode(parent, args, ctx, info) {
		console.log(args);
		const where = { candCode: args.candCode };
		const oneCanndidate = await ctx.db.query.candidates({ where }, info);
		return oneCanndidate;
	},

	async subjects(parent, args, ctx, info) {
		const allSubject = await ctx.db.query.subjects();
		return allSubject;
	},
	async subject(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSubject = await ctx.db.query.subject({ where }, info);
		return oneSubject;
	},

	async subjectSerieses(parent, args, ctx, info) {
		const allSubjectSeries = await ctx.db.query.subjectSerieses();
		return allSubjectSeries;
	},
	async subjectSeries(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSubjectSeries = await ctx.db.query.subjectSeries({ where }, info);
		return oneSubjectSeries;
	},

	async reports(parent, args, ctx, info) {
		const allReport = await ctx.db.query.reports();
		return allReport;
	},
	async report(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneReport = await ctx.db.query.report({ where }, info);
		return oneReport;
	},

	async centerExamSessionSerieses(parent, args, ctx, info) {
		console.log(args);
		const { centerExamSession, series } = { ...args };

		const where = {
			centerExamSession: { id: centerExamSession.id },
			series: { id: series.id }
		};
		return seriesExists = await ctx.db.query.centerExamSessionSerieses({ where }, info);

	},

	async centerExamSessionForResults(parent, args, ctx, info) {
		console.log(args);
		const { centerExamSession } = { ...args };


		const where = {
			centerExamSession: { id: centerExamSession.id },
		};
		const allCenterExamSessionSeries = await ctx.db.query.centerExamSessionForResults({ where }, info);
		return allCenterExamSessionSeries;
	},


	async centerExamSessions(parent, args, ctx, info) {
		console.log(args);
		const { center, examSession } = { ...args };

		const where = {
			examSession: { id: examSession.id },
			center: { id: center.id },
		};
		return [allCenterExamSession] = await ctx.db.query.centerExamSessions({ where }, info);
	},

	async centerExamSession(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneCenterExamSession = await ctx.db.query.centerExamSession({ where }, info);
		return oneCenterExamSession;
	},

	async sessions(parent, args, ctx, info) {
		const allSession = await ctx.db.query.sessions();
		return allSession;
	},
	async session(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneSession = await ctx.db.query.session({ where }, info);
		return oneSession;
	},
	async ranks(parent, args, ctx, info) {
		const allRank = await ctx.db.query.ranks();
		return allRank;
	},
	async rank(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneRank = await ctx.db.query.rank({ where }, info);
		return oneRank;
	},
	async examSessions(parent, args, ctx, info) {
		console.log(args)
		const { session, exam } = { ...args }
		const where = {
			session: { id: session.id },
			exam: { id: exam.id }
		}
		const allExamSessions = await ctx.db.query.examSessions({ where }, info);
		return allExamSessions;
	},





	async examSession(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneExamSession = await ctx.db.query.examSession({ where }, info);
		return oneExamSession;
	},

	async educationTypes(parent, args, ctx, info) {
		const allEducationType = await ctx.db.query.educationTypes();
		return allEducationType;
	},
	async educationType(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneEducationType = await ctx.db.query.educationType({ where }, info);
		return oneEducationType;
	},

	async registrations(parent, args, ctx, info) {
		console.log(args)
		const where = { id: args.id };
		const allRegistration = await ctx.db.query.registrations();
		return allRegistration;
	},

	async registration(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneRegistration = await ctx.db.query.registration({ where }, info);
		return oneRegistration;
	},

	// // obtain all rsults for a given center
	// async centerExamSessionIDs(parent, args, ctx, info) {
	// 	console.log('center registration  infos');
	// 	console.log(args);
	// 	const { exam, session, center } = args;
	// 	const where = {
	// 		center: { id: center.id },
	// 		exam: { id: exam.id },
	// 		session: { id: session.id }
	// 	};
	// 	const centerRegisIDs = await ctx.db.query.registrations({ where }, `{id}`);
	// 	return centerRegisIDs;
	// },

	// obtain all rsults for a given center
	async candidateRegistrationID(parent, args, ctx, info) {
		console.log('cand registration  infos');
		console.log(args);
		const { candidate, centerExamSession } = args;
		const where = {
			centerExamSession: { id: centerExamSession.id },
			candidate: { candCode: candidate.candCode }
		};
		const [candidateRegisIDs] = await ctx.db.query.registrations({ where }, `{id}`);

		if (!candidateRegisIDs) {
			throw new Error('Vous avez choisi, soit le mauvais examen, soit la mauvaise session, soit votre code candidat est erroné')
		}


		return candidateRegisIDs;
	},
	// obtain all rsults for a given center
	async candidateRegistrationIDs(parent, args, ctx, info) {
		console.log('cand registration  infos');
		console.log(args);
		const { candidate } = { args }
		const where = {
			candidate: { id: args }
		};
		const candidateRegisIDs = await ctx.db.query.candidateRegistrationIDs({ where }, info);

		if (!candidateRegisIDs) {
			throw new Error("Vous n'etes pas inscrit a un examen sur la plateforme")
		}


		return candidateRegisIDs;
	},
	// obtain all rsults for a given center
	async candidateCode(parent, args, ctx, info) {
		console.log('cand ID  infos');
		console.log(args);
		const where = { candCode: args.candCode };
		const candidateRegisIDs = await ctx.db.query.candidate({ where }, `{id}`);

		// if (!candidateRegisIDs) {
		// 	throw new Error("Code Candidat erroné")
		// }


		return candidateRegisIDs;
	},

	async centerExamSessionAuthoritys(parent, args, ctx, info) {
		const allCenterExamSessionAuthority = await ctx.db.query.centerExamSessionAuthoritys();
		return allCenterExamSessionAuthority;
	},
	async getCenterResults(parent, args, ctx, info) {
		console.log(args)
		const { centerExamSession } = { ...args }
		const where = { centerExamSession: centerExamSession.id }
		const allCenterExamSessionAuthority = await ctx.db.query.centerExamSessionSerieses({ where }, info);
		return allCenterExamSessionAuthority;
	},
	async centerExamSessionAuthority(parent, args, ctx, info) {
		const where = { id: args.id };
		const oneCenterExamSessionAuthority = await ctx.db.query.centerExamSessionAuthority({ where }, info);
		return oneCenterExamSessionAuthority;
	}
};

module.exports = Query;
