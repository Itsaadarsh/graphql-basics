import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        isAlive: Boolean!
        avgLifeSpan : Float!
        extraInfo: UserInfo!
    }

    type UserInfo {
        email: String
        address: String!
        isSingle: Boolean!
        wages: Float!
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
        isAlive() {
            return (Math.random() > 0.5 ? false : true )
        },
        avgLifeSpan() {
            return (Math.floor(Math.random() * 100))
        },
        extraInfo() {
            return {
                email: Math.random() > 0.5 ? 'John@Johny.com' : null,
                address: '127 George Washington Street',
                isSingle: Math.random() > 0.8 ? false : true,
                wages: Math.floor(Math.random() * 10000)
            }
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