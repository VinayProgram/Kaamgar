'use client'; // This directive makes this component a Client Component
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost/jobs/graphql', // Your GraphQL endpoint
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


// src/app/ApolloWrapper.tsx
// Or src/components/ApolloWrapper.tsx
import { ApolloProvider } from '@apollo/client';
import React from 'react'; // Import React for component definition

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}