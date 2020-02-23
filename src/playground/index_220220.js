import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]! ): Float!
    grades: [Int!]!
    me: User!,
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    puhlished: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      if(args.numbers.lenght === 0){
        return 0
      }

      // [1,5,10,2]
      return args.numbers.reduce((acc, curr) => {
        return acc + curr
      })
    },
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello ${args.name} You are my favourite ${args.position}!`
      } else {
        return 'Hello'
      }
    },
    grades(parent, args, ctx, info) {
      return [90, 80, 93]
    },
    me() {
      return {
        id: '12345',
        name: 'Mike',
        email: 'mike@gmail.com',
        age: 25
      }
    },

    post() {
      return {
        id: '2344-5',
        title: 'laptop',
        body: 'MacBook Pro',
        puhlished: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up')
})