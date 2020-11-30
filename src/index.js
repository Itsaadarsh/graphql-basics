import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        alive: Boolean!
        avgLifeSpan: Float!
    }
`

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'fsd-123sad-asd2d-awsdd2'
        },
        name() {
            return 'John'
        },
        age() {
            return 19
        },
        alive() {
            return (Math.random() > 0.5 ? false:true )
        },
        avgLifeSpan() {
            return (Math.random() * 100)
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server STARTED')
})