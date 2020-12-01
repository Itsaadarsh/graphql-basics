import { GraphQLServer } from 'graphql-yoga'
import {customPosts,customUsers, customComment} from './utils'
import { v4 as uuidv4 } from 'uuid';


// Type definitions (schema)
const typeDefs = `
    type Query {
        posts: [Post!]!
        users: [User!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }
    
    input CreateUserInput {
        name: String!
        email: String!
    }


    input CreatePostInput {
        title: String
        isActive: Boolean!
        body: String!
        userid: String!
    }

    input CreateCommentInput{
        text: String!
        userid: String!
        postid: String!
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
    Mutation: {
        createUser(parent,args){
            const isEmailTaken = customUsers.some(user => user.email === args.data.email)
            
            if(isEmailTaken) throw new Error('Email taken!')

            const user = {
                id: uuidv4(),
                ...args.data
            }

            customUsers.push(user)

            return user 
        },
        createPost(parent, args){
            const isUserValid = customUsers.some(user => user.id === args.data.userid)
            
            if(!isUserValid) throw new Error('SignIn to post!')
            const post  = {
                id: uuidv4(),
               ...args
            }


            customPosts.push(post)

            return post
        },
        createComment(parent,args){
            const isPostValid = customPosts.some(post => post.id === args.data.postid && post.isActive)

            if(!isPostValid) throw new Error('Something Went Wrong! Try Again.')

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            customComment.push(comment)
            return comment
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