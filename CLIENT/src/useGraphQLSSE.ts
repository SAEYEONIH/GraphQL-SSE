import { useEffect } from 'react';
import { createClient } from 'graphql-sse';

interface GraphQLSSEOptions<T> {
  url: string;
  query: string;
  onSuccess: (data: T) => void;
  onError: (error: any) => void;
}

export function useGraphQLSSE<T>({ url, query, onSuccess, onError }: GraphQLSSEOptions<T>) {
  useEffect(() => {
    console.log('Starting subscription');
    const client = createClient({
      url,
    });

    const dispose = client.subscribe(
      {
        query,
      },
      {
        next: (data) => {
          console.log('Received data:', data);
          onSuccess(data as T);
        },
        error: (error) => {
          console.error('Subscription error:', error);
          onError(error);
        },
        complete: () => console.log('Subscription complete'),
      },
    );

    return () => {
      console.log('Disposing subscription');
      dispose();
    };
  }, [url, query, onSuccess, onError]);
}
