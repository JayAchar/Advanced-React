import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

const update = (cache, payload) => {
  // remove deleted item from browser cache
  cache.evict(cache.identify(payload.data.deleteProduct));
};

const DeleteProduct = ({ id, children }) => {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    // function to run after mutation has successfully completed
    update,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (confirm('Are you sure you want to delete this item?')) {
          try {
            const res = await deleteProduct();
          } catch (err) {
            alert(err.message);
          }
        }
      }}
    >
      {children}
    </button>
  );
};

export default DeleteProduct;
