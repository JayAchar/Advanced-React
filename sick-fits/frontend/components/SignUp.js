import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import DisplayError from './styles/ErrorMessage';
import Form from './styles/Form';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const SignUp = () => {
  const { input, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: input,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup().catch(console.error);
    console.log({ data, error, loading });
    console.log(res);
    resetForm();
  };
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign up for an account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} - go ahead and sign in!</p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            autoComplete="name"
            name="name"
            id="name"
            placeholder="name"
            value={input.name}
            onChange={handleChange}
          />
        </label>
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

        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
