import React, { useState ,useEffect ,useRef} from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment,ListItemText,Switch, Button,FormControlLabel,RadioGroup,Radio  } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';

const AddTourPage = ({ update, setUpdate }) => {
    const { refetch: refetchList, loading: loadingList, data: listData } = useGet({url:'https://travelta.online/agent/tour/lists'});
    // const { postData:postHotelId, loadingPost:loadingHotelId , response:responseHotelId} = usePost({url:`https://travelta.online/agent/room/hotel_lists`});
    const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/tour/add",});
    const [activeTab, setActiveTab] = useState('General Details');

    //General Detalils
    const [countries, setCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [cities, setCities] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [tours, setTours] = useState([])
    const [selectedTours, setSelectedTours] = useState('')
    // const [priceType, setPriceType] = useState('fixed');
    // const [currencies, setCurrencies] = useState([])
    // const fileInputRef = useRef();
    // const [selectedRoomCurrencies, setSelectedRoomCurrencies] = useState([])
    const [tourDetails, setTourDetails] = useState({
        name: '',
        description: '',
        status: true,
        videoLink: '',
        nights: 1,
        days: 1,
        selectedTourType: '',
        featured: false,  // Boolean for yes/no
        featured_from: '', // Date input (only if featured is true)
        featured_to: '',   // Date input (only if featured is true)
        deposit: 0,
        deposit_type: 'percentage', // Can be 'percentage' or 'fixed'
        tax: 0,
        tax_type: 'percentage', // Can be 'percentage' or 'fixed'
        pick_up_country_id: '', // ID of selected country
    });
    
    const tourType = [
        { value: "private", label: "Private Tour" },
        { value: "group", label: "Group Tour" },
      ];
    // const [supplementList, setSupplementList] = useState([
    //   {
    //       supplementName: '', 
    //       supplementType: '', 
    //       supplementPrice: 0, 
    //       selectedCurrency: '',
    //   },
    // ]);


    useEffect(() => {
      refetchList();
    }, [refetchList,update]);
      
    useEffect(() => {
      if (listData && listData.tour_types && listData.countries && listData.cities) {
          console.log("List Data:", listData);
          setTours(listData.tour_types);
          setCountries(listData.countries);
          setCities(listData.cities);
      }
    }, [listData]);

    // useEffect(() => {
    //   if (selectedHotel) {  
    //     const formData = new FormData();
    //     formData.append('hotel_id', selectedHotel);              
    //     postHotelId(formData);
    //   }
    // }, [selectedHotel]);

    // useEffect(() => {
    //   if (!loadingHotelId && responseHotelId) {                
    //     setMealPlans(responseHotelId.data?.meal_plans)
    //     setTaxes(responseHotelId.data?.country_taxes)
    //   }
    // }, [responseHotelId]);

    const handleChange = (e) => {
        setTourDetails({
        ...tourDetails,
        [e.target.name]: e.target.value,
        });
    };
  
    const handleCheckboxChange = (e) => {
        setTourDetails({
        ...tourDetails,
        status: e.target.checked,
        });
    };


   
    
  const handleSubmit = async (e) => {
     
  };

  return (
    <div className="w-full p-2 md:p-6 bg-white shadow rounded">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 xl:space-x-4">
          {['General Details', 'Facilities', 'Markup & Taxes', 'Policy'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-sm font-medium text-gray-700 border-b-2 ${
                activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {activeTab === 'General Details' && (
                <div className="p-4">
                        <TextField
                          name="description"
                          label="Tour Description"
                          multiline
                          rows={4}
                          fullWidth
                          value={tourDetails.description}
                          onChange={handleChange}
                          className="mb-4"
                        />
                        <div className="flex items-center p-4 pb-0">
                            <span className="mr-2 text-mainColor font-semibold">Status : </span>
                            <Switch
                                checked={tourDetails.status}
                                onChange={handleCheckboxChange}
                                inputProps={{ 'aria-label': 'status switch' }}
                            />
                            <span className="ml-2">{tourDetails.status ? 'Enable' : 'Disable'}</span>
                        </div>
            
                        <div className="p-4 flex flex-col gap-5">
                            <h1 className='font-semibold text-2xl text-mainColor'>Main Setting</h1>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <TextField
                                name="name"
                                label="Tour Name"
                                type="text"
                                fullWidth
                                value={tourDetails.name}
                                onChange={handleChange}
                            />
                             <TextField
                                name="videoLink"
                                label="Video Link"
                                type="text"
                                fullWidth
                                value={tourDetails.videoLink}
                                onChange={handleChange}
                            />
                            <TextField
                                select
                                name="selectedTourType"
                                fullWidth
                                variant="outlined"
                                value={tourDetails.selectedTourType}
                                onChange={handleChange}
                                label="Select Tour Type"
                                className="mb-6"
                                required
                                >
                                {tourType.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <TextField
                                    name="days"
                                    label="Days"
                                    type="number"
                                    fullWidth
                                    value={tourDetails.days}
                                    onChange={handleChange}
                                    inputProps={{ min: 1 }}
                                />
                                <TextField
                                    name="nights"
                                    label="Nights"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={tourDetails.nights}
                                    onChange={handleChange}
                                    inputProps={{ min: 1 }}
                                />
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    value={selectedTours}
                                    onChange={(e) => setSelectedTours(e.target.value)} // Update the selected service                }
                                    label="Select Tour"
                                    required
                                    >
                                    {tours.map((tour) => (
                                        <MenuItem key={tour.id} value={tour.id}>
                                        {tour.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="flex items-center py-2">
                                <span className="mr-2 text-mainColor font-semibold">Featured:</span>
                                <Switch
                                    checked={tourDetails.featured}
                                    onChange={() => setTourDetails({ ...tourDetails, featured: !tourDetails.featured })}
                                    inputProps={{ 'aria-label': 'featured switch' }}
                                />
                                <span className="ml-2">{tourDetails.featured ? 'Yes' : 'No'}</span>
                            </div>

                            {/* Show date pickers only if featured is enabled */}
                            {tourDetails.featured && (
                                <div className="flex flex-col md:flex-row gap-4 mb-4">
                                    <TextField
                                        name="featured_from"
                                        label="Featured From"
                                        type="date"
                                        fullWidth
                                        value={tourDetails.featured_from}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <TextField
                                        name="featured_to"
                                        label="Featured To"
                                        type="date"
                                        fullWidth
                                        value={tourDetails.featured_to}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <TextField
                                    name="deposit"
                                    label="Deposit"
                                    type="number"
                                    fullWidth
                                    value={tourDetails.deposit}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                    variant="outlined"
                                />
                                <TextField
                                    select
                                    name="deposit_type"
                                    fullWidth
                                    variant="outlined"
                                    value={tourDetails.deposit_type}
                                    onChange={handleChange}
                                    label="Deposit Type"
                                >
                                    <MenuItem value="percentage">Percentage</MenuItem>
                                    <MenuItem value="fixed">Fixed</MenuItem>
                                </TextField>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <TextField
                                    name="tax"
                                    label="Tax"
                                    type="number"
                                    fullWidth
                                    value={tourDetails.tax}
                                    onChange={handleChange}
                                    inputProps={{ min: 0 }}
                                    variant="outlined"
                                />
                                <TextField
                                    select
                                    name="tax_type"
                                    fullWidth
                                    variant="outlined"
                                    value={tourDetails.tax_type}
                                    onChange={handleChange}
                                    label="Tax Type"
                                >
                                    <MenuItem value="percentage">Percentage</MenuItem>
                                    <MenuItem value="fixed">Fixed</MenuItem>
                                </TextField>
                            </div>

     
                        </div>
                </div>
        )}
        {activeTab === 'Facilities' && (
          <div>
            </div>
        )}
        {activeTab === 'Markup & Taxes' && (
          <div>
            </div>
        )}
        {activeTab === 'Policy' && (
        <div>
            </div>
        )}

        <div className="mt-6 text-right">
            <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
              Done 
            </Button>
          </div>
      </div>
    </div>
  );
};

export default AddTourPage;
