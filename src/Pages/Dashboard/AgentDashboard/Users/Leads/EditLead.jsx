import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { usePost } from '../../../../../Hooks/usePostJson';
import { TextField, MenuItem, Button, InputAdornment, IconButton, Switch } from "@mui/material";
import { useAuth } from '../../../../../Context/Auth';
import { IoCloudUpload } from "react-icons/io5";
import StaticLoader from "../../../../../Components/StaticLoader";

const EditLead = ({ update, setUpdate }) => {
  const { leadId } = useParams();  // Get the leadId from URL params
  const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({ url: 'https://travelta.online/agent/leads' });
  const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: 'https://travelta.online/agent/leads/lists' });
  const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/leads/update/${leadId}`});

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [whatshapp, setWhatshapp] = useState("");
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState("active");
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // Store base64 image
  const ImageRef = useRef();

  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [nationalities, setNationalities] = useState([])
  const [selectedNationality, setSelectedNationality] = useState('')
  const [services, setServices] = useState([])
  const [selectedService, setSelectedService] = useState('')
  const [sources, setSources] = useState([])
  const [selectedSource, setSelectedSource] = useState('')
  const [agetSales, setAgetSales] = useState([])
  const [selectedAgent, setSelectedAgent] = useState('')
  const auth = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    refetchLead();
  }, [refetchLead, update]);
  useEffect(() => {
    if (dataLead && dataLead.leads) {
      const lead = dataLead.leads.find((lead) => lead.id === parseInt(leadId)); // Find the lead by ID
      if (lead) {
        setName(lead.name);
        setPhone(lead.phone);
        setAlternatePhone(lead.alternatePhone || '');  // Handle optional field
        setEmail(lead.email);
        setGender(lead.gender);

        setWhatshapp(lead.watts);
        setSelectedCountry(lead.country?.id);
        setSelectedCity(lead.city?.id);
        setSelectedNationality(lead.nationality?.id);
        setSelectedService(lead.service?.id);
        setSelectedSource(lead.source?.id);
        setSelectedAgent(lead.agent_sales?.id);

        setImageFile(lead.image_link || '')
        setImageName(lead.image || '')
        setStatus(lead.status);
      }

    }
    console.log("data", dataLead)
  }, [dataLead, leadId]);

  useEffect(() => {
    if (dataList && dataList.countries) {
      console.log("lead lists", dataList)
      setCountries(dataList.countries);
      setCities(dataList.cities);
      setNationalities(dataList.nationalities);
      setServices(dataList.services);
      setSources(dataList.sources);
      setAgetSales(dataList.aget_sales);
    }
  }, [dataList]);
  useEffect(() => {
        if (!loadingPost && response){
              setUpdate(!update);
              navigate(-1, { replace: true });
        }
    }, [loadingPost,response]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
        auth.toastError('Please Enter Name');
        return;
    }
    if (!phone) {
      auth.toastError('Please Enter Phone');
        return;
    }
    if (!email) {
      auth.toastError('Please Enter The Email');
        return;
    }
    if (!gender) {
      auth.toastError('Please Select Gender');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('emergency_phone', alternatePhone);

    formData.append('watts', whatshapp);
    formData.append('source_id', selectedSource);
    formData.append('agent_sales_id', selectedAgent);
    formData.append('service_id', selectedService);
    formData.append('nationality_id', selectedNationality);
    formData.append('country_id', selectedCountry);
    formData.append('city_id', selectedCity);
    formData.append('image', imageBase64);
    formData.append('status', status);

    postData(formData, 'Lead Updated Success');
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);

      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result); // Store base64 string
      };
    }
  };
  const handleImageClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setGender('');
    setAlternatePhone('');
    setSelectedCountry('');
    setSelectedCity('');
    setSelectedNationality('');
    setSelectedService('');
    setSelectedSource('');
    setSelectedAgent('');
    setStatus('active');
    setImageFile('');
    setImageBase64('');
    setImageName('');
  };

  if (loadingLead || loadingList || loadingPost){
    return <StaticLoader/>
  }
  return (
    <form
      className="w-full flex flex-col gap-5 p-6"
      onSubmit={handleSubmit}
    >
      <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
        />
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
        <TextField
          label="Alternate Phone"
          variant="outlined"
          type="tel"
          fullWidth
          value={alternatePhone}
          onChange={(e) => setAlternatePhone(e.target.value)}
          className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
        />
        <TextField
          label="WhatsApp"
          variant="outlined"
          type="tel"
          fullWidth
          value={whatshapp}
          onChange={(e) => setWhatshapp(e.target.value)}
          className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
        />
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
        <TextField
          select
          label="Select Service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          fullWidth
        >
          {services.map((service) => (
            <MenuItem key={service.id} value={service.id}>
              {service.service_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Agent"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          fullWidth
        >
          {agetSales.map((agetSale) => (
            <MenuItem key={agetSale.id} value={agetSale.id}>
              {agetSale.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Source"
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          fullWidth
        >
          {sources.map((source) => (
            <MenuItem key={source.id} value={source.id}>
              {source.source}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Nationality"
          value={selectedNationality}
          onChange={(e) => setSelectedNationality(e.target.value)}
          fullWidth
        >
          {nationalities.map((nationality) => (
            <MenuItem key={nationality.id} value={nationality.id}>
              {nationality.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Select Country"
          value={selectedCountry}
          onChange={(e) => {
            const countryId = e.target.value;
            setSelectedCountry(countryId);
            // Optional: Clear selected city when country changes
            setSelectedCity('');
          }}
          fullWidth
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Select City"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          fullWidth
          disabled={!selectedCountry} // disables when no country is selected
        >
          {cities
            .filter((city) => city.country_id === selectedCountry) // filter cities by selected country
            .map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
        </TextField>
        <input
          type="file"
          ref={ImageRef}
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <TextField
          label="Upload Logo"
          variant="outlined"
          fullWidth
          value={imageName}
          onClick={() => handleImageClick(ImageRef)} // Open file dialog when clicked
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  < IoCloudUpload />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className="w-full flex items-center">
          <span className="text-mainColor text-lg font-semibold">Status: </span>

          {/* Radio Button Group */}
          <div className="flex items-center space-x-4 ml-2">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
                className="form-radio text-green-500"
              />
              <span className={`text-base lg:text-lg font-semibold ${status === "active" ? 'text-green-500' : 'text-gray-600'}`}>Active</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={status === "inactive"}
                onChange={() => setStatus("inactive")}
                className="form-radio text-yellow-500"
              />
              <span className={`text-base lg:text-lg font-semibold ${status === "inactive" ? 'text-red-500' : 'text-gray-600'}`}>Inactive</span>
            </label>

            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="status"
                value="suspend"
                checked={status === "suspend"}
                onChange={() => setStatus("suspend")}
                className="form-radio text-red-500"
              />
              <span className={`text-base lg:text-lg font-semibold ${status === "suspend" ? 'text-yellow-500' : 'text-gray-600'}`}>Suspended</span>
            </label>
          </div>
        </div>

      </div>
      <div className="w-full flex items-center gap-x-4">
        <div className="">
          <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
        </div>
        <div className="">
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            className="bg-mainColor hover:bg-blue-600 text-white"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditLead;
