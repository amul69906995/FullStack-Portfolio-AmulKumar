import React, { useContext, useState, useEffect } from 'react';
import { authContext } from '../context/AuthContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { toastifyOption } from '../constant';

const EditProfile = () => {
  const { user } = useContext(authContext);
  
  const [userProfileInfo, setUserProfileInfo] = useState({
    name: '',
    cpi: '',
    contactEmail: '',
    contactNumber: '',
    carrierRole: '',
    carrierDescription: '',
    carrierType: '',
    twitterLink: '',
    githubLink: '',
    linkedinLink: ''
  });
  
  const [cv, setCv] = useState(null); // State to store the selected file

  // Populate the form with user data when component mounts
  useEffect(() => {
    if (user) {
      setUserProfileInfo({
        name: user.name || '',
        cpi: user.cpi || '',
        contactEmail: user.contactEmail || '',
        contactNumber: user.contactNumber || '',
        carrierRole: user.carrierRole || '',
        carrierDescription: user.carrierDescription || '',
        carrierType: user.carrierType || '',
        twitterLink: user.twitterLink || '',
        githubLink: user.githubLink || '',
        linkedinLink: user.linkedinLink || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfileInfo({
      ...userProfileInfo,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', userProfileInfo.name);
      formData.append('cpi', userProfileInfo.cpi);
      formData.append('contactEmail', userProfileInfo.contactEmail);
      formData.append('contactNumber', userProfileInfo.contactNumber);
      formData.append('carrierRole', userProfileInfo.carrierRole);
      formData.append('carrierDescription', userProfileInfo.carrierDescription);
      formData.append('carrierType', userProfileInfo.carrierType);
      formData.append('twitterLink', userProfileInfo.twitterLink);
      formData.append('githubLink', userProfileInfo.githubLink);
      formData.append('linkedinLink', userProfileInfo.linkedinLink);
      if (cv) {
        formData.append('cv', cv);
      }

      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/edit-profile`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(data);
      toast.success(data.message, { position: 'top-right' });
    } catch (e) {
      console.log(e);
      toast.error("Failed to update profile", { position: 'top-right' });
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <ToastContainer />
      <p>{user?.email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={userProfileInfo.name} onChange={handleChange} />
        </div>
        <div>
          <label>CPI:</label>
          <input type="text" name="cpi" value={userProfileInfo.cpi} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Email:</label>
          <input type="email" name="contactEmail" value={userProfileInfo.contactEmail} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Number:</label>
          <input type="text" name="contactNumber" value={userProfileInfo.contactNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Career Role:</label>
          <input type="text" name="carrierRole" value={userProfileInfo.carrierRole} onChange={handleChange} />
        </div>
        <div>
          <label>Career Description:</label>
          <textarea name="carrierDescription" value={userProfileInfo.carrierDescription} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Career Type:</label>
          <select name="carrierType" value={userProfileInfo.carrierType} onChange={handleChange}>
            <option value="">Select Career Type</option>
            <option value="min">Min</option>
            <option value="sde">SDE</option>
          </select>
        </div>
        <div>
          <label>Twitter Link:</label>
          <input type="text" name="twitterLink" value={userProfileInfo.twitterLink} onChange={handleChange} />
        </div>
        <div>
          <label>GitHub Link:</label>
          <input type="text" name="githubLink" value={userProfileInfo.githubLink} onChange={handleChange} />
        </div>
        <div>
          <label>LinkedIn Link:</label>
          <input type="text" name="linkedinLink" value={userProfileInfo.linkedinLink} onChange={handleChange} />
        </div>
        <div>
          <label>CV:</label>
          <input type="file" name="cv" onChange={handleFileChange} />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProfile;

