import { GraphQLServer } from 'graphql-yoga'
import customPosts from './utils'

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts(active: Boolean, title: String): [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        isActive: Boolean!
        body: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        posts(parent,args) {
            if(args){
                return customPosts.filter((post) => {
                    return post.isActive === args.active
                })     
            }
            return customPosts
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server STARTED')
})