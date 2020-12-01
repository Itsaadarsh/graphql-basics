import { GraphQLServer } from 'graphql-yoga'
import {customPosts,customUsers, customComment} from './utils'

// Type definitions (schema)
const typeDefs = `
    type Query {
        posts: [Post!]!
        users: [User!]!
        comments: [Comment!]!
    }  
    
    type User {
        id: ID!
        name: String!
        email: String!
        post: [Post!]!
        comment: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        isActive: Boolean!
        body: String!
        admin: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        user: User!
        post: Post!
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
        },
        comments(){
            return customComment
        }
    },
    Post: {
        admin(parent) {
           return customUsers.find((user) => {
                return user.id === parent.adminid
            })
        },
        comments(parent){
            return customComment.filter(comment => {
                return comment.postid === parent.id
            })
        }
    },
    User: {
        post(parent){
            return customPosts.filter(post => {
                return post.adminid === parent.id
            })
        },
        comment(parent){
            return customComment.filter(comment => {
                return comment.userid === parent.id
            })
        }
    },
    Comment: {
        user(parent){
            return customUsers.find(user => {
                return user.id === parent.userid
            })
        },
        post(parent){
            return customPosts.find(post => {
                return post.id === parent.postid
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