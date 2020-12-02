import { GraphQLServer, PubSub } from 'graphql-yoga'
import {customPosts,customUsers, customComment} from './utils'
import { query } from './resolvers/Query';
import { mutation } from './resolvers/Mutation.Js';
import { posts } from './resolvers/Posts';
import { users } from './resolvers/Users';
import { comments } from './resolvers/Comments';
import { subscription } from './resolvers/Subscription';

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
        Query: query,
        Mutation: mutation,
        Subscription: subscription,
        Post: posts,
        User: users,
        Comment: comments
    },
    context: {
        customComment,
        customPosts,
        customUsers,
        pubsub
    }
})

server.start(() => {
    console.log('Server STARTED')
})