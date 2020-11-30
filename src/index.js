import { GraphQLServer } from 'graphql-yoga'
import {customPosts,customUsers} from './utils'

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts: [Post!]!
    }  
    
    type Admin {
        id: ID!
        name: String!
        email: String!
    }

    type Post {
        id: ID!
        title: String!
        isActive: Boolean!
        body: String!
        admin: Admin!
    }
`

// Resolvers
const resolvers = {
    Query: {
        posts() {
            return customPosts
        }
    },
    Post: {
        admin(parent) {
           return customUsers.find((user) => {
                const res = user.id === parent.adminid
                console.log(res);
                return res
            })
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