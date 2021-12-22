import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './styles/ErrorMessage';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const Signin = () => {
  const { input, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data }] = useMutation(SIGNIN_MUTATION, {
    variables: input,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error = data?.authenticateUserWithPassword?.code
    ? data.authenticateUserWithPassword
    : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin();

    resetForm();
  };
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign into your account</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="text"
            autoComplete="email"
            name="email"
            id="email"
            placeholder="email"
            value={input.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            placeholder="Password"
            value={input.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Signin</button>
      </fieldset>
    </Form>
  );
};

export default Signin;
