import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = ({ children }) => {
  const router = useRouter();

  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSignOut = async (e) => {
    e.preventDefault();
    console.log('clicked');
    await signout();
    router.push('/');
  };
  return (
    <button type="button" onClick={handleSignOut}>
      {children}
    </button>
  );
};

export default SignOut;
