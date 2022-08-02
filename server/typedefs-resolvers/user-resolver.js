import { gql } from "apollo-server";

const resolverTypeDefs = gql`
  type User {
    email: String
    name: String
    gender: String
    address: String
    userId: Int
  }
`;

const resolver = { 
  Query: {
    user: () => {
      return {
        email: "이메일",
        name: "이름",
        gender: "남자",
        address: "서울",
        userId: 1,
      };
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      console.log(parent);
      return {
        email: "이메일",
        name: "이름",
        gender: "남자",
        address: "서울",
        userId: 1,
      };
    },
  },
};

export {
  resolverTypeDefs,
  resolver,
};