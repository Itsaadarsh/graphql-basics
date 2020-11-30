import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        email: String
        extraInfo: extraUserInfo!
        updateInfo(name: String, age: Int, email: String, gender: String, address: String, dob: String): String
    }

    type extraUserInfo {
        address: String!
        isSingle: Boolean!
        dob: String!
        gender: String!
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
        email(){
            return (Math.random() > 0.5 ? 'John@Johny.com' : null)
        },
        updateInfo(parent, args, ctx, info){
            if(args){
                return args.name
            }
        },
        extraInfo() {
            return {
                address: '127 George Washington Street',
                isSingle: Math.random() > 0.8 ? false : true,
                dob: '12th June 2002',
                gender: 'Male'
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