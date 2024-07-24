import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toastifyOption } from '../constant';
import { toast, ToastContainer } from 'react-toastify';
import ViewTemplate from './ViewTemplate';
const Profile = () => {
const [companies,setCompanies]=useState([])
const [templates,setTemplates]=useState([])
const [companiesId,setCompaniesId]=useState([])
const [templateId,setTemplateId]=useState('')
  useEffect(()=>{
 getCompany()
 getTemplate()
  },[])
const getTemplate=async()=>{
  try{
    const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/template`,{withCredentials:true})
    console.log(data.templates)
    setTemplates(data.templates)
    }
    catch(e){
      console.log(e)
    }
}

  const getCompany=async()=>{
    try{
    const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/company`,{withCredentials:true})
    console.log(data.companyDetails)
    setCompanies(data.companyDetails)
    }
    catch(e){
      console.log(e)
    }
  }
  const handleDelete=async(id)=>{
    try {
      const {data}=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/company/remove/${id}`,{
        withCredentials:true,
      })
      toast.success(data?.message, toastifyOption);
      console.log(data)
      setCompanies(prev=>prev.filter(p=>p._id!==id))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteTemplate=async(id)=>{
    try {
      const {data}=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/template/remove/${id}`,{
        withCredentials:true,
      })
      toast.success(data?.message, toastifyOption);
      console.log(data)
      setTemplates(prev=>prev.filter(p=>p._id!==id))
    } catch (error) {
      console.log(error)
    }
  }
  //console.log(templateId)
  const handleCheckBocChange=(id)=>{
    console.log(id)
    // if already exist remove else add;
    const isIdExist=companiesId.find(cid=>cid===id)
    if(isIdExist){
      setCompaniesId(prev=>prev.filter(p=>p!==id))
    }
    else{
      setCompaniesId(prev=>[...prev,id])
    }
  }
 // console.log(companiesId)
 const sendMail=async()=>{
  try{
    const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/send-mail`,{templateId,companiesId},{withCredentials:true})
    console.log(data)
    toast.success(data?.message, toastifyOption);
  }
  catch(e){
    console.log(e)
    }
 }
  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-around;
            padding: 1rem;
            background-color: #f8f9fa;
            border-bottom: 1px solid #ddd;
          }

          .navbar a {
            text-decoration: none;
            color: #007bff;
            font-size: 1rem;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background-color 0.3s, color 0.3s;
          }

          .navbar a:hover {
            background-color: #007bff;
            color: #fff;
          }

          .navbar a.active {
            background-color: #007bff;
            color: #fff;
            font-weight: 700;
          }
        `}
      </style>


      <ToastContainer />

      <nav className="navbar">
        <Link to="/protected/addcompany">Add Company</Link>
        <Link to="/protected/addtemplate">Add Template</Link>
        <Link to="/protected/editprofile">Edit Profile</Link>
      </nav>
      <div>
      {companies.length > 0 && (
        <div className="company-list">
          {companies.map((company) => (
            <div key={company._id} className="company-item">
              <p><strong>{company.companyName}</strong></p>
              <p>HR Contact: {company.companyHrContact}</p>
              <p>Type: {company.companyType}</p>
              <input type="checkbox" name="checkbox" id="checkbox" checked={companiesId.includes(company._id)} onChange={()=>handleCheckBocChange(company._id )}/>
              <button onClick={()=>handleDelete(company._id)}>delete</button>
            </div>
          ))}
        </div>
      )}
      {companies.length === 0 &&<p>No companies found.</p>}
      </div>
      <div>
{templates.length>0&&templates.map(t=>(
  <div key={t._id} className="company-item">
  <p><strong>{t.templateName}</strong></p>
  <input type="checkbox" name="checkbox" id="checkbox" checked={t._id===templateId} onChange={()=>setTemplateId(t._id)}/>
  <button onClick={()=>handleDeleteTemplate(t._id)}>delete</button>
  <ViewTemplate templatePara={t.templatePara}/>
  </div>
))}
{templates.length===0&&<p>no template to show</p>}
      </div>

      <div>
        <button onClick={sendMail}>Send Mail</button>
      </div>
    </>
  );
};

export default Profile;
