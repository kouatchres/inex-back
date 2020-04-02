const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cartesian = require('cartesian');
// require('dotenv').config({path: '../variables.env'});

const Mutation = {
	async createCandidate(parents, args, ctx, info) {
		console.log(args);

		const newCand = { ...args };
		const { gender, ...others } = newCand;
		const candidate = await ctx.db.mutation.createCandidate(
			{
				data: {
					gender: {
						connect: { id: gender.id }
					},
					...others
				}
			},
			info
		);

		return candidate;
	},

	async createDivision(parents, args, ctx, info) {
		console.log('we are in create division of mutations');
		console.log(args);
		//    make a copy  of the args
		const newRegs = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { region, ...others } = newRegs;

		const division = await ctx.db.mutation.createDivision(
			{
				data: {
					...others,
					region: {
						connect: { id: region.id }
					}
				}
			},
			info
		);
		console.log(args);
		return division;
	},

	async createSubDivision(parents, args, ctx, info) {
		//    make a copy  of the args
		const newDivs = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { division, ...others } = newDivs;

		const subDivision = await ctx.db.mutation.createSubDivision(
			{
				data: {
					division: {
						connect: { id: division.id }
					},
					...others
				}
			},
			info
		);
		console.log(args);
		return subDivision;
	},

	async createTown(parents, args, ctx, info) {
		console.log('we are in create town mutation');
		console.log(args);
		//    make a copy  of the args
		const newTowns = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { subDiv, ...others } = newTowns;

		const town = await ctx.db.mutation.createTown(
			{
				data: {
					subDiv: {
						connect: { id: subDiv.id }
					},
					...others
				}
			},
			info
		);
		console.log(args);
		return town;
	},

	async createCenter(parents, args, ctx, info) {
		//    make a copy  of the args
		const newCenters = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { town, ...others } = newCenters;

		const center = await ctx.db.mutation.createCenter(
			{
				data: {
					town: {
						connect: { id: town.id }
					},
					...others
				}
			},
			info
		);
		console.log(args);
		return center;
	},

	async createCenterExamSession(parents, args, ctx, info) {
		//    make a copy  of the args
		const newCenterRegistration = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { examSession, center } = newCenterRegistration;

		const [alreadyRegistered] = await ctx.db.query.centerExamSessions({
			where: {
				center: { id: center.id },
				examSession: { id: examSession.id }
			}
		});
		if (alreadyRegistered) {
			throw new Error('Ce Centre est déjà inscrit à cet examen pour cette session.');
		}


		const centerExamSession = await ctx.db.mutation.createCenterExamSession(
			{
				data: {
					examSession: {
						connect: { id: examSession.id }
					},

					center: {
						connect: { id: center.id }
					},

				}
			},
			info
		);
		console.log(args);
		return centerExamSession;
	},


	async createExamSession(parents, args, ctx, info) {
		//    make a copy  of the args
		const newExamSessionRegistration = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { exam, session } = newExamSessionRegistration;

		const [alreadyRegistered] = await ctx.db.query.centerExamSessions({
			where: {
				session: { id: session.id },
				exam: { id: exam.id }
			}
		});
		if (alreadyRegistered) {
			throw new Error('Ceci est déjà inscrit à cet examen pour cette session.');
		}


		const ExamSession = await ctx.db.mutation.createExamSession(
			{
				data: {
					exam: {
						connect: { id: exam.id }
					},

					session: {
						connect: { id: session.id }
					},

				}
			},
			info
		);
		console.log(args);
		return ExamSession;
	},

	async createCenterExamSessionSeries(parents, args, ctx, info) {
		//    make a copy  of the args
		const newCenterRegistration = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { centerExamSession, series } = newCenterRegistration;

		const [alreadyRegistered] = await ctx.db.query.centerExamSessionSerieses({
			where: {
				centerExamSession: { id: centerExamSession.id },
				series: { id: series.id },
			}
		});
		if (alreadyRegistered) {
			throw new Error('Cette Séries est déjà inscrite à ce centre.');
		}


		const CESS = await ctx.db.mutation.createCenterExamSessionSeries(
			{
				data: {


					series: {
						connect: { id: series.id }
					},
					centerExamSession: {
						connect: { id: centerExamSession.id }
					},

				}
			},
			info
		);
		console.log(args);
		return CESS;
	},

	async createRegistration(parents, args, ctx, info) {

		// the function that helps to addleading zeroes infront of an interger number
		Number.prototype.pad = function (size) {
			var s = String(this);
			while (s.length < (size || 2)) { s = "0" + s; }
			return s;
		}



		console.log(args);
		//    make a copy  of the args	
		const newRegistartionInfos = { ...args };

		// show the region name from the new regions array because will not have to update the id
		const { candExamSession, centerExamSession, centerExamSessionSeries, candExamSecretCode, candidate, series, candRegistrationNumber } = newRegistartionInfos;

		const [hasRegisteredForExamInSession] = await ctx.db.query.registrations(
			{ where: { candExamSession } },
			info
		);
		if (hasRegisteredForExamInSession) {
			throw new Error('Vous êtes déjà inscrit à cet examen pour cette session.');

		}

		// get the series with all associated subjects while adding the coeff, cand secret code etc
		let subjsOfSeries = await ctx.db.query.series(
			{ where: { id: series.id } },
			`{ 
        id
        subjectSeries{
          id
          coeff
          subjectName
          subjectCode
      }}`
		);

		const { subjectSeries } = subjsOfSeries;

		// //make an array of the subjects for the candidate according to the chosen series
		const subjectList = subjectSeries.map((item) => {
			//each subject with the accompanying attributes
			const subjectList = {
				subjectSeries: {
					connect: { id: item.id }
				},
				candExamSecretCode,
				coeff: item.coeff
			};

			return subjectList;
		});

		if (subjectList && subjectList.length === 0) {
			throw new Error("Pour l'instant, cette série n'est pas disponible pour les inscriptions");
		}


		// cross check  in the registration table to get the count of all records of a given centerExamSession
		const candCount = await ctx.db.query.registrationsConnection({
			where: { candRegistrationNumber_contains: candRegistrationNumber }
		}, `{
			aggregate{
				count
			}
		}`);

		const newCount = candCount.aggregate.count + 1;
		// recreate the next candidate registration Number
		const newCandRegistrationNumber = `${candRegistrationNumber + newCount.pad(5)}`
		//now  drop the list of subjects on the score table linking it up with the just created registration
		const newRegistration = ctx.db.mutation.createRegistration(
			{
				data: {
					candExamSecretCode,
					candExamSession,
					candRegistrationNumber: newCandRegistrationNumber,
					centerExamSessionSeries: {
						connect: { id: centerExamSessionSeries.id }
					},
					series: {
						connect: { id: series.id }
					},
					centerExamSession: {
						connect: { id: centerExamSession.id }
					},

					candidate: {
						connect: { candCode: candidate.candCode }
					},
					scores: {
						create: subjectList
					},
				}
			},
			info
		);

		return newRegistration;
	},

	async createCenterExamSessionAuthority(parents, args, ctx, info) {
		console.log(args);
		//    make a copy  of the args
		const newCenterAdminInfos = { ...args };

		const { centerExamSession, rank, ...others } = newCenterAdminInfos;

		const [rankRegistered] = await ctx.db.query.centerExamSessionAuthoritys({
			where: {
				centerExamSession: { id: centerExamSession.id },
				rank: { id: rank.id }
			}
		});
		if (rankRegistered) {
			throw new Error('Rang déjà occupé, Veuillez Verifier avec le chef de centre');
		}

		const centerAdmin = await ctx.db.mutation.createCenterExamSessionAuthority(
			{
				data: {
					centerExamSession: {
						connect: { id: centerExamSession.id }
					},
					rank: {
						connect: { id: rank.id }
					},

					...others
				}
			},
			info
		);
		return centerAdmin;
	},

	async createSubjectSeries(parents, args, ctx, info) {
		console.log('subject series info');
		console.log(args);
		//    make a copy  of the args
		const subjSeriesInfos = { ...args };
		// show the region name from the new regions array because will not have to update the id
		console.log(subjSeriesInfos);
		const { series, subjectName, ...others } = subjSeriesInfos;
		const [existingSubj] = await ctx.db.query.subjectSerieses({
			where: {
				series: { id: series.id },
				subjectName
			}
		});
		if (existingSubj) {
			throw new Error('Matière déjà présente pour cette séries');
		}

		const newSubjSeries = await ctx.db.mutation.createSubjectSeries(
			{
				data: {
					series: {
						connect: { id: series.id }
					},
					...others,
					subjectName
				}
			},
			info
		);
		console.log(args);
		return newSubjSeries;
	},

	async createRegion(parents, args, ctx, info) {
		const region = await ctx.db.mutation.createRegion({ data: { ...args } }, info);
		return region;
	},

	async createSession(parents, args, ctx, info) {

		const allExams = await ctx.db.query.exams()

		const refinedExams = allExams.map(({ __typename, createdAt, updatedAt, examName, examCode, ...others }) => others)

		const getExamItems = refinedExams.map((item) => {
			const getExamItems = {
				exam: {
					connect: { id: item.id }
				},

			}
			return getExamItems
		}
		)
		// return getExasmItems



		const session = await ctx.db.mutation.createSession(
			{
				data: {
					...args,


					examSession: {
						create: getExamItems
					},

				}
			},
			info
		);
		return session;
	},

	async createSubjectType(parents, args, ctx, info) {
		const subjectType = await ctx.db.mutation.createSubjectType(
			{
				data: { ...args }
			},
			info
		);
		return subjectType;
	},

	async createRank(parents, args, ctx, info) {
		const rank = await ctx.db.mutation.createRank(
			{
				data: { ...args }
			},
			info
		);
		return rank;
	},

	async createEducationType(parents, args, ctx, info) {
		const educationType = await ctx.db.mutation.createEducationType(
			{
				data: { ...args }
			},
			info
		);
		return educationType;
	},



	async createExam(parents, args, ctx, info) {
		const exam = await ctx.db.mutation.createExam(
			{
				data: { ...args }
			},
			info
		);
		return exam;
	},



	async createReport(parents, args, ctx, info) {
		const allArgs = { ...args };
		const { centerAdmin, ...others } = allArgs;
		const report = await ctx.db.mutation.createReport(
			{
				data: {
					centerAdmin: {
						connect: { authCode: centerAdmin.authCode }
					},
					...others
				}
			},
			info
		);
		return report;
	},



	async createSeries(parents, args, ctx, info) {
		//make a copy  of the args
		const newEducTypes = { ...args };
		// show the region name from the new regions array because will not have to update the id

		const { educationType, ...others } = newEducTypes;

		const series = await ctx.db.mutation.createSeries(
			{
				data: {
					educationType: {
						connect: { id: educationType.id }
					},
					...others
				}
			},
			info
		);
		return series;
	},



	async createSubject(parents, args, ctx, info) {
		const newSbujectTypes = { ...args };
		const { educType, subjectType, ...others } = newSbujectTypes;

		const subject = await ctx.db.mutation.createSubject(
			{
				data: {
					subjectType: {
						connect: { id: subjectType.id }
					},
					educType: {
						connect: { id: educType.id }
					},
					...others
				}
			},
			info
		);
		return subject;
	},



	async createGender(parents, args, ctx, info) {
		const gender = await ctx.db.mutation.createGender(
			{
				data: { ...args }
			},
			info
		);

		console.log(gender);
		return gender;
	},
	async createUser(parents, args, ctx, info) {
		const user = await ctx.db.mutation.createUser(
			{
				data: { ...args }
			},
			info
		);

		console.log(user);
		return user;
	},

	updateCandidate(parent, args, ctx, info) {
		// first get a copy of the updates
		const { id, ...updates } = args;
		console.log(updates);

		// run the update method
		console.log('calling the candidate update mutation!!');
		return ctx.db.mutation.updateCandidate(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
	},

	updateDivision(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling division update mutation!');

		return ctx.db.mutation.updateDivision(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(updates);
	},

	async updateScore(parent, args, ctx, info) {
		console.log(args);

		const { subjectSeries, candExamSecretCode, ...updates } = args;

		console.log('calling scores update mutation!!');
		if (!subjectSeries) {
			throw new Error("Vous n'avez pas choisi de matiere");
		}
		// looking for the score id of the record whose marks will be updated
		const [getScoreID] = await ctx.db.query.scores(
			{
				where: {
					subjectSeries,
					candExamSecretCode
				}
			},
			`{
                id
                subjectAve
                coeff
                }`
		);
		console.log(getScoreID);
		if (!getScoreID) {
			throw new Error("Code candidat erroné ");
		}
		// updating the marks for the given subject for the given student
		return ctx.db.mutation.updateScore(
			{
				data: updates,
				where: { id: getScoreID.id }
			},
			info
		);
	},

	updateGender(parent, args, ctx, info) {
		// first get a copy of the updates
		const { id, ...updates } = args;
		// run the update method
		console.log('calling Gender update mutation!!');
		return ctx.db.mutation.updateGender(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(updates);
	},

	updateRegion(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateRegion(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},

	updateSubjectType(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateSubjectType(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},

	updateSeries(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the update series mutation!!');
		return ctx.db.mutation.updateSeries(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateRank(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the update Rank mutation!!');
		return ctx.db.mutation.updateRank(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateSession(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the update Session mutation!!');
		return ctx.db.mutation.updateSession(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateEducationType(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the update Educ Type mutation!!');
		return ctx.db.mutation.updateEducationType(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},

	updateExam(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateExam(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateSubject(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateSubject(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateTown(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateTown(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateSubDivision(parent, args, ctx, info) {
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the mutation!!');
		return ctx.db.mutation.updateSubDivision(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},
	updateCenter(parent, args, ctx, info) {
		console.log(args);
		const { id, ...updates } = args;
		// run the update method
		console.log('calling the update center mutation!!');
		return ctx.db.mutation.updateCenter(
			{
				data: updates,
				where: { id: args.id }
			},
			info
		);
		console.log(args.id);
	},

	async deleteCandidate(parent, args, ctx, info) {
		//   make a where variable
		const where = { id: args.id };
		// 1 find the item
		const candidate = await ctx.db.query.candidate({ where }, info);

		// 2. check if they own the item or have the permissions for the item
		//   todo
		// 3.delelte it
		return ctx.db.mutation.deleteCandidate({ where }, info);
	},

	async deleteRegion(parent, args, ctx, info) {
		//   make a where variable
		const where = { id: args.id };
		// 1 find the item
		const regionToDelete = await ctx.db.query.region({ where }, info);

		// 2. check if they own the item or have the permissions for the item
		//   todo
		// 3.delelte it
		return ctx.db.mutation.deleteRegion({ where }, info);
	},

	// async signUp(parent, args, ctx, info) {
	// 	const APP_SECRET = 'jwtsecret123';
	// 	// lowercase their email
	// 	args.email = args.email.toLowerCase();
	// 	// hash their password
	// 	const password = await bcrypt.hash(args.password, 10);
	// 	// create the user in the database
	// 	const user = await ctx.db.mutation.createUser(
	// 		{
	// 			data: {
	// 				...args,
	// 				password,
	// 				permissions: { set: ['CANDIDATE'] }
	// 			}
	// 		},
	// 		info
	// 	);
	// 	// create the JWT token for them
	// 	const token = jwt.sign({ userId: user.id }, APP_SECRET);
	// 	// We set the jwt as a cookie on the response
	// 	ctx.response.cookie('token', token, {
	// 		httpOnly: true,
	// 		maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
	// 	});
	// 	// Finally we return the user to the browser
	// 	// console.log(`Your port is ${APP_SECRET}`);
	// 	return user;
	// }
};
module.exports = Mutation;
