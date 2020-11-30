import { GraphQLServer } from 'graphql-yoga'
import {customPosts,customUsers} from './utils'

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts: [Post!]!
        users: [User!]!
    }  
    
    type User {
        id: ID!
        name: String!
        email: String!
        post: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        isActive: Boolean!
        body: String!
        admin: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        posts() {
            return customPosts
        },
        users(){
            return customUsers
        }
    },
    Post: {
        admin(parent) {
           return customUsers.find((user) => {
                return user.id === parent.adminid
            })
        }
    },
    User: {
        post(parent){
            return customPosts.filter(post => {
                return post.adminid === parent.id
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