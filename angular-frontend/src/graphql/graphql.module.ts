import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {getMainDefinition, Observable} from "@apollo/client/utilities";
// @ts-ignore
import extractFiles from 'extract-files/extractFiles.mjs';
// @ts-ignore
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import {ApolloLink, FetchResult, Operation} from "@apollo/client/link/core";
import {print} from 'graphql';
import {Client, ClientOptions, createClient} from 'graphql-sse';

class SSELink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  // @ts-ignore
  public override request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        {...operation, query: print(operation.query)},
        {
          next: (result: FetchResult | unknown) => sink.next(result as FetchResult),
          complete: () => sink.complete(),
          error: (error: Error) => sink.error(error),
        }
      );
    });
  }
}

export function createApollo(httpLink: HttpLink): any {
  // Create an http link:
  const http = ApolloLink.from([httpLink.create({
    uri: 'http://localhost:5000/graphql',
    extractFiles: (body) => extractFiles(body, isExtractableFile),
  })]);

  // Create a WebSocket link:
  let ws: ApolloLink;

  ws = new SSELink({
    url: 'http://localhost:5000/graphql',
  });

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({query}) => {
      // @ts-ignore
      const {kind, operation} = getMainDefinition(query);
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    ws!,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      },
      mutate: {
        fetchPolicy: 'no-cache'
      },
      watchQuery: {
        fetchPolicy: 'no-cache'
      }
    }
  };
}
