import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cronos-graph.nodes.cybercorey.net/subgraphs/name/cybercorey/empire-cro',
  }),
  cache: new InMemoryCache(),
  // shouldBatch: true,
})

export const healthClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cronos-graph.nodes.cybercorey.net/index-node/graphql',
  }),
  cache: new InMemoryCache(),
  // shouldBatch: true,
})

export const blockClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://cronos-graph.nodes.cybercorey.net/subgraphs/name/cybercorey/blocks-cro',
  }),
  cache: new InMemoryCache(),
})
