import { ApolloLink, type Operation, type FetchResult, Observable } from '@apollo/client/core';
import { print, type ExecutionResult } from 'graphql';
import { createClient } from 'graphql-sse';

export class SSELink extends ApolloLink {
  private client;

  constructor(options: { url: string }) {
    super();
    this.client = createClient(options);
  }

  request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        {
          ...operation,
          query: print(operation.query),
        },
        {
          next: (result: ExecutionResult<FetchResult>) => {
            sink.next(result as FetchResult);
          },
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}
