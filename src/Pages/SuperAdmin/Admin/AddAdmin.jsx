import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { FaArrowLeft } from "react-icons/fa";
import { usePost } from "../../../Hooks/usePostJson";
import { useAuth } from "../../../Context/Auth";
import { useGet } from "../../../Hooks/useGet";
import { MenuItem, TextField, CircularProgress, Button } from "@mui/material";

const AddAdmin = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const auth = useAuth();

 const { postData, loadingPost, response } = usePost({
    url: `https://www.travelta.online/api/super/admin/add`,
  });
        const handleSubmit = (e) => {
           e.preventDefault();
if (!name) {
  auth.toastError('Enter Admin Name');
  return;
}
if (!password) {
  auth.toastError('Enter Admin password');
  return;
}

const phoneRegex = /^\+?[0-9]{5,20}$/;
if (!phone || !phoneRegex.test(phone)) {
  auth.toastError('Enter a valid phone number ');
  return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email || !emailRegex.test(email)) {
  auth.toastError('Enter a valid Email address');
  return;
}

const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('email', email);
    postData(formData, 'Admin Added Successfully');
        }
         useEffect(() => {
    if (loadingPost) {
      navigate(-1);
   
    }
  }, [loadingPost, navigate]);
  return (
    <div className="flex items-start justify-start min-h-screen">
      <div className="w-full p-8 rounded-2xl">
        <div className="flex items-center mb-6 space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl text-mainColor"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-3xl font-semibold text-mainColor">Add Admin</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <TextField
              id="name"
              label="Admin  Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Admin name"
              fullWidth
              variant="outlined"
              required
              className="rounded-xl"
              sx={{
                "& .MuiInputBase-root": {},
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>
          <div className="mb-6">
            <TextField
              id="Phone"
              label="Admin Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Admin Phone"
              fullWidth
              variant="outlined"
              required
              className="rounded-xl"
              sx={{
                "& .MuiInputBase-root": {},
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />{" "}
          </div>

          <div className="mb-6">
            <TextField
              id="Email"
              label="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Admin Email"
              fullWidth
              variant="outlined"
              required
              className="rounded-xl"
              sx={{
                "& .MuiInputBase-root": {},
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>
          <div className="mb-6">
            <TextField
              id="password"
              label="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin password"
              fullWidth
              variant="outlined"
              required
              className="rounded-xl"
              sx={{
                "& .MuiInputBase-root": {},
                "& .MuiInputLabel-root": {
                  fontSize: "1rem",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </div>
             <div className="flex justify-center mb-4">
          <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full py-3 text-lg font-semibold transition duration-300 ease-in-out rounded-full"
              disabled={loadingPost}
            >
              {loadingPost ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
