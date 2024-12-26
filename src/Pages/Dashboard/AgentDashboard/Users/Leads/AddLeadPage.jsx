import React, { useState ,useEffect} from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';

const AddLeadPage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url:'https://travelta.online/agent/leads/add'});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");

    const handleReset = () => {
        setName('')
        setPhone('')
        setEmail('')
        setGender('')
    }

     useEffect(() => {
        if (!loadingPost) {
                handleReset()
                setUpdate(!update)
            }
    }, [response])


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
           auth.toastError('please Enter Name')
           return;
    }
    if (!phone) {
           auth.toastError('please Enter phone')
           return;
    }
    if (!email) {
           auth.toastError('please Enter The Email')
           return;
    }
    if (!gender) {
        auth.toastError('please Select Gender')
        return;
    }
    const formData = new FormData();

    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('gender', gender)

    postData(formData, 'Lead Added Success');
    }

  return (
    <>
    <form
    className="w-full flex flex-col gap-10 p-6"
    onSubmit={handleSubmit}
    >
        <div
            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
        >
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
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
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
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
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
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
        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            {/* <span className="text-xl font-TextFontRegular text-thirdColor">Name:</span> */}
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
        </div>
          <div className="w-full flex items-center gap-x-4">
            {/* <div className="">
                <StaticButton text={'Reset'} handleClick={handleReset} bgColor='bg-transparent' Color='text-mainColor' border={'border-2'} borderColor={'border-mainColor'} rounded='rounded-full' />
            </div> */}
            <div className="">
                <Button
                type="submit"
                variant="contained"
                fullWidth
                className="bg-mainColor hover:bg-blue-600 text-white"
            >
                Submit
            </Button>
            </div>
        </div>
    </form>
    </>
  );
};

export default AddLeadPage;
