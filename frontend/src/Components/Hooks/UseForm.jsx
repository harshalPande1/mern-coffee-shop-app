import {useState} from 'react';
const useForm = (initialObj) => {
    const [validationErr, setValidationErr] = useState();
    const [formData, setFormData] = useState(initialObj);
    const handelChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

  return { handelChange , validationErr , formData , setValidationErr} ;

}

export default useForm;
