import { createSchema, createPubSub } from 'graphql-yoga';

const pubsub = createPubSub<{
  numberAdded: [number];
}>();

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      hello: String!
    }

    type Mutation {
      add(num: Int!): Int!
    }

    type Subscription {
      counter: Int!
      numberAdded: Int!
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello from Yoga!',
    },
    Mutation: {
      add: (_, { num }: { num: number }) => {
        pubsub.publish('numberAdded', num);
        return num;
      },
    },
    Subscription: {
      counter: {
        subscribe: async function* () {
          for (let i = 1; i <= 10; i++) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            yield { counter: i };
          }
        },
      },
      numberAdded: {
        subscribe: async function* () {
          console.log('[Subscription] numberAdded: subscribing...');
          try {
            for await (const value of pubsub.subscribe('numberAdded')) {
              console.log('[Subscription] numberAdded payload:', value);
              yield { numberAdded: value };
            }
          } catch (e) {
            console.error('[Subscription] numberAdded error:', e);
            throw e;
          }
        },
      },
    },
  },
});
