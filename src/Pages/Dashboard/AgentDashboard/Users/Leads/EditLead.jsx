import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { Button, TextField, MenuItem } from '@mui/material'; // Import MUI components for form
import { useAuth } from '../../../../../Context/Auth';

const EditLead = ({ update, setUpdate }) => {
  const { leadId } = useParams();  // Get the leadId from URL params
const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({url:'https://travelta.online/agent/leads'});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const auth= useAuth()
  const navigate = useNavigate();

  // Fetch the lead data when the component is mounted or when the update state changes
  useEffect(() => {
    refetchLead();
  }, [refetchLead, update]);

  // Populate the form inputs with the fetched lead data
  useEffect(() => {
    if (dataLead && dataLead.leads) {
      const lead = dataLead.leads.find((lead) => lead.id === parseInt(leadId)); // Find the lead by ID
      if (lead) {
        setName(lead.name);
        setPhone(lead.phone);
        setAlternatePhone(lead.alternatePhone || '');  // Handle optional field
        setEmail(lead.email);
        setGender(lead.gender);
      }

    }
    console.log("data",dataLead)
  }, [dataLead, leadId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an object that will hold the updated fields only
    const updatedLead = {};
  
    // Conditionally add only the changed fields
    if (name) updatedLead.name = name;
    if (phone) updatedLead.phone = phone;
    if (email) updatedLead.email = email;
    if (gender) updatedLead.gender = gender;
  
    try {
      const response = await fetch(`https://travelta.online/agent/leads/update/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.token || ''}`, // Include authorization token
        },
        body: JSON.stringify(updatedLead),
      });
  
      if (response.ok) {
        // If successful, toggle the update state and navigate back
        setUpdate((prev) => !prev);  // Toggle the update state to re-fetch data
        navigate(-1);  // Navigate back to the leads page
        auth.toastSuccess("Data Update Successful")
      } else {
        auth.toastError('Failed to update the lead');
      }
    } catch (error) {
        auth.toastError('Error updating lead:', error);
    }
  };
  
  return (
    <div>
      
      <form onSubmit={handleSubmit} className='grid grid-col-1 md:grid-col-2 lg:grid-cols-3 gap-2 mt-7'>
        <div className="form-group">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Phone"
            variant="outlined"
            type="tel"
            fullWidth
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
     
        <div className="form-group">
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Gender"
            variant="outlined"
            select
            fullWidth
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </div>
        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Update Lead
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditLead;
