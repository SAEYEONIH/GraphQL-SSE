import { createSchema } from 'graphql-yoga'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }
    type Subscription {
      counter: Int!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello from Yoga!',
    },
    Subscription: {
      counter: {
        subscribe: async function* () {
          for (let i = 1; i <= 10; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            yield { counter: i }
          }
        },
      },
    },
  },
})
