import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCompany = () => {
  const [companyHrContact, setCompanyHrContact] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [hiringManagerName, setHiringManagerName] = useState('Hiring Manager');
  const [positionRole, setPositionRole] = useState('');
  const [onLoading, setOnLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOnLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/company/add`, {
        companyHrContact,
        ownerId,
        companyType,
        companyName,
        hiringManagerName,
        positionRole,
      },{withCredentials:true});
      console.log(response)
      toast.success(response.data.message, { position: 'top-right' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong', { position: 'top-right' });
    } finally {
      setOnLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyHrContact">Company HR Contact:</label>
          <input
            type="email"
            id="companyHrContact"
            value={companyHrContact}
            onChange={(e) => setCompanyHrContact(e.target.value)}
            required
          />
        </div>
    
        <div>
          <label htmlFor="companyType">Company Type:</label>
          <select
            id="companyType"
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="min">Mining</option>
            <option value="sde">Software Development Engineer</option>
          </select>
        </div>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hiringManagerName">Hiring Manager Name:</label>
          <input
            type="text"
            id="hiringManagerName"
            value={hiringManagerName}
            onChange={(e) => setHiringManagerName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="positionRole">Position Role:</label>
          <input
            type="text"
            id="positionRole"
            value={positionRole}
            onChange={(e) => setPositionRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={onLoading}>
          {onLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddCompany;

