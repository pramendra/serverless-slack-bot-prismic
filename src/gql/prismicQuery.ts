import gql from 'graphql-tag';

const meta = `
_meta {
  id
  uid
  lastPublicationDate
  type
}
hero
title
summary
references {
  title1
  src {
    _linkType
    __typename
    ... on _ExternalLink {
      url
    }
  }
}
category
tags {
  tag
}
`;

export const newsFragment = gql`
  fragment newsFields on News {
    ${meta}
    rank
  }
`;

export const fundingsFragment = gql`
  fragment fundingsFields on Fundings {
    ${meta}
  }
`;

export const reportsFragment = gql`
  fragment reportsFields on Reports {
    ${meta}
    rank
  }
`;

export const lastPublishedQuery = gql`
  query lastPublished($lastPublicationDate_after: DateTime) {
    _allDocuments(lastPublicationDate_after: $lastPublicationDate_after) {
      edges {
        node {
          ...newsFields
          ...fundingsFields
          ...reportsFields
        }
      }
      totalCount
    }
  }
  ${newsFragment}
  ${fundingsFragment}
  ${reportsFragment}
`;
