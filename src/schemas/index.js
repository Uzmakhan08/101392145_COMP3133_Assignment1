const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    login(username: String!, password: String!): User
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployeeById(id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): Employee
    deleteEmployeeById(id: ID!): Employee
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String!
    salary: Float!
  }
`;

module.exports = { typeDefs };
