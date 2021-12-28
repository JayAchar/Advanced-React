import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './styles/ErrorMessage';
import Form from './styles/Form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { input, handleChange, resetForm } = useForm({
    email: '',
  });

  const [reset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: input,
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  };
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a password reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a reset link</p>
        )}
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

        <button type="submit">Reset password</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
