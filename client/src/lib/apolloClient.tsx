'use client'; // This directive makes this component a Client Component
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { pathToserver } from './axios';

let httpLink: HttpLink;
if(typeof window !== 'undefined'){
 httpLink = new HttpLink({
  uri: pathToserver + '/jobs/graphql', // Your GraphQL endpoint
  credentials: 'include',
  headers:{
    'Content-Type': 'application/json',
    'cookie': document.cookie||""
  }
});
}

export const client = new ApolloClient({
  link: httpLink!,
  cache: new InMemoryCache(),
});


import { ApolloProvider } from '@apollo/client';
import React from 'react'; // Import React for component definition

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}