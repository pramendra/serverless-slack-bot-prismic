const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;
const ApolloClient = require('apollo-client').ApolloClient;
const PrismicLink = require('apollo-link-prismic').PrismicLink;

export const prismicClient = (uri: string, accessToken: string): any => {
  const client = new ApolloClient({
    link: PrismicLink({
      uri,
      accessToken,
    }),
    cache: new InMemoryCache(),
  });
  return client;
};

export const query = async (
  query: any = '',
  variables = {},
  options = { fetchPolicy: 'no-cache' }
): Promise<any> => {
  try {
    const { PRISMIC_GRAPHQL = '', PRISMIC_ACCESS_TOKEN = '' } = process.env;
    const client = prismicClient(PRISMIC_GRAPHQL, PRISMIC_ACCESS_TOKEN);

    const { data = {} } = await client.query({
      query,
      variables,
      ...options,
    });

    if (data && data._allDocuments && data._allDocuments.totalCount) {
      return {
        totalCount: data._allDocuments.totalCount,
        edges: data._allDocuments.edges,
      };
    }
    return {};
  } catch (error) {
    console.warn('query', query.toString(), error.toString());
    return {};
  }
};
