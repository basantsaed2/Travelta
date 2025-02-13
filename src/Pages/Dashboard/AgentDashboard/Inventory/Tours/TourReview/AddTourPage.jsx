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
        featured: false, 
        featured_from: '',
        featured_to: '', 
        deposit: 0,
        deposit_type: 'percentage',
        tax: 0,
        tax_type: 'percentage', 
        tour_email:'',
        tour_phone:'',
        tour_website:'',
        tour_address:'',
    });
    const tourType = [
        { value: "private", label: "Private Tour" },
        { value: "group", label: "Group Tour" },
      ];

    const [tourPickUp, setTourPickUp] = useState({
      pick_up_country: '',
      pick_up_city: '',
      pick_up_map: '',
    });
    const [tourDestination, setTourDestination] = useState({
      destination_type: '',
      destination_country: '',
      destination_city: '',
      destination_arrival_map: '',
    });
    const [tourItinerary , setTourItinerary] = useState([
      {
      itinerary_image: '',
      itinerary_day_name: '',
      itinerary_day_description: '',
      itinerary_content: '',
    }]);
    
    const fileInputRef = useRef();
    
    
    const handleImageUpload = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        setTourItinerary((prevList) => {
          const updatedList = [...prevList];
          updatedList[index] = { ...updatedList[index], itinerary_image: file };
          return updatedList;
        });
      }
    };    
    const handleRemoveImage = (index) => {
      setTourItinerary((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], itinerary_image: null };
        return updatedList;
      });
    
      // Clear the file input field
      fileInputRef.current.value = '';
    };
    


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

    
    const handleChangeTourDetails = (e) => {
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

    const handleChangeTourPickUp = (e) => {
      setTourPickUp({
      ...tourPickUp,
      [e.target.name]: e.target.value,
      });
  };
  const handleChangeTourDestination = (e) => {
    setTourDestination({
    ...tourDestination,
    [e.target.name]: e.target.value,
    });
};

  // Handle changes for all Itinerary, including the default
  const handleItineraryChange = (e, index) => {
      const { name, value } = e.target;
      setTourItinerary((prevList) => {
          const updatedList = [...prevList];
          updatedList[index] = { ...updatedList[index], [name]: value };
          return updatedList;
      });
  };
  // Add new Itinerary
  const addItinerary = () => {
      setTourItinerary((prevList) => [
          ...prevList,
          { itinerary_image: '', itinerary_day_name: '', itinerary_day_description:'', itinerary_content: '' },
      ]);
  };
  // Remove Itinerary from the list
  const removeItinerary = (index) => {
      setTourItinerary((prevList) => prevList.filter((_, i) => i !== index));
  };
   
    
  const handleSubmit = async (e) => {
     
  };

  return (
    <div className="w-full p-2 md:p-6 bg-white shadow rounded">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 xl:space-x-4">
          {['General Details', 'Pickup & Destination','Itinerary','Policy'].map((tab) => (
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
                          onChange={handleChangeTourDetails}
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
                                onChange={handleChangeTourDetails}
                            />
                             <TextField
                                name="videoLink"
                                label="Video Link"
                                type="text"
                                fullWidth
                                value={tourDetails.videoLink}
                                onChange={handleChangeTourDetails}
                            />
                            <TextField
                                select
                                name="selectedTourType"
                                fullWidth
                                variant="outlined"
                                value={tourDetails.selectedTourType}
                                onChange={handleChangeTourDetails}
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
                                    onChange={handleChangeTourDetails}
                                    inputProps={{ min: 1 }}
                                />
                                <TextField
                                    name="nights"
                                    label="Nights"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    value={tourDetails.nights}
                                    onChange={handleChangeTourDetails}
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
                            <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                              <div className='flex justify-col items-center'>
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
                                <>
                                      <TextField
                                          name="featured_from"
                                          label="Featured From"
                                          type="date"
                                          fullWidth
                                          value={tourDetails.featured_from}
                                          onChange={handleChangeTourDetails}
                                          InputLabelProps={{ shrink: true }}
                                      />
                                      <TextField
                                          name="featured_to"
                                          label="Featured To"
                                          type="date"
                                          fullWidth
                                          value={tourDetails.featured_to}
                                          onChange={handleChangeTourDetails}
                                          InputLabelProps={{ shrink: true }}
                                      />
                                </>
                              )}
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <TextField
                                    name="deposit"
                                    label="Deposit"
                                    type="number"
                                    fullWidth
                                    value={tourDetails.deposit}
                                    onChange={handleChangeTourDetails}
                                    inputProps={{ min: 0 }}
                                    variant="outlined"
                                />
                                <TextField
                                    select
                                    name="deposit_type"
                                    fullWidth
                                    variant="outlined"
                                    value={tourDetails.deposit_type}
                                    onChange={handleChangeTourDetails}
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
                                    onChange={handleChangeTourDetails}
                                    inputProps={{ min: 0 }}
                                    variant="outlined"
                                />
                                <TextField
                                    select
                                    name="tax_type"
                                    fullWidth
                                    variant="outlined"
                                    value={tourDetails.tax_type}
                                    onChange={handleChangeTourDetails}
                                    label="Tax Type"
                                >
                                    <MenuItem value="percentage">Percentage</MenuItem>
                                    <MenuItem value="fixed">Fixed</MenuItem>
                                </TextField>
                            </div> 

                            <h1 className='font-semibold text-2xl text-mainColor'>Contact Information</h1>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <TextField
                                name="tour_email"
                                label="Tour Operator's Email"
                                type="text"
                                fullWidth
                                value={tourDetails.tour_email}
                                onChange={handleChangeTourDetails}
                            />
                            <TextField
                                name="tour_phone"
                                label="Tour Operator's Phone"
                                type="text"
                                fullWidth
                                value={tourDetails.tour_phone}
                                onChange={handleChangeTourDetails}
                            />
                            </div>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <TextField
                                name="tour_website"
                                label="Tour Operator's Website"
                                type="text"
                                fullWidth
                                value={tourDetails.tour_website}
                                onChange={handleChangeTourDetails}
                            />
                            <TextField
                                name="tour_address"
                                label="Tour Operator's Address"
                                type="text"
                                fullWidth
                                value={tourDetails.tour_address}
                                onChange={handleChangeTourDetails}
                            />
                            </div>
                        </div>
                </div>
        )}
        {activeTab === 'Pickup & Destination' && (
            <div className="p-4 flex flex-col gap-5">
          <h1 className='font-semibold text-2xl text-mainColor'>Pick_UP Location</h1>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
          <TextField
              select
              name="pick_up_country"
              fullWidth
              variant="outlined"
              value={tourPickUp.pick_up_country}
              onChange={handleChangeTourPickUp}
              label="Select PickUp Country"
              className="mb-6"
              required
              >
              {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                  {country.name}
                  </MenuItem>
              ))}
          </TextField>
          <TextField
              select
              name="pick_up_city"
              fullWidth
              variant="outlined"
              value={tourPickUp.pick_up_city}
              onChange={handleChangeTourPickUp}
              label="Select PickUp City"
              className="mb-6"
              required
              >
              {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                  {city.name}
                  </MenuItem>
              ))}
          </TextField>
          <TextField
              name="pick_up_map"
              label="Pick_up Map"
              type="text"
              fullWidth
              required
              value={tourPickUp.pick_up_map}
              onChange={handleChangeTourPickUp}
          /> 
          </div>
          <h1 className='font-semibold text-2xl text-mainColor'>Destination Location</h1>

          <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-4 mb-4">
            <TextField
                select
                label="Destination Type"
                name="destination_type"
                value={tourDestination.destination_type}
                onChange={handleChangeTourDestination}
                fullWidth
            >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="multiple">Multiple</MenuItem>
            </TextField>
            <TextField
                select
                name="destination_country"
                fullWidth
                variant="outlined"
                value={tourDestination.destination_country}
                onChange={handleChangeTourDestination}
                label="Select Destination Country"
                className="mb-6"
                required
                >
                {countries.map((country) => (
                    <MenuItem key={country.id} value={country.id}>
                    {country.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                name="destination_city"
                fullWidth
                variant="outlined"
                value={tourDestination.destination_city}
                onChange={handleChangeTourDestination}
                label="Select Destination City"
                className="mb-6"
                required
                >
                {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                    {city.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                name="destination_arrival_map"
                label="Destination Map"
                type="text"
                fullWidth
                required
                value={tourDestination.destination_arrival_map}
                onChange={handleChangeTourDestination}
            /> 
          </div>

            </div>

            
        )}
        {activeTab === 'Itinerary' && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                     <h1 className="font-semibold text-2xl text-[#0D47A1] mb-6">Itinerary</h1>
         
                     {tourItinerary.map((itinerary, index) => (
                         <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                             <div className="flex flex-col md:flex-row gap-4">
                                  <div className="mb-4">
                                    <Button variant="contained" component="label">
                                      Upload Image
                                      <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, index)} // Pass index here
                                        ref={fileInputRef} // Reference to the input field
                                      />
                                    </Button>
                                    {itinerary.itinerary_image && (
                                      <div className="flex flex-col xl:flex-row gap-5 items-center mt-4">
                                        {/* <img src={roomDetails.thumbnail} alt="Room Preview" className="h-80 w-96 object-cover mr-4" /> */}
                                        {/* <img
                                          src={URL.createObjectURL(itinerary.itinerary_image)}
                                          alt="Tour Preview"
                                          className="h-80 w-96 object-cover mr-4"
                                        /> */}
                                         <img
    src={typeof itinerary.itinerary_image === 'string' ? itinerary.itinerary_image : URL.createObjectURL(itinerary.itinerary_image)}
    alt="Tour Preview"
    className="h-80 w-96 object-cover mr-4"
  />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)} // Pass index
                                            className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Remove Image
                                        </button>
                                      </div>
                                    )}
                                  </div>
                             </div>
                             <div className="flex flex-col md:flex-row gap-4 mt-4">
                                 <TextField
                                     label="Day Name"
                                     name="itinerary_day_name"
                                     type="text"
                                     required
                                     value={itinerary.itinerary_day_name}
                                     onChange={(e) => handleItineraryChange(e, index)}
                                     fullWidth
                                 />
                                <TextField
                                     label="Day Description"
                                     name="itinerary_day_description"
                                     type="text"
                                     required
                                     value={itinerary.itinerary_day_description}
                                     onChange={(e) => handleItineraryChange(e, index)}
                                     fullWidth
                                 />
                                <TextField
                                     label="Day Content"
                                     name="itinerary_content"
                                     type="text"
                                     required
                                     value={itinerary.itinerary_content}
                                     onChange={(e) => handleItineraryChange(e, index)}
                                     fullWidth
                                 />
                             </div>
         
                             {/* Only show the remove button for supplements other than the first one */}
                             {index !== 0 && (
                                 <button
                                     type="button"
                                     onClick={() => removeItinerary(index)}
                                     className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                                 >
                                     Remove
                                 </button>
                             )}
                         </div>
                     ))}
         
                     <button
                         type="button"
                         onClick={addItinerary}
                         className="add-supplement-btn bg-[#0D47A1] text-white px-4 py-2 rounded-md mt-4"
                     >
                         Add Itinerary
                     </button>
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
