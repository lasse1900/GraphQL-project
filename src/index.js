import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
  id: '1',
  name: 'Lauri',
  email: 'lasse@gmail.com',
  age: 59,
  comment: 'Laurin kommentti'
},
{
  id: '2',
  name: 'Jess',
  email: 'jess@gmail.com',
  comment: 'Jessen kommentti'
},
{
  id: '3',
  name: 'Adrian',
  email: 'adrian@gmail.com',
  age: 39,
  comment: 'Adrianin kommentti'
}]

const posts = [{
  id: '1',
  title: 'mouse',
  body: 'intelliMouse',
  published: 2019,
  author: '1',
},
{
  id: '2',
  title: 'laptop',
  body: 'used HP laptop',
  published: 2018,
  author: '1',
},
{
  id: '3',
  title: 'mobile phone',
  body: 'Samsung A40',
  published: 2019,
  author: '2',
}]

const comments = [{
  id: '1',
  text: 'my first comment',
  author: '1',
  post: '1'
},
{
  id: '2',
  text: 'my second comment',
  author: '1',
  post: '1'
},
{
  id: '3',
  text: 'my third comment',
  author: '2',
  post: '2'
},
{
  id: '4',
  text: 'my fourth comment',
  author: '3',
  post: '3'
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, ctx, info) {
      return comments
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com'
      }
    },
    post() {
      return {
        id: '092',
        title: 'GraphQL 101',
        body: '',
        published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})