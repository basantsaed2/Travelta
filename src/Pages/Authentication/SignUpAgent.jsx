import React, { useState ,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLogo from "../../Assets/Images/MainLogo";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../Context/Auth';
import InputCustom from '../../Components/InputCustom';
import Select from 'react-select';
import Loading from '../../Components/Loading';

const SignUpAgent = () => {
  const [data, setData] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // To control modal visibility

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [countryData, setCountryData] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountryOption, setSelectedCountryOption] = useState(null); // To store the selected option

  const [cityData, setCityData] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCityOption, setSelectedCityOption] = useState(null); // To store the selected option

  const [serviceData, setServiceData] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [selectedServiceOption, setSelectedServiceOption] = useState([]); // To store the selected option

  const [sourceData, setSourceData] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [selectedSourceOption, setSelectedSourceOption] = useState([]); // To store the selected option

  // const [roleData, setRoleData] = useState([]);
  const roleOptions = [
    { value: 'agent', label: 'Agent' },
    { value: 'supplier', label: 'Supplier' },
  ];
  // const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRoleOption, setSelectedRoleOption] = useState([]); // To store the selected option

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [password, setPassword] = useState('');

  const [taxCardImage, setTaxCardImage] = useState('');
  const [tourismLicenseImage, setTourismLicenseImage] = useState('');
  const [commercialRegisterImage, setCommercialRegisterImage] = useState('');

  const auth = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
           const response = await axios.get('https://www.travelta.online/agent/signupLists', {
                  headers: {
                         Authorization: `Bearer ${auth.user.token}`,
                  },
           });
           if (response.status === 200) {
                  console.log(response.data)
                  setData(response.data)
                  setCountryData(response.data.countries)
                  setCityData(response.data.cities)
                  setSourceData(response.data.sources)
           }
    } catch (error) {
           console.error('Error fetching data:', error);
    } finally {
           setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    if(countryData && cityData && sourceData && serviceData){
      const formattedCountryOptions = countryData.map((country) => ({
        value: country.id, // Use the country name or ID as the value
        label: country.name, // Display the country name
      }));
      const formattedCityOptions = cityData.map((city) => ({
        value: city.id, // Use the country name or ID as the value
        label: city.name, // Display the country name
      }));
      const formattedSourceOptions = sourceData.map((source) => ({
        value: source.id, // Use the country name or ID as the value
        label: source.source, // Display the country name
      }));

      setCountryOptions(formattedCountryOptions); // Update state with formatted options
      setCityOptions(formattedCityOptions)
      setSourceOptions(formattedSourceOptions)
    }
  }, [countryData, cityData ,sourceData, serviceData]);


  const handleCountryChange = (selected) => {
    setSelectedCountryOption(selected);
    console.log('Selected Country:', selected); // Do something with the selected option
  };

  const handleCityChange = (selected) => {
    setSelectedCityOption(selected);
    console.log('Selected City:', selected); // Do something with the selected option
  };

  const handleSourceChange = (selected) => {
    setSelectedSourceOption(selected);
    console.log('Selected Source:', selected); // Do something with the selected option
  };

  const handleRoleChange = (selected) => {
    setSelectedRoleOption(selected);
    console.log('Selected Role:', selected); // Do something with the selected option
  };

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

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    navigate('/login'); // Navigate to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
        auth.toastError('Please Enter the Name.');
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
    if (!address) {
      auth.toastError('Please Enter the Password.');
      return;
    }
    if (!selectedCountryOption) {
      auth.toastError('Please Select Country.');
      return;
    }
    if (!selectedCityOption) {
      auth.toastError('Please Select City.');
      return;
    }
    if (!ownerName) {
      auth.toastError('Please Enter the Owner Name.');
      return;
    }
    if (!ownerPhone) {
      auth.toastError('Please Enter the Owner Name.');
      return;
    }
    if (!ownerPhone) {
      auth.toastError('Please Enter the Owner Phone.');
      return;
    }
    if (!ownerEmail) {
      auth.toastError('Please Enter the Owner Email.');
      return;
    }

    setIsLoading(true);

    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('password', password);

        formData.append('owner_name', ownerName);
        formData.append('owner_phone', ownerPhone);
        formData.append('owner_email', ownerEmail);
        
        // Add selected IDs to the form data
        formData.append('country_id', selectedCountryOption?.value || '');
        formData.append('city_id', selectedCityOption?.value || '');
        formData.append('source_id', selectedSourceOption?.value || '');

        formData.append('role', selectedRoleOption?.value || '');

        // Add other files
        if (taxCardImage) formData.append('tax_card_image', taxCardImage);
        if (tourismLicenseImage) formData.append('tourism_license_image', tourismLicenseImage);
        if (commercialRegisterImage) formData.append('commercial_register_image', commercialRegisterImage);

        const response = await axios.post(
            'https://travelta.online/agent/signupAgent',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        if (response.status === 200) {
            // toast.success('Sign-up successful!');
            console.log('Response:', response.data);
            setModalVisible(true); // Show the modal on successful sign-up
        } else {
            toast.error('Unexpected error occurred during sign-up.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        if(error.response.data.errors.owner_phone.includes("The owner phone has already been taken.")){
          toast.error('The owner phone has already been taken.');
        }
        else if (error.response.data.errors.phone.includes("The phone has already been taken.")){
          toast.error('The phone has already been taken.');
        }
        else{
          toast.error(error?.response?.data?.error || 'Network error');
        }
    } finally {
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
 if (!data) {
  return (
    <div className="text-mainColor text-2xl font-bold flex items-center justify-center h-screen">
      No Data available
    </div>
  );
}  

  return (
    <div className="sign-up-page flex flex-col items-center justify-center lg:justify-around w-full xl:h-screen lg:h-full text-secoundColor">
        <h2 className="p-4 pb-0 text-3xl font-semibold text-mainColor text-center mb-5">Sign Up Agent</h2>        

        <div className="flex fixed items-center justify-between w-full relative">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <div key={step} className="relative flex items-center justify-center w-full">
                {/* Line Before Circle */}
                {index > 0 && (
                  <div className={`absolute left-0 right-1/2 top-1/2 -translate-y-1/2 h-1 ${currentStep >= step ? "bg-mainColor" : "bg-[#C6C6C6]"}`} style={{ zIndex: 1 }}></div>
                )}

                {/* Circle */}
                <div className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${currentStep === step ? "bg-mainColor text-white shadow-lg border-mainColor" : currentStep > step ? "bg-mainColor border-mainColor text-white" : "bg-gray-200 border-gray-300 text-gray-500"} border-2`}>
                  {step}
                </div>

                {/* Line After Circle */}
                {index < 4 && (
                  <div className={`absolute left-1/2 right-0 top-1/2 -translate-y-1/2 h-1 ${currentStep > step ? "bg-mainColor" : "bg-[#C6C6C6]"}`} style={{ zIndex: 1 }}></div>
                )}
              </div>
            ))}
        </div>

        <div className='w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-around w-full'>
            <div className="xl:w-1/2 flex flex-col items-center w-full bg-white rounded-lg p-6 ">

              {/* Sections */}
              <form className='w-full xl:w-3/4' onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <section className='flex flex-col gap-5'>
                    <h3 className="text-2xl text-mainColor font-semibold mb-4">Basic Information</h3>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Name"
                            // borderColor="mainColor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="email"
                            placeholder="Email"
                            borderColor="mainColor"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="tel"
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
                    <div className="text-right">
                      <button type="button" onClick={nextStep} className="w-full bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
                    </div>
                  </section>
                )}

                {currentStep === 2 && (
                  <section className='flex flex-col gap-5'>
                    <h3 className="text-2xl text-mainColor font-semibold mb-4">Location Information</h3>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Address"
                            borderColor="mainColor"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                    <Select
                      options={countryOptions}
                      value={selectedCountryOption}
                      onChange={handleCountryChange}
                      placeholder="Choose a Country"
                      className="custom__control p-2"
                    />
                    </div>
                    <div className="w-full">
                    <Select
                      options={cityOptions}
                      value={selectedCityOption}
                      onChange={handleCityChange}
                      placeholder="Choose a City"
                      className="custom__control p-2"
                    />
                    </div>
                    <div className="flex justify-between">
                      <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Back</button>
                      <button type="button" onClick={nextStep} className="bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
                    </div>
                  </section>
                )}

                {currentStep === 3 && (
                  <section className='flex flex-col gap-5'>
                    <h3 className="text-2xl text-mainColor font-semibold mb-4">Owner Information</h3>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Owner Name"
                            borderColor="mainColor"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="email"
                            placeholder="Owner Email"
                            borderColor="mainColor"
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="tel"
                            placeholder="Owner Phone"
                            borderColor="mainColor"
                            value={ownerPhone}
                            onChange={(e) => setOwnerPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                      <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Back</button>
                      <button type="button" onClick={nextStep} className="bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
                    </div>
                  </section>
                )}

                {currentStep === 4 && (
                  <section className="flex flex-col gap-5">
                    <h3 className="text-2xl text-mainColor font-semibold mb-4">Upload Images</h3>

                    {/* Tax Card Image */}
                    <div className="w-full flex flex-col gap-1">
                    <label className="text-black text-lg font-semibold">Tax Card Image : </label>
                    <InputCustom
                        type="file"
                        upload={true}
                        placeholder="Tax Card Image"
                        borderColor="mainColor"
                        onChange={(e) => handleFileChange(e, setTaxCardImage)}
                      />
                    </div>

                    {/* Tourism License Image */}
                    <div className="w-full flex flex-col gap-1">
                    <label className="text-black text-lg font-semibold">Tourism License Image : </label>
                      <InputCustom
                        type="file"
                        upload={true}
                        placeholder="Tourism License Image"
                        borderColor="mainColor"
                        onChange={(e) => handleFileChange(e, setTourismLicenseImage)}
                      />
                    </div>

                    {/* Commercial Register Image */}
                    <div className="w-full flex flex-col gap-1">
                    <label className="text-black text-lg font-semibold">Commercial Register Image : </label>                      <InputCustom
                        type="file"
                        upload={true}
                        placeholder="Commercial Register Image"
                        borderColor="mainColor"
                        onChange={(e) => handleFileChange(e, setCommercialRegisterImage)}
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </div>
                  </section>
                )}

                {currentStep === 5 && (
                  <section className="flex flex-col gap-5">
                    <h3 className="text-2xl text-mainColor font-semibold mb-4">Services & Source </h3>

                    <div className="w-full">
                    <Select
                      options={sourceOptions}
                      value={selectedSourceOption}
                      onChange={handleSourceChange}
                      placeholder="Choose a Source"
                      className="custom__control p-2"
                    />
                    </div>
                    <div className="w-full">
                    <Select        
                      options={roleOptions}
                      value={selectedRoleOption}
                      onChange={handleRoleChange}
                      placeholder="Choose a Role"
                      className="custom__control p-2"
                    />
                    </div>

                    <div className="flex justify-between">
                      <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Back</button>
                      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Sign Up</button>
                    </div>
                  </section>
                )}

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

export default SignUpAgent;
