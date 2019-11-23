"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Item",
    embedded: false
  },
  {
    name: "Region",
    embedded: false
  },
  {
    name: "Division",
    embedded: false
  },
  {
    name: "SubDivision",
    embedded: false
  },
  {
    name: "Town",
    embedded: false
  },
  {
    name: "examCenter",
    embedded: false
  },
  {
    name: "Series",
    embedded: false
  },
  {
    name: "Exam",
    embedded: false
  },
  {
    name: "Subject",
    embedded: false
  },
  {
    name: "Presence",
    embedded: false
  },
  {
    name: "ExamSession",
    embedded: false
  },
  {
    name: "Gender",
    embedded: false
  },
  {
    name: "Candidate",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/kouatchoua/inex-back/dev`
});
exports.prisma = new exports.Prisma();
