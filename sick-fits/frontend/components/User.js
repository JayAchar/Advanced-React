import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        #  TODO query the cart when created
      }
    }
  }
`;

const useUser = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
};

export { useUser, CURRENT_USER_QUERY };
