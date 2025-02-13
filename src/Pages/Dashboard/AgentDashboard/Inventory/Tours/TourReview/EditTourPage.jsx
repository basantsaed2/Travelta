import React, { useState ,useEffect ,useRef} from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment,ListItemText,Switch, Button,FormControlLabel,RadioGroup,Radio  } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const EditTourPage = ({ update, setUpdate }) => {
    const { tourId } = useParams();
    const { refetch: refetchTourData, loading: loadingTourData, data: tourData } = useGet({ url:`https://travelta.online/agent/tour/item/${tourId}`});
    const { refetch: refetchList, loading: loadingList, data: listData } = useGet({url:'https://travelta.online/agent/tour/lists'});
    const { postData, loadingPost, response } = usePost({ url:`https://travelta.online/agent/tour/update/${tourId}`});
    const [activeTab, setActiveTab] = useState('General Details');
    // const { refetch: refetchTour, data: dataTour } = useGet({
    //     url: "https://travelta.online/agent/tour",
    // });
    //General Detalils
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    const [tours, setTours] = useState([])
    const [selectedTours, setSelectedTours] = useState('')
    const [selectedDestinationType, setSelectedDestinationType] = useState('')
    const [quantity, setQuantity] = useState('')
    const [paymentOption, setPaymentOption] = useState('')
    const [tourArrival,setTourArrival] = useState('')

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
    const [tourDestination, setTourDestination] = useState([
      {
      destination_country: '',
      destination_city: '',
      destination_arrival_map: '',
    }]);
    const [tourItinerary , setTourItinerary] = useState([
      {
      itinerary_image: '',
      itinerary_day_name: '',
      itinerary_day_description: '',
      itinerary_content: '',
    }]);
    const [tourAvailability , setTourAvailability] = useState([
      {
        date: '',
        last_booking: '',
    }]);  
    const fileInputRef = useRef();
    const [policyDetails, setPolicyDetails] = useState({
      childrenPolicy: '',
      cancellationPolicy: 'non_refundable',
      cancellationPolicies: [
        {
          cancellationType: 'Value', // or 'Percentage'
          cancellationValue: 0,
          cancellationBeforeDays: 0,
        },
      ],
    });
    const [includes,setIncludes] = useState([
      {
        name: '',
    }]);
    const [excludes ,setExcludes] = useState([
      {
        name: '',
    }]);

    useEffect(() => {
        refetchList();
        refetchTourData();
        // refetchTour()
    }, [refetchList,refetchTourData,update]);

    // useEffect(() => {
    //     if (dataTour && dataTour.tour) {
    //         const tour = dataTour.tour.find(tour => tour.id == tourId);
    //         console.log(tour); // Check if the correct tour is found
    //     }
    // }, [dataTour, tourId]);

    useEffect(() => {
        if (tourData && tourData.tour) {
            const tour = tourData.tour;
            console.log("Tour" , tour)
            if (tour) {
                setTourDetails({
                    name: tour.name || '',
                    description: tour.description || '',
                    status: tour.status === 1, // Assuming 1 means true (active)
                    videoLink: tour.video_link || '',
                    nights: tour.nights || 1,
                    days: tour.days || 1,
                    selectedTourType: tour.tour_type || '',
                    featured: tour.featured === "yes", 
                    featured_from: tour.featured_from || '',
                    featured_to: tour.featured_to || '', 
                    deposit: tour.deposit || 0,
                    deposit_type: tour.deposit_type || 'percentage',
                    tax: tour.tax || 0,
                    tax_type: tour.tax_type || 'percentage', 
                    tour_email: tour.tour_email || '',
                    tour_phone: tour.tour_phone || '',
                    tour_website: tour.tour_website || '',
                    tour_address: tour.tour_address || '',
                });
    
                setSelectedTours(tour.tour_type_id || '');
                setSelectedDestinationType(tour.destination_type || '');
                setQuantity(tour.availability?.[0]?.quantity || '');
                setPaymentOption(tour.payments_options || '');
                setTourArrival(tour.arrival || '');
    
                setTourPickUp({
                    pick_up_country: tour.pick_up_country_id,
                    pick_up_city: tour.pick_up_city_id,
                    pick_up_map: tour.pick_up_map || '',
                });
    
                setTourDestination(tour.destinations?.map(dest => ({
                    destination_country: dest.country_id || '',
                    destination_city: dest.city_id || '',
                    destination_arrival_map: dest.arrival_map || '',
                })) || []);
    
                setTourItinerary(tour.itinerary?.map(itin => ({
                    itinerary_image: itin.image || '',
                    itinerary_day_name: itin.day_name || '',
                    itinerary_day_description: itin.day_description || '',
                    itinerary_content: itin.content || '',
                })) || []);
    
                setTourAvailability(tour.availability?.map(avail => ({
                    date: avail.date || '',
                    last_booking: avail.last_booking || '',
                })) || []);
    
                setPolicyDetails(prev => ({
                    ...prev,
                    cancellationPolicies: tour.cancelation_items?.map(cancel => ({
                        cancellationType: cancel.type || 'Value', // or 'Percentage'
                        cancellationValue: cancel.amount || 0,
                        cancellationBeforeDays: cancel.days || 0,
                    })) || [],
                }));
    
                setIncludes(tour.includes?.map(include => ({
                    name: include.name || '',
                })) || []);
    
                setExcludes(tour.excludes?.map(exclude => ({
                    name: exclude.name || '',
                })) || []);
            }
        }
    }, [tourData, tourId]);
    


    
    
    
    useEffect(() => {
    if (listData && listData.tour_types && listData.countries && listData.cities) {
        console.log("List Data:", listData);
        setTours(listData.tour_types);
        setCountries(listData.countries);
        setCities(listData.cities);
    }
    }, [listData]);
  
    
    
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

  // Handle changes for all Destination, including the default
  const handleChangeTourDestination = (e, index) => {
    const { name, value } = e.target;
    setTourDestination((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        return updatedList;
    });
  };
  // Add new Itinerary
  const addDestination = () => {
      setTourDestination((prevList) => [
          ...prevList,
          { destination_country: '', destination_city: '', destination_arrival_map:'' },
        ]);
  };
  // Remove Itinerary from the list
  const removeDestination = (index) => {
      setTourDestination((prevList) => prevList.filter((_, i) => i !== index));
  };
   // Handle changes for all Availability, including the default
   const handleChangeAvailability = (e, index) => {
    const { name, value } = e.target;
    setTourAvailability((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        return updatedList;
    });
  };
  // Add new Availability
  const addAvailability = () => {
      setTourAvailability((prevList) => [
          ...prevList,
          { date: '', last_booking: ''},
      ]);
  };
  // Remove Availability from the list
  const removeAvailability = (index) => {
      setTourAvailability((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handlePolicyChange = (e) => {
    const { name, value } = e.target;
    setPolicyDetails((prevState) => ({
      ...prevState,
      [name]: value, // Update specific field in state
    }));
  };

  const handleCancellationSwitchChange = (index) => {
    setPolicyDetails((prevState) => {
      const updatedPolicies = [...prevState.cancellationPolicies];
      updatedPolicies[index].cancellationType =
        updatedPolicies[index].cancellationType === 'Value' ? 'Percentage' : 'Value';
      return { ...prevState, cancellationPolicies: updatedPolicies };
    });
  };

  const handlePolicyFieldChange = (e, index) => {
    const { name, value } = e.target;
    setPolicyDetails((prevState) => {
      const updatedPolicies = [...prevState.cancellationPolicies];
      updatedPolicies[index][name] = value;
      return { ...prevState, cancellationPolicies: updatedPolicies };
    });
  };

  const handleRemovePolicy = (index) => {
    setPolicyDetails((prevState) => {
      const updatedPolicies = prevState.cancellationPolicies.filter((_, i) => i !== index);
      return { ...prevState, cancellationPolicies: updatedPolicies };
    });
  };

  const handleAddPolicy = () => {
    setPolicyDetails((prevState) => ({
      ...prevState,
      cancellationPolicies: [
        ...prevState.cancellationPolicies,
        { cancellationType: 'Value', cancellationValue: 0, cancellationBeforeDays: 0 },
      ],
    }));
  };
  // Handle changes for all Includes, including the default
  const handleChangeTourIncludes = (e, index) => {
    const { name, value } = e.target;
    setIncludes((prevList) => {
        const updatedList = [...prevList];
        updatedList[index] = { ...updatedList[index], [name]: value };
        return updatedList;
    });
  };
  // Add new Includes
  const addIncludes = () => {
      setIncludes((prevList) => [
          ...prevList,
          { name: ''},
        ]);
  };
  // Remove Includes from the list
  const removeIncludes = (index) => {
      setIncludes((prevList) => prevList.filter((_, i) => i !== index));
  };

    // Handle changes for all Excludes, including the default
    const handleChangeTourExcludes = (e, index) => {
      const { name, value } = e.target;
      setExcludes((prevList) => {
          const updatedList = [...prevList];
          updatedList[index] = { ...updatedList[index], [name]: value };
          return updatedList;
      });
    };
    // Add new Excludes
    const addExcludes = () => {
        setExcludes((prevList) => [
            ...prevList,
            { name: ''},
          ]);
    };
    // Remove Excludes from the list
    const removeExcludes = (index) => {
        setExcludes((prevList) => prevList.filter((_, i) => i !== index));
    };
  

      
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();


  // Basic Tour Details
    formData.append("name", tourDetails.name);
    formData.append("description", tourDetails.description);
    formData.append("video_link", tourDetails.videoLink);
    formData.append("tour_type",tourDetails.selectedTourType); // 'private' or 'group'
    formData.append('status', tourDetails.status===true? 1:0 );
    formData.append("arrival", tourArrival);
    formData.append("days", tourDetails.days);
    formData.append("nights", tourDetails.nights);
    formData.append("tour_type_id", selectedTours);
    formData.append("featured", tourDetails.featured ? "yes" : "no");
    formData.append("featured_from", tourDetails.featured_from);
    formData.append("featured_to", tourDetails.featured_to);
    formData.append("deposit", tourDetails.deposit);
    formData.append("deposit_type", tourDetails.deposit_type==='Percentage' ? 'precentage' : 'fixed'); // 'percentage' or 'fixed'
    formData.append("tax", tourDetails.tax);
    formData.append("tax_type", tourDetails.tax_type); // 'percentage' or 'fixed'

    // Pickup Information
    formData.append("pick_up_country_id", tourPickUp.pick_up_country);
    formData.append("pick_up_city_id", tourPickUp.pick_up_city);
    formData.append("pick_up_map", tourPickUp.pick_up_map);

    // Destination Type & Contact Info
    formData.append("destination_type", selectedDestinationType); // 'single' or 'multiple'
    formData.append("tour_email", tourDetails.tour_email);
    formData.append("tour_phone", tourDetails.tour_phone);
    formData.append("tour_website", tourDetails.tour_website);
    formData.append("tour_address", tourDetails.tour_address);
    formData.append("payments_options", paymentOption);

     // Append Arrays Correctly
  tourDestination.forEach((dest, index) => {
    formData.append(`destinations[${index}][country_id]`, dest.destination_country);
    formData.append(`destinations[${index}][city_id]`, dest.destination_city);
    formData.append(`destinations[${index}][arrival_map]`, dest.destination_arrival_map);
  });

  tourAvailability.forEach((avail, index) => {
    formData.append(`availability[${index}][date]`, avail.date);
    formData.append(`availability[${index}][last_booking]`, avail.last_booking);
    formData.append(`availability[${index}][quantity]`, avail.quantity || 0);
  });

  includes.forEach((inc, index) => {
    formData.append(`includes[${index}][name]`, inc.name);
  });

  excludes.forEach((exc, index) => {
    formData.append(`excludes[${index}][name]`, exc.name);
  });

  tourItinerary.forEach((itinerary, index) => {
    formData.append(`itinerary[${index}][image]`, itinerary.itinerary_image);
    formData.append(`itinerary[${index}][day_name]`, itinerary.itinerary_day_name);
    formData.append(`itinerary[${index}][day_description]`, itinerary.itinerary_day_description);
    formData.append(`itinerary[${index}][content]`, itinerary.itinerary_content);
  });

  policyDetails.cancellationPolicies.forEach((policy, index) => {
    formData.append(`cancelation_items[${index}][type]`, policy.cancellationType==='Percentage' ? 'precentage' : 'fixed');
    formData.append(`cancelation_items[${index}][amount]`, policy.cancellationValue);
    formData.append(`cancelation_items[${index}][days]`, policy.cancellationBeforeDays);
  });

    // Policy & Cancellation
    formData.append("policy", policyDetails.childrenPolicy);
    formData.append("cancelation", policyDetails.cancellationPolicy ==='non_refundable' ? 1 : 0);

    postData(formData, 'Tour Added Success');

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
                                name="videoLink"
                                label="Video Link"
                                type="text"
                                fullWidth
                                value={tourDetails.videoLink}
                                onChange={handleChangeTourDetails}
                            />
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
                                  name="paymentOption"
                                  label="Payment Option"
                                  fullWidth
                                  value={paymentOption}
                                  onChange={(e) => setPaymentOption(e.target.value)} // Update the selected service                }
                                />
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
            <div className="flex w-full gap-4 lg:w-2/4 mb-4">
              <TextField
                select
                label="Destination Type"
                name="destination_type"
                value={selectedDestinationType}
                onChange={(e) => {
                  setSelectedDestinationType(e.target.value);
                  if (e.target.value === 'single') {
                    setTourDestination([tourDestination[0]]); // Keep only one destination
                  }
                }}
                fullWidth
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="multiple">Multiple</MenuItem>
              </TextField>
              <TextField
                type="datetime-local"
                label="Arrival Date & Time"
                value={tourArrival}
                onChange={(e) => setTourArrival(e.target.value)}
                placeholder="Enter Arrival Date & Time"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                className="w-full"
              />
            </div>
            {tourDestination.map((destination, index) => (
              <div key={index} className="bg-white rounded-lg mb-4">
                <div className="w-full flex flex-col md:flex-row gap-4">
                  <TextField
                    select
                    name="destination_country"
                    fullWidth
                    variant="outlined"
                    value={destination.destination_country}
                    onChange={(e) => handleChangeTourDestination(e, index)}
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
                    value={destination.destination_city}
                    onChange={(e) => handleChangeTourDestination(e, index)}
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
                    value={destination.destination_arrival_map}
                    onChange={(e) => handleChangeTourDestination(e, index)}
                  />
                </div>
                {selectedDestinationType === 'multiple' && index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeDestination(index)}
                    className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {selectedDestinationType === 'multiple' && (
              <div className='w-full flex justify-center'>
              <button
                type="button"
                onClick={addDestination}
                className="add-supplement-btn bg-[#0D47A1] text-white px-4 py-2 rounded-md mt-4"
              >
                Add More Destination
              </button>
              </div>
            )}

             <h1 className='font-semibold text-2xl text-mainColor'>Availability</h1>
             <div className="flex w-full md:w-2/4 xl:w-1/4 mb-4">
              <TextField
                type='number'
                label="Quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
              />
            </div>
            {tourAvailability.map((availability, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm mb-4">
                <div className="w-full flex flex-col md:flex-row gap-4">
                  <TextField
                    name="date"
                    type="date"
                    label="Select Date"
                    value={availability.date}
                    onChange={(e) => handleChangeAvailability(e, index)}
                    placeholder="Enter Date"
                    className="w-full"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    name="last_booking"
                    label="Last Booking"
                    type="date"
                    fullWidth
                    required
                    value={availability.last_booking}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleChangeAvailability(e, index)}
                  />
                    <button
                type="button"
                onClick={addAvailability}
                className="add-supplement-btn w-1/2 bg-[#0D47A1] text-white px-2 py-1 rounded-md"
              >
                Add Availability
              </button>
                </div>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeAvailability(index)}
                    className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
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
          <div className="p-4 xl:p-8 bg-gray-50 rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Policy Settings</h2>
          
            {/* Children Policy */}
            <div className="space-y-4 mb-6">
              <TextField
                label="Policy"
                name="childrenPolicy"
                value={policyDetails.childrenPolicy}
                onChange={handlePolicyChange}
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            </div>
            
              {/* Cancellation Policy Radio Group */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Cancellation Policy</h3>
                <RadioGroup
                  name="cancellationPolicy"
                  value={policyDetails.cancellationPolicy}
                  onChange={(e) =>
                    setPolicyDetails((prevState) => ({
                      ...prevState,
                      cancellationPolicy: e.target.value,
                    }))
                  }
                  row
                >
                  <FormControlLabel value="non_refundable" control={<Radio />} label="Non Refundable" />
                  <FormControlLabel value="free" control={<Radio />} label="Free Cancellation" />
                </RadioGroup>
              </div>
          
          {/* Conditional Rendering for Free Cancellation */}
          {policyDetails.cancellationPolicy === "free" && (
            <div>
              {policyDetails.cancellationPolicies.map((policy, index) => (
                <div key={index} className="w-full flex flex-col md:flex-row gap-3 mb-4">
                  <div className="flex items-center w-full md:w-1/2">
                    <span className="text-mainColor font-semibold">Cancellation Type: </span>
                    <MdAttachMoney
                      className={`ml-2 ${policy.cancellationType === "Value" ? "text-green-500" : "text-gray-500"}`}
                    />
                    <Switch
                      checked={policy.cancellationType === "Percentage"}
                      onChange={() => handleCancellationSwitchChange(index)}
                      color="primary"
                    />
                    <FiPercent
                      className={`ml-2 ${policy.cancellationType === "Percentage" ? "text-blue-500" : "text-gray-500"}`}
                    />
                  </div>
          
                  {/* Conditional Fields for Percentage or Value */}
                  {policy.cancellationType === "Percentage" ? (
                    <div className="w-full md:w-1/2">
                      <TextField
                        label="Cancellation Percentage"
                        name="cancellationValue"
                        value={policy.cancellationValue}
                        onChange={(e) => handlePolicyFieldChange(e, index)}
                        select
                        fullWidth
                        variant="outlined"
                      >
                        {[...Array(101).keys()].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}%
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  ) : (
                    <div className="w-full md:w-1/2">
                      <TextField
                        label="Cancellation Value"
                        name="cancellationValue"
                        value={policy.cancellationValue}
                        onChange={(e) => handlePolicyFieldChange(e, index)}
                        type="number"
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                  )}
          
                  {/* Before Days to Cancellation */}
                  <div className="w-full md:w-1/2">
                    <TextField
                      label="Before Days to Cancellation"
                      name="cancellationBeforeDays"
                      value={policy.cancellationBeforeDays}
                      onChange={(e) => handlePolicyFieldChange(e, index)}
                      type="number"
                      fullWidth
                      variant="outlined"
                    />
                  </div>
          
                  {/* Remove Button */}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePolicy(index)}
                      className="remove-supplement-btn flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                    >
                      <AiOutlineMinus className="mr-2" size={16} />
                      Remove
                    </button>
                  )}
                </div>
              ))}
          
              {/* Add Button */}
              <div className="flex mt-4">
                <button
                  type="button"
                  onClick={handleAddPolicy}
                  className="add-supplement-btn flex items-center justify-center bg-[#0D47A1] text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out mt-4"
                >
                  <AiOutlinePlus className="mr-2" size={16} />
                  Add More
                </button>
              </div>
            </div>
          )}

          <h1 className='font-bold text-2xl text-mainColor mb-4 border-b-2 border-gray-300 pb-2 mt-5'>Tour Includes</h1>
          <div className="space-y-4">
            {includes.map((include, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow p-4 flex items-center justify-between">
                <TextField
                  name="name"
                  type="text"
                  label="Include"
                  value={include.name}
                  onChange={(e) => handleChangeTourIncludes(e, index)}
                  placeholder="Enter Name"
                  className="flex-1"
                  variant="outlined"
                  size="small"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeIncludes(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600 transition"
                  >
                    - Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIncludes}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              + Add Include
            </button>
          </div>

          <h1 className='font-bold text-2xl text-mainColor mb-4 border-b-2 border-gray-300 pb-2 mt-8'>Tour Excludes</h1>
          <div className="space-y-4">
            {excludes.map((exclude, index) => (
              <div key={index} className="bg-gray-100 rounded-lg shadow p-4 flex items-center justify-between">
                <TextField
                  name="name"
                  type="text"
                  label="Exclude"
                  value={exclude.name}
                  onChange={(e) => handleChangeTourExcludes(e, index)}
                  placeholder="Enter Name"
                  className="flex-1"
                  variant="outlined"
                  size="small"
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeExcludes(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600 transition"
                  >
                    - Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addExcludes}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              + Add Exclude
            </button>
          </div>

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

export default EditTourPage;
