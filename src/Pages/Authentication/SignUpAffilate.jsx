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

const SignUpAffilate = () => {
  const auth = useAuth();
  const [data, setData] = useState('');
  const [userData, setUserData] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [imageType, setImageType] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [nationalImage1, setNationalImage1] = useState(null);
  const [nationalImage2, setNationalImage2] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const imageTypeOptions = [
    { value: 'passport', label: 'Passport' },
    { value: 'national', label: 'National' },
  ];
    const [selectedImageTypeOption, setSelectedImageTypeOption] = useState(''); // To store the selected option

  const roleOptions = [
    { value: 'affiliate', label: 'Affiliate' },
    { value: 'freelancer', label: 'Freelancer' },
  ];
    const [selectedRoleOption, setSelectedRoleOption] = useState(''); // To store the selected option

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTypeChange = (selected) => {
    setSelectedImageTypeOption(selected);
    console.log('Selected Image Type:', selected); // Do something with the selected option
  };

  const handleRoleChange = (selected) => {
    setSelectedRoleOption(selected);
    console.log('Selected Role:', selected); // Do something with the selected option
  };

  
  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    navigate('/login'); // Navigate to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fName) {
      auth.toastError('Please Enter the First Name.');
      return;
    }
    if (!lName) {
      auth.toastError('Please Enter the Last Name.');
      return;
    }
    if (!email) {
      auth.toastError('Please Enter the Email.');
      return;
    }
    if (!phone) {
      auth.toastError('Please Enter the Phone.');
      return;
    }
    if (!password) {
      auth.toastError('Please Enter the Password.');
      return;
    }

    if (!selectedImageTypeOption) {
      auth.toastError('Please Select Image Type.');
      return;
    }
    // if (!selectedRoleOption) {
    //   auth.toastError('Please Select Role.');
    //   return;
    // }

    if (selectedImageTypeOption.value === 'passport' && !passportImage) {
      toast.error('Please upload your passport image.');
      return;
    }

    if (selectedImageTypeOption.value === 'national' && (!nationalImage1 || !nationalImage2)) {
      toast.error('Please upload both national ID images.');
      return;
    }

    const formData = new FormData();
    formData.append('f_name', fName);
    formData.append('l_name', lName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('image_type', selectedImageTypeOption?.value);
    // formData.append('role', selectedRoleOption?.value);
    formData.append('role', 'affilate');

    if (selectedImageTypeOption.value === 'passport') {
      formData.append('passport_image', passportImage);
    } else {
      formData.append('national_image1', nationalImage1);
      formData.append('national_image2', nationalImage2);
    }

    try {
      const response = await axios.post('https://travelta.online/agent/signupAffilate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
                         // toast.success('Sign-up successful!');
                         console.log('Response:', response.data);
                         setModalVisible(true); // Show the modal on successful sign-up
               } else {
                   toast.error('Unexpected error occurred during sign-up.');
               }
        }
        catch (error) {
          console.error('Error post JSON:', error);
        
          // Check if the error response contains 'errors' or just a message
          if (error?.response?.data?.errors) {
            // Check if errors are an object (field-based errors)
            if (typeof error.response.data.errors === 'object') {
              Object.entries(error.response.data.errors).forEach(([field, messages]) => {
                // If messages is an array, loop through them
                if (Array.isArray(messages)) {
                  messages.forEach(message => {
                    auth.toastError(message); // Display the error messages
                  });
                } else {
                  // If it's not an array, display the message directly
                  auth.toastError(messages);
                }
              });
            } else {
              // If errors is not an object, assume it's just a message
              auth.toastError(error.response.data.errors);
            }
          } else if (error?.response?.data?.message) {
            // If there's a general message outside of the 'errors' object
            auth.toastError(error.response.data.message); // Display the general error message
          } else {
            // If no specific error messages are found, just display a fallback message
            auth.toastError('An unknown error occurred.');
          }
        }
       finally {
          setIsLoading(false);
      }
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-start justify-center m-auto">
        <Loading/>
      </div>
    );
 }  

  return (
    <div className="sign-up-page flex flex-col items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full text-secoundColor">
        <h2 className="p-4 pb-0 text-3xl font-semibold text-mainColor text-center mb-5">SignUp Affilate</h2>

         <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full'>
            <div className="xl:w-1/2 flex flex-col items-center w-full bg-white rounded-lg p-2 ">  
            <form className='w-full xl:w-3/4' onSubmit={handleSubmit}>
                <section className="flex flex-col gap-5">
                <div className="w-full flex gap-3">
                    <InputCustom  type="text"
                            placeholder="First Name"
                            borderColor="mainColor"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                    />
                    <InputCustom  type="text"
                            placeholder="Last Name"
                            borderColor="mainColor"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                    />
                </div>
                <div className="w-full">
                <InputCustom  type="email"
                            placeholder="Email"
                            borderColor="mainColor"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="w-full">
                <InputCustom  type="tel"
                            placeholder="Phone"
                            borderColor="mainColor"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                <div className="w-full">
                 <Select
                      options={imageTypeOptions}
                      value={selectedImageTypeOption}
                      onChange={handleImageTypeChange}
                      placeholder="Select Image Type"
                      className="custom__control p-2"
                    />
                {selectedImageTypeOption?.value === 'passport' && (
                <InputCustom
                    label="Upload Passport Image"
                    type="file"
                    onChange={(e) => handleFileChange(e, setPassportImage)}
                />
                )}
                {selectedImageTypeOption?.value === 'national' && (
                <>
                    <InputCustom
                    label="Upload National ID Image 1"
                    type="file"
                    onChange={(e) => handleFileChange(e, setNationalImage1)}
                    />
                    <InputCustom
                    label="Upload National ID Image 2"
                    type="file"
                    onChange={(e) => handleFileChange(e, setNationalImage2)}
                    />
                </>
                )}
                </div>
                {/* <div className="w-full">
                    <Select        
                      options={roleOptions}
                      value={selectedRoleOption}
                      onChange={handleRoleChange}
                      placeholder="Choose a Role"
                      className="custom__control p-2"
                    />
                </div> */}
                <button
                type="submit"
                className="bg-mainColor text-white px-4 py-2 rounded hover:bg-opacity-90 w-full"
                >
                Sign Up
                </button>
                </section>
                </form>

              {/* Log In Link */}
                <p className="mt-6 text-mainColor text-center">
                    I Have An Account?{" "}
                    <Link to="/login" className="text-mainColor font-semibold hover:underline">Log In</Link>
                </p>
            </div>

            <div className="xl:w-1/2 w-full flex justify-center">
              <MainLogo />
            </div>
        </div>

        
         {/* Modal */}
         {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-all duration-300 scale-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Sign-Up Successful!
              </h3>
              <p className="text-gray-600 leading-relaxed">
              Thank you for signing up! We are reviewing your application and will get back to you shortly
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

export default SignUpAffilate;
