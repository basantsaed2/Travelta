import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const NewRequest = () => {
  const [agent, setAgent] = useState('');
  const [service, setService] = useState('');
  const [priority, setPriority] = useState('');
  const [currency, setCurrency] = useState('');
  const [stage, setStage] = useState('');

  return (
    <div className=" p-6 shadow-4xl mt-7 rounded-lg space-y-6">
      {/* Header */}
      <div className="mb-6">
    <div className="flex justify-between items-center">
    <p className="text-2xl mt-4 font-semibold">New Request</p>
    <button
         
          className="text-white w-[30%] p-3 bg-mainColor py-5 rounded-md font-bold"
          
        >
          + Add New Lead
        </button>
        
    </div>
        <div className="border-b-2 border-gray-300 mt-2"></div>
      </div>

      {/* Form */}
      <form className="p-6  space-y-6">
        {/* Lead/Customer */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Lead/Customer:</label>
          <TextField
            variant="outlined"
            placeholder="Enter Lead/Customer"
            fullWidth
          />
        </div>

        {/* Agent */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Agent:</label>
          <FormControl fullWidth>
            <InputLabel>Select Agent</InputLabel>
            <Select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <MenuItem value="Agent A">Agent A</MenuItem>
              <MenuItem value="Agent B">Agent B</MenuItem>
              <MenuItem value="Agent C">Agent C</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Service */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Select Service:</label>
          <FormControl fullWidth>
            <InputLabel>Select Service</InputLabel>
            <Select
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <MenuItem value="Service X">Service X</MenuItem>
              <MenuItem value="Service Y">Service Y</MenuItem>
              <MenuItem value="Service Z">Service Z</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Details */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Details:</label>
          <TextField
            variant="outlined"
            placeholder="Enter details"
            multiline
            rows={3}
            fullWidth
          />
        </div>

        {/* Expected Revenue */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium lg:w-1/4 ">Expected Revenue:</label>
          <TextField
            variant="outlined"
            placeholder="Expected revenue"
            fullWidth
          />
        </div>

        {/* Currency */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Currency:</label>
          <FormControl fullWidth>
            <InputLabel>Select Currency</InputLabel>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Priority */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Priority:</label>
          <FormControl fullWidth>
            <InputLabel>Select Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Stages */}
        <div className="flex flex-col lg:flex-row sm:flex-col lg:items-center  md:items-start sm:items-start gap-4">
          <label className="text-lg font-medium w-1/4">Stage:</label>
          <FormControl fullWidth>
            <InputLabel>Select Stage</InputLabel>
            <Select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
            >
              <MenuItem value="Stage 1">Stage 1</MenuItem>
              <MenuItem value="Stage 2">Stage 2</MenuItem>
              <MenuItem value="Stage 3">Stage 3</MenuItem>
            </Select>
          </FormControl>
        </div>
       <div className="flex flex-end justify-end">
       <button className='bg-mainColor text-white py-2 px-8 rounded-md  '>
            Submit
        </button>
       </div>
      </form>
    </div>
  );
};

export default NewRequest;
