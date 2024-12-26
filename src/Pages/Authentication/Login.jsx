import React, { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLogo from "../../Assets/Images/MainLogo";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import InputCustom from '../../Components/InputCustom';
import Select from 'react-select';
import Loading from '../../Components/Loading';

const Login = () => {

  const [data, setData] = useState('');
  const [userData, setUserData] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
    if (userData) {
           console.log('Calling auth.login with data:', userData); // Debugging line
           auth.login(userData); // Call auth.login with the updated data
           setIsLoading(false);

           if (userType === "agent") {
                  navigate("/dashboard_agent", { replace: true });
           }
            else{
              navigate("/login", { replace: true });     
     }
    }
  }, [userData]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      auth.toastError('Please Enter the Email.');
      return;
    }
    if (!password) {
      auth.toastError('Please Enter the Password.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await axios.post('https://travelta.online/agent/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Login successful!');
              console.log('Response:', response.data);
              const userData = {
                ...response.data.user,
                roles: [response.data.user.role] // Assuming role is the user's role
              };
        setUserData(userData);
        setUserType(response.data.user.role);
        console.log("response role", response.data.user.role);
      } else {
        toast.error('Unexpected error occurred during login.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error?.response?.data?.error || 'Network error');
    }
  };
  
  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading/>
        </div>
    );
 }  

  return (
    <div className="sign-up-page flex flex-col items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full text-secoundColor">
        <h2 className="p-4 pb-0 text-3xl font-semibold text-mainColor text-center mb-5">Login</h2>

         <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full'>
            <div className="xl:w-1/2 flex flex-col items-center w-full bg-white rounded-lg p-2 ">  
            <form className='w-full xl:w-3/4' onSubmit={handleSubmit}>
                <section className="flex flex-col gap-5">
                <div className="w-full">
                <InputCustom  type="email"
                            placeholder="Email"
                            borderColor="mainColor"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="w-full">
                <InputCustom
                    type={showPassword ? "text" : "password"}
                    borderColor="mainColor"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button
                type="submit"
                className="bg-mainColor text-white px-4 py-2 rounded hover:bg-opacity-90 w-full"
                >
                {isLoading ? "Loading..." : "Login"}
                </button>
                </section>
                </form>
            </div>

            <div className="xl:w-1/2 w-full flex justify-center">
              <MainLogo />
            </div>
        </div>
    </div>
  );
};

export default Login;
