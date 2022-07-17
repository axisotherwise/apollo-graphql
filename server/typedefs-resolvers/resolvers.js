import { gql } from "apollo-server";

const resolverTypeDefs = gql`
  type User {
    email: String
    name: String
    password: String
  }
`;

const resolver = {
  Query: {
    user: () => {
      return [
        {
          email: "email",
          name: "name",
        }
      ]
    } 
  },
  Mutation: {
    createUser: (parent, args) => {
      return [
        {
          email: "email",
          name: "name",
        }
      ]
    }
  }
};

export {
  resolverTypeDefs,
  resolver,
}