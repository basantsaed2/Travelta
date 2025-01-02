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
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

   useEffect(() => {
    if (userData) {
           console.log('Calling auth.login with data:', userData); // Debugging line
           auth.login(userData); // Call auth.login with the updated data
           setIsLoading(false);

            if (userType === "agent" && userData.plan_id !== null) {
                  navigate("/dashboard_agent", { replace: true });
           }
           else if (userType === "agent" && userData.plan_id === null) {
                  navigate("/dashboard/plans", { replace: true });
           }
            else{
              navigate("/", { replace: true });     
     }
    }
  }, [userData]);

  
  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    navigate('/'); // Navigate to login page
  };
 
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
          if (response.data.user.status === "pending") {
            console.log('Response:', response.data);
            setModalVisible(true); // Show the modal on successful sign-up
          }else if (response.data.user.status === "approve") {
              toast.success('Login successful!');
                    console.log('Response:', response.data);
                    const userData = {
                      ...response.data.user,
                      roles: [response.data.user.role] // Assuming role is the user's role
                    };
              setUserData(userData);
              setUserType(response.data.user.role);
              console.log("response role", response.data.user.role);
                  }
      } else {
        toast.error('Unexpected error occurred during login.');
      }
    } catch (error) {
      if (error?.response?.data?.faield === "creational not Valid") {
        toast.error("Email or Password is incorrect");
      } else {
      console.error('Error submitting form:', error);
      toast.error(error?.response?.data?.error || 'Network error');
    }}
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

                  {/* Log In Link */}
                  <p className="mt-6 text-mainColor text-center">
                  Don't have an account? <Link to="/sign_agent" className="text-mainColor font-semibold hover:underline">Sign Up</Link>
                  </p>
                </section>
                </form>
            </div>

            <div className="xl:w-1/2 w-full flex justify-center">
              <MainLogo />
            </div>
        </div>

        {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-300 scale-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome!
              </h3>
              <p className="text-gray-600 leading-relaxed">
              Your application is currently under review, and you will be notified as soon as it is approved.
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-6 bg-mainColor text-white py-3 px-6 rounded-lg w-full font-medium text-lg hover:bg-mainColor/90 focus:outline-none focus:ring-4 focus:ring-mainColor/50 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
        )}
  
    </div>
  );
};

export default Login;
