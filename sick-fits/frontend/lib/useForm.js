import { useEffect, useState } from 'react';

const useForm = (initial = {}) => {
  // create a state object for input
  const [input, setInput] = useState(initial);

  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInput(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    let { name, value, type, files } = e.target;

    if (type === 'number') {
      value = parseInt(value, 10);
    }

    if (type === 'file') {
      [value] = files;
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInput(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(input).map(([key]) => [key, ''])
    );
    setInput(blankState);
  };

  return {
    input,
    handleChange,
    resetForm,
    clearForm,
  };
};

export default useForm;
