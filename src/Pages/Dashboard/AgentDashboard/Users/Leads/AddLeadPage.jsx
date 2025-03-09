import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button,InputAdornment, IconButton , Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination ,Switch} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";

const AddLeadPage = ({ update, setUpdate }) => {
    const { postData:postNewLead, loadingPost:loadingNewLead, response:responseNewLead} = usePost({ url: 'https://travelta.online/agent/leads/add' });
    const { postData:postLeadList, loadingPost:loadingLeadList, response:responseLeadList } = usePost({ url: 'https://travelta.online/agent/leads/add_lead' });
    const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({ url: 'https://travelta.online/agent/leads/leads_search' });
    const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: 'https://travelta.online/agent/leads/lists' });

    const [leads, setLeads] = useState([]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [alternatePhone, setAlternatePhone] = useState("");
    const [whatshapp, setWhatshapp] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredLeads,SetfilteredLeads] = useState([])
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

    const navigate = useNavigate();
    
    useEffect(() => {
        refetchLead();
        refetchList();
    }, [refetchLead,refetchList,update]);

    useEffect(() => {
        if (dataLead && dataLead.leads) {
          console.log("lead",dataLead)

            setLeads(dataLead.leads);
        }
    }, [dataLead]);
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

    const handleReset = () => {
        setName('');
        setPhone('');
        setEmail('');
        setGender('');
        setAlternatePhone('')
    };
    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    // useEffect(() => {
    //     if (!loadingNewLead || !loadingLeadList) {
    //         handleReset();
    //         setUpdate(!update);
    //     }
    // }, [responseNewLead, responseLeadList]);

    useEffect(() => {
      if ((!loadingNewLead && responseNewLead) || (!loadingLeadList && responseLeadList)) {
            setUpdate(!update);
            navigate(-1, { replace: true });
      }
  }, [responseNewLead,responseLeadList]);

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


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please Enter Name');
            return;
        }
        if (!phone) {
            alert('Please Enter Phone');
            return;
        }
        if (!email) {
            alert('Please Enter The Email');
            return;
        }
        if (!gender) {
            alert('Please Select Gender');
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

        postNewLead(formData, 'Lead Added Success');
    };

    const handleAddLead = (leadId) => {
        // Add lead logic here
        const formData = new FormData();
        formData.append('customer_id', leadId);

        console.log("Adding lead with ID:", leadId);
        postLeadList(formData, 'Lead Added Success');

    };

    const handleSearch = () => {
      if (searchQuery.trim() === "") {
       
        SetfilteredLeads([]);  
      } else {
        
        const filtered = leads.filter((lead) =>
          lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone === searchQuery 
        );
        SetfilteredLeads(filtered);
      }
    };
    
  
    // const filteredLeads = leads.filter((lead) =>
    //     lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     lead.phone.includes(searchQuery)
    // );

    return (
        <>
        <form
          className="w-full flex flex-col gap-5 p-6"
          onSubmit={handleSubmit}
          >
          
      {/* <h2 className="f font-semibold text-mainColor text-xl">back</h2> */}
    
      <h1 className="flex justify-center font-semibold text-mainColor text-xl">
        Add New Lead
      </h1>
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
          </div>
          <div className="w-full flex items-center gap-x-4">
            <div className="">
                <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
            </div>
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

        <div className="w-full flex flex-col gap-5 p-6 bg-white shadow-md rounded-md">
        <h1 className="w-full flex justify-center font-semibold text-mainColor text-xl">Add Lead</h1>
           <div className=" flex justify-between gap-3 ">
           <TextField
              label="Search by Name or Phone"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();}
              }
              className="mb-4 shadow-sm border-2 border-gray-300 focus:border-mainColor rounded-md p-3 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-mainColor focus:ring-opacity-50 transition-all duration-200"
            />
                 <Button
                type="button"
                variant="contained"
                className="bg-mainColor hover:bg-blue-600 text-white "
                onClick={handleSearch}
            >
                Search
            </Button>

           </div>

      
            {/* {filteredLeads.length === 0 ?
              <p className="text-center py-4 text-lg text-mainColor">No Lead Available For This Search</p>
            : */}
            <TableContainer className="overflow-x-auto bg-white shadow-md rounded-lg">
              <Table className="min-w-full">
                <thead className="w-full bg-gray-100">
                  <tr className="border-b-2 border-gray-300">
                    <th className="min-w-[120px] text-center py-3 text-lg font-semibold text-mainColor">Name</th>
                    <th className="min-w-[120px] text-center py-3 text-lg font-semibold text-mainColor">Email</th>
                    <th className="min-w-[120px] text-center py-3 text-lg font-semibold text-mainColor">Phone</th>
                    <th className="min-w-[120px] text-center py-3 text-lg font-semibold text-mainColor">Gender</th>
                    <th className="min-w-[120px] text-center py-3 text-lg font-semibold text-mainColor">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-3 text-xl text-mainColor font-TextFontMedium">
                        No Leads List Found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((lead, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-2 text-center text-thirdColor">{lead.name || '-'}</td>
                          <td className="py-2 text-center text-thirdColor">{lead.email || '-'}</td>
                          <td className="py-2 text-center text-thirdColor">{lead.phone || '-'}</td>
                          <td className="py-2 text-center text-thirdColor">{lead.gender || '-'}</td>
                          <td className="py-2 text-center flex justify-center items-center">
                            <button
                              onClick={() => handleAddLead(lead.id)}
                              className="flex gap-1 justify-center items-center text-mainColor font-bold hover:text-blue-600"
                            >
                              <IoMdPersonAdd /> Add Lead
                            </button>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </Table>
            </TableContainer>
            {/* } */}

        </div>
       </>
    );
};

export default AddLeadPage;
