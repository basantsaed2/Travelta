import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { usePost } from "../../../../Hooks/usePostJson";
import { useAuth } from "../../../../Context/Auth";

const AddInvoice = ({update,setUpdate}) => {
  const [day, setDay] = useState("");
  const [fine, setFine] = useState("");

  const { postData, loadingPost, response } = usePost({url:`https://travelta.online/api/super/settings/allow_time/update`,});
  const auth = useAuth()

  useEffect(() => {
    if (!loadingPost) {
      setUpdate(!update);
    }
  }, [response]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!day){
      auth.toastError("Enter day")
    }
    if(!fine){
      auth.toastError("Enter fine")
    }
    const formData= new FormData();
    
    formData.append("days",day)
    formData.append("fine",fine)

    postData(formData,"data added successful")
    
    setDay("");
    setFine("");
  };

  return (
    <div className="rounded-lg p-6">

      <form onSubmit={handleSubmit} className="space-y-4">
     <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-2 gap-2">
     <TextField
          label="Days"
          variant="outlined"
          fullWidth
          className="bg-white"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <TextField
          label="Fine Amount"
          variant="outlined"
          fullWidth
          className="bg-white"
          value={fine}
          onChange={(e) => setFine(e.target.value)}
        />
     </div>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          
          className="bg-blue-500  hover:bg-blue-600 transition duration-300"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddInvoice;
