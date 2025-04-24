import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button,InputAdornment, IconButton , Table, TableContainer} from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoCloudUpload } from "react-icons/io5";
import { useAuth } from "../../../../../Context/Auth";
import { se } from "date-fns/locale";

const AddLeadPage = ({ update, setUpdate }) => {
    const { postData:postNewLead, loadingPost:loadingNewLead, response:responseNewLead} = usePost({ url: 'https://travelta.online/agent/leads/add' });
    const { postData:postLeadList, loadingPost:loadingLeadList, response:responseLeadList } = usePost({ url: 'https://travelta.online/agent/leads/add_lead' });
    const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({ url: 'https://travelta.online/agent/leads/leads_search' });
    const { refetch: refetchList, loading: loadingList, data: dataList } = useGet({ url: 'https://travelta.online/agent/leads/lists' });
    const [activeTab, setActiveTab] = useState("search"); // "add" or "search"
    const auth = useAuth();

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
    const [status, setStatus] = useState("active");
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

    const [selectedLead,setSelectedLead] = useState('')


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
    useEffect(() => {
        if ((!loadingNewLead && responseNewLead) || (!loadingLeadList && responseLeadList)) {
              setUpdate(!update);
              navigate(-1, { replace: true });
        }
    }, [responseNewLead,responseLeadList]);

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
  const handleSubmitLead = async (e) => {
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

      postNewLead(formData, 'Lead Added Success');
  };
  const handleAddLead = async (e) => {
      e.preventDefault();
      // Add lead logic here
      const formData = new FormData();
      formData.append('customer_id', selectedLead);
      formData.append('source_id', selectedSource);
      formData.append('agent_sales_id', selectedAgent);
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

  return (
      <>
        <div className="w-full">
        {/* Tabs Header */}
        <div className="flex justify-center gap-4 mb-6">
        <button
            className={`px-6 py-2 rounded-md shadow font-semibold transition-all hover:bg-white hover:text-mainColor ${
              activeTab === "search" ? "bg-mainColor text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("search")}
          >
            Search Lead
          </button>
          <button
            className={`px-6 py-2 rounded-md shadow font-semibold transition-all hover:bg-white hover:text-mainColor ${
              activeTab === "add" ? "bg-mainColor text-white" : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Add New Lead
          </button>
        </div>

          {/* Tab Content */}
          {activeTab === "add" ? (
              <form
              className="w-full flex flex-col gap-5 p-6"
              onSubmit={handleSubmitLead}
              >
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
                                  < IoCloudUpload/>
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
                    <span className={`text-base lg:text-lg font-semibold ${status === "active"? 'text-green-500' : 'text-gray-600'}`}>Active</span>
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
                    onClick={handleSubmitLead}
                    fullWidth
                    className="bg-mainColor hover:bg-blue-600 text-white"
                >
                    Submit
                </Button>
                </div>
              </div>
              </form>
                ) : (
                <div className="w-full flex flex-col gap-5 p-6 bg-white shadow-md rounded-md">
                <h1 className="w-full flex justify-center font-semibold text-mainColor text-xl">Search Lead Number</h1>
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
                                  <td  className={`py-2 flex justify-center items-center text-center border-b border-gray-200 hover:bg-gray-50 ${
                                      selectedLead === lead.id ? 'bg-green-50' : ''
                                    }`}>
                                                                    <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Toggle selection - if already selected, deselect; otherwise select
                                      setSelectedLead(selectedLead === lead.id ? null : lead.id);
                                    }}
                                    className={`flex gap-1 justify-center items-center font-bold ${
                                      selectedLead === lead.id 
                                        ? 'text-green-600' 
                                        : 'text-mainColor hover:text-blue-600'
                                    }`}
                                  >
                                    <IoMdPersonAdd /> 
                                    {selectedLead === lead.id ? 'Selected' : 'Add Lead'}
                                  </button>
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </Table>
                    </TableContainer>

                    {
                      selectedLead && (
                        <form className="w-full" onSubmit={handleAddLead}
                            >
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
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
                          </div>
                          <div className="w-full flex items-center gap-x-4 mt-5">
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
                      )
                    }
                    
                </div>
              )}
        </div>
      </>
    );
}
export default AddLeadPage;
