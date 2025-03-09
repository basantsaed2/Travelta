import React, { useState, useEffect ,useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useGet } from '../../../../../Hooks/useGet';
import { TextField, MenuItem, Button,InputAdornment, IconButton ,Switch} from "@mui/material";
import { useAuth } from '../../../../../Context/Auth';
import { IoCloudUpload } from "react-icons/io5";

const EditLead = ({ update, setUpdate }) => {
  const { leadId } = useParams();  // Get the leadId from URL params
  const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({url:'https://travelta.online/agent/leads'});
  const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: 'https://travelta.online/agent/leads/lists' });
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [whatshapp, setWhatshapp] = useState("");
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageBase64, setImageBase64] = useState(""); // Store base64 image
  const ImageRef = useRef();

  const [countries,setCountries] = useState([])
  const [selectedCountry,setSelectedCountry] = useState('')
  const [cities,setCities] = useState([])
  const [selectedCity,setSelectedCity] = useState('')
  const [nationalities,setNationalities] = useState([])
  const [selectedNationality,setSelectedNationality] = useState('')
  const [services,setServices] = useState([])
  const [selectedService,setSelectedService] = useState('')
  const [sources,setSources] = useState([])
  const [selectedSource,setSelectedSource] = useState('')
  const [agetSales,setAgetSales] = useState([])
  const [selectedAgent,setSelectedAgent] = useState('')
  const auth= useAuth()
  const navigate = useNavigate();

  // Fetch the lead data when the component is mounted or when the update state changes
  useEffect(() => {
    refetchLead();
  }, [refetchLead, update]);

  // Populate the form inputs with the fetched lead data
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
      }

    }
    console.log("data",dataLead)
  }, [dataLead, leadId]);

   useEffect(() => {
        if (dataList && dataList.countries) {
          console.log("lead lists",dataList)
            setCountries(dataList.countries);
            setCities(dataList.cities);
            setNationalities(dataList.nationalities);
            setServices(dataList.services);
            setSources(dataList.sources);
            setAgetSales(dataList.aget_sales);
        }
    }, [dataList]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create an object that will hold the updated fields only
    const updatedLead = {};
  
    // Conditionally add only the changed fields
    if (name) updatedLead.name = name;
    if (phone) updatedLead.phone = phone;
    if (email) updatedLead.email = email;
    if (gender) updatedLead.gender = gender;
  
    try {
      const response = await fetch(`https://travelta.online/agent/leads/update/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user?.token || ''}`, // Include authorization token
        },
        body: JSON.stringify(updatedLead),
      });
  
      if (response.ok) {
        // If successful, toggle the update state and navigate back
        setUpdate((prev) => !prev);  // Toggle the update state to re-fetch data
        navigate(-1);  // Navigate back to the leads page
        auth.toastSuccess("Data Update Successful")
      } else {
        auth.toastError('Failed to update the lead');
      }
    } catch (error) {
        auth.toastError('Error updating lead:', error);
    }
  };

  const handleSwitchChange = () => {
    setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
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
  
  return ( 
  <form onSubmit={handleSubmit} className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4'>
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
      onChange={(e) => setSelectedCountry(e.target.value)}
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
      >
      {cities.map((city) => (
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
                      < IoCloudUpload/>
                        </IconButton>
                    </InputAdornment>
                  ),
              }}
              />
            <div className="w-full flex items-center ml-5 mt-2">
              <span className="text-mainColor text-lg font-semibold">Status : </span>
                  <Switch
                      checked={status === 1}
                      onChange={handleSwitchChange}
                      color="primary"
                  />
            </div>
      </form>
  );
};

export default EditLead;
