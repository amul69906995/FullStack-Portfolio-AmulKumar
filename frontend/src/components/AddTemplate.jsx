import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AddTemplate = () => {
    const [templateName,setTemplateName]=useState('');
    const [inputValues, setInputValues] = useState(['']); // Start with one empty input field

  const handleAddInput = () => {
    setInputValues([...inputValues, '']); // Add a new empty input field
  };

  const handleRemoveInput = (index) => {
    const newInputValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newInputValues);
  };

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const handleSubmit =async () => {
    try {
      const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/template/add`,{templateName,...inputValues},{
        withCredentials:true
      })
      console.log(data)
      toast.success(data.message, { position: 'top-right' });
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message,{ position: 'top-right' })
    }
  };
  console.log(inputValues)
  return (
    <div>
      <ToastContainer />
       <h1>Add template</h1>
       <label htmlFor="templateName">Template Name</label>
      <input type="text" placeholder='TemplateName' id='templateName' name='templateName' onChange={(e)=>setTemplateName(e.target.value)}/>
      <div>
      {inputValues.map((inputValue, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <button onClick={() => handleRemoveInput(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddInput}>Add Input</button>
      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Add template</button>
    </div>
    </div>
  )
}

export default AddTemplate;
