import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { PRODUCT_ID_QUERY } from './SingleProduct';
import DisplayError from './styles/ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, loading, error } = useQuery(PRODUCT_ID_QUERY, {
    variables: {
      id,
    },
  });

  const [updateProduct, update] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { input, handleChange, clearForm, resetForm } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await updateProduct({
          variables: {
            id,
            name: input.name,
            description: input.description,
            price: input.price,
          },
        });
      }}
    >
      <DisplayError error={error || update.error} />
      <fieldset disabled={update.loading} aria-busy={update.loading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={input.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={input.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={input.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
