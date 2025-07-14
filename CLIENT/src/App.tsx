import {
  useQuery,
  useMutation,
  useSubscription,
  gql,
} from '@apollo/client';

// GraphQL Queries, Mutations, Subscriptions
const GET_GREETING = gql`
  query GetGreeting {
    hello
  }
`;

const ADD_NUMBER = gql`
  mutation AddNumber($num: Int!) {
    add(num: $num)
  }
`;

const NUMBER_ADDED_SUBSCRIPTION = gql`
  subscription OnNumberAdded {
    numberAdded
  }
`;

function App() {
  // Query Example
  const { error: queryError, data: queryData } = useQuery(GET_GREETING);

  // Mutation Example
  const [addNumber, { error: mutationError }] = useMutation(ADD_NUMBER);

  // Subscription Example
  const { data: subscriptionData, error: subscriptionError } = useSubscription(
    NUMBER_ADDED_SUBSCRIPTION,
  );

  if (queryError) return <p>Query Error: {queryError.message}</p>;
  if (mutationError) return <p>Mutation Error: {mutationError.message}</p>;
  if (subscriptionError) return <p>Subscription Error: {subscriptionError.message}</p>;

  return (
    <div>
      <h1>Apollo Client with splitLink Example</h1>

      <h2>Query:</h2>
      <p>Greeting: {queryData?.hello}</p>

      <h2>Mutation:</h2>
      <button onClick={() => addNumber({ variables: { num: Math.floor(Math.random() * 100) } })}>
        Add Random Number
      </button>

      <h2>Subscription:</h2>
      <p>New Number Added: {subscriptionData?.numberAdded}</p>
    </div>
  );
}

export default App;
