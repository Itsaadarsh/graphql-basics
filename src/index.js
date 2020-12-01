import { GraphQLServer } from 'graphql-yoga'
import {customPosts,customUsers, customComment} from './utils'
import { query } from './resolvers/Query';
import { mutation } from './resolvers/Mutation.Js';
import { posts } from './resolvers/Posts';
import { users } from './resolvers/Users';
import { comments } from './resolvers/Comments';

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
        Query: query,
        Mutation: mutation,
        Post: posts,
        User: users,
        Comment: comments
    },
    context: {
        customComment,
        customPosts,
        customUsers
    }
})

server.start(() => {
    console.log('Server STARTED')
})