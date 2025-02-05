import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import { usePost } from "../../../../../Hooks/usePostJson";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Checkbox, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddGroup = () => {
  const { refetch: refetchGroup, loading: loadingGroup, data: Group } = useGet({
    url: `https://travelta.online/agent/settings/group`,
  });

   const { postData, loadingPost, response } = usePost({
                  url: 'https://travelta.online/agent/settings/group/add',
                });

  const [name, setName] = useState("");
  const [nationalities, setNationalities] = useState([]); // Stores all nationalities
  const [nationalitiesIds, setNationalitiesIds] = useState([]); // Stores selected nationality IDs
  const navigate = useNavigate()
  useEffect(() => {
    refetchGroup();
  }, [refetchGroup]);
  useEffect(() => {
  console.log(nationalitiesIds)
  }, [nationalitiesIds])

  useEffect(() => {
    if (Group && Array.isArray(Group.nationalities)) {
      setNationalities(Group.nationalities);
    }
  }, [Group]);

  const handleNationalityChange = (event) => {
    const selectedId = event.target.value[event.target.value.length - 1]; // Get the last selected ID
    setNationalitiesIds((prevSelected) =>
      prevSelected.includes(selectedId)
        ? prevSelected.filter((id) => id !== selectedId) // Remove if already selected
        : [...prevSelected, selectedId] // Add if not selected
    );
    console.log("Selected Nationalities:", nationalitiesIds);
  };
                useEffect(() => {
                
                  if (!loadingPost) {
                    if (response) {
                      navigate(-1); // Navigate back only when the response is successful
                    } else {
                      console.error("Response does not indicate success:", response);
                    }
                  }
                }, [loadingPost, response, navigate]);

  const handleSubmit = () => {
               
            
    const formData = new FormData();
    formData.append('name', name);
    
    formData.append('nationalities', JSON.stringify(nationalitiesIds));
  
    postData(formData, 'Currency added successfully');
  };

  return (
    <div className="p-6 rounded-lg flex flex-col gap-4 shadow-md ">
      {/* Name Input */}
      <TextField
        fullWidth
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Group Name"
        className="mb-4"
        required
        
        
      />

      {/* Multi-Select with Checkboxes */}
      <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel>Select Nationalities</InputLabel>
        <Select
          multiple
          value={nationalitiesIds}
          onChange={(e)=>setNationalitiesIds(e.target.value)}
          renderValue={(selected) =>
            selected
              .map((id) => nationalities.find((nat) => nat.id === id)?.name)
              .join(", ")
          }
        >
          {nationalities.map((nat) => (
            <MenuItem key={nat.id} value={nat.id}>
              <Checkbox checked={nationalitiesIds.includes(nat.id)} />
              <ListItemText primary={nat.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loadingPost || !name || nationalitiesIds.length === 0}
        >
          {loadingPost ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default AddGroup;
