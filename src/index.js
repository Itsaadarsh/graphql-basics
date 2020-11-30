import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'Hey Mofos!'
        },
        name() {
         return (Math.random() > 0.5 ? `Aadarsh` : null )
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