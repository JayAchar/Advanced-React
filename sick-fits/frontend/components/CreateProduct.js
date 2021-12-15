import useForm from '../lib/useForm';
import Form from './styles/Form';

const CreateProduct = () => {
  const { input, handleChange, clearForm, resetForm } = useForm({
    name: '',
    price: 0,
    image: '',
    description: '',
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(input);
      }}
    >
      <fieldset>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Add product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
