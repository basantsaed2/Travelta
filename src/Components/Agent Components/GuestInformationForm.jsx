import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, IconButton } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const GuestInformationForm = ({ maxPeople, onGuestInfoSubmit, initialData }) => {
  const [adults, setAdults] = useState(initialData?.adults || []);
  const [children, setChildren] = useState(initialData?.children || []);

  const addAdult = () => {
    setAdults([...adults, { title: '', firstName: '', lastName: '', phone: '' }]);
  };

  const addChild = () => {
    setChildren([...children, { age: '', firstName: '', lastName: '' }]);
  };

  const removeAdult = (index) => {
    setAdults(adults.filter((_, i) => i !== index));
  };

  const removeChild = (index) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const updateAdult = (index, field, value) => {
    const updatedAdults = [...adults];
    updatedAdults[index][field] = value;
    setAdults(updatedAdults);
  };

  const updateChild = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const handleSubmit = () => {
    if (adults.length + children.length > maxPeople) {
      alert(`Total guests cannot exceed ${maxPeople}.`);
      return;
    }
    if (adults.length === 0 && children.length === 0) {
      alert('Please add at least one guest.');
      return;
    }

    const adults_data = adults.map((adult) => ({
      title: adult.title,
      first_name: adult.firstName,
      last_name: adult.lastName,
      phone: adult.phone,
    }));

    const children_data = children.map((child) => ({
      age: child.age,
      first_name: child.firstName,
      last_name: child.lastName,
    }));

    onGuestInfoSubmit({ adults: adults_data, children: children_data });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Guest Information</h3>

      {/* Adult Input Fields */}
      <div>
        <h4 className="font-medium text-gray-600">Adults</h4>
        {adults.map((adult, index) => (
          <div key={index} className="flex flex-col space-y-2 mb-2 items-center">
            <FormControl fullWidth>
              <InputLabel>Title</InputLabel>
              <Select
                value={adult.title}
                onChange={(e) => updateAdult(index, 'title', e.target.value)}
                label="Title"
              >
                <MenuItem value="Mr">Mr</MenuItem>
                <MenuItem value="Ms">Ms</MenuItem>
                <MenuItem value="Mrs">Mrs</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="First Name"
              value={adult.firstName}
              onChange={(e) => updateAdult(index, 'firstName', e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={adult.lastName}
              onChange={(e) => updateAdult(index, 'lastName', e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              value={adult.phone}
              onChange={(e) => updateAdult(index, 'phone', e.target.value)}
              fullWidth
              type="tel"
            />
            <IconButton onClick={() => removeAdult(index)}>
              <FaTrash className="text-red-500" />
            </IconButton>
          </div>
        ))}
        {adults.length + children.length < maxPeople && (
          <Button onClick={addAdult} variant="outlined">
            Add Adult
          </Button>
        )}
      </div>

      {/* Children Input Fields */}
      <div>
        <h4 className="font-medium text-gray-600">Children</h4>
        {children.map((child, index) => (
          <div key={index} className="flex space-x-2 mb-2 items-center">
            <TextField
              label="Age"
              type="number"
              value={child.age}
              onChange={(e) => updateChild(index, 'age', e.target.value)}
              fullWidth
            />
            <TextField
              label="First Name"
              value={child.firstName}
              onChange={(e) => updateChild(index, 'firstName', e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={child.lastName}
              onChange={(e) => updateChild(index, 'lastName', e.target.value)}
              fullWidth
            />
            <IconButton onClick={() => removeChild(index)}>
              <FaTrash className="text-red-500" />
            </IconButton>
          </div>
        ))}
        {adults.length + children.length < maxPeople && (
          <Button onClick={addChild} variant="outlined">
            Add Child
          </Button>
        )}
      </div>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={adults.length + children.length === 0}
        fullWidth
      >
        Submit Guest Information
      </Button>
    </div>
  );
};

export default GuestInformationForm;