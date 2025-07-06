import React, { useState, useEffect, useRef } from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment, Switch, Button, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import StaticLoader from "../../../../../../Components/StaticLoader";
import { useNavigate } from 'react-router-dom';

const EditRoomPage = ({ update, setUpdate }) => {
  const { roomId } = useParams();
  const { refetch: refetchRoomData, loading: loadingRoomData, data: roomData } = useGet({ url: `https://travelta.online/agent/room/item/${roomId}` });
  const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/room/update/${roomId}` });

  const { refetch: refetchList, loading: loadingList, data: listData } = useGet({ url: 'https://travelta.online/agent/room/lists' });
  const { postData: postHotelId, loadingPost: loadingHotelId, response: responseHotelId } = usePost({ url: `https://travelta.online/agent/room/hotel_lists` });
  // const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/room/add",});
  const [activeTab, setActiveTab] = useState('General Details');
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([])

  //General Detalils
  const [roomTypes, setRoomTypes] = useState([])
  const [selectedRoomType, setSelectedRoomType] = useState('')
  const [hotels, setHotels] = useState([])
  const [selectedHotel, setSelectedHotel] = useState('')
  const [mealPlans, setMealPlans] = useState([])
  const [selectedMealPlan, setSelectedMealPlan] = useState('')
  const [priceType, setPriceType] = useState('fixed');
  const [currencies, setCurrencies] = useState([])
  const fileInputRef = useRef();
  // const [selectedRoomCurrencies, setSelectedRoomCurrencies] = useState([])
  const [roomDetails, setRoomDetails] = useState({
    description: '',
    status: true,
    price: '',
    quantity: 1,
    maxAdults: 1,
    maxChildren: 0,
    maxCapacity: 1,
    minStay: 1,
    selectedRoomCurrencies: '',
    thumbnail: null,
  });
  const [supplementList, setSupplementList] = useState([
    {
      supplementName: '',
      supplementType: '',
      supplementPrice: 0,
      selectedCurrency: '',
    },
  ]);

  //Amenities
  const [amenities, setAmenities] = useState([]);

  //Markup & Taxes
  const [markupDetails, setMarkupDetails] = useState({
    b2bMarkup: 0,
    b2cMarkup: 0,
    b2eMarkup: 0,
  });
  const [agencyCodesList, setAgencyCodesList] = useState([
    { agencyCode: '', agencyCodeNumber: 0 },
  ]);
  const [taxes, setTaxes] = useState([])
  const [selectedTax, setSelectedTaxe] = useState([]);
  const [selectedTaxType, setSelectedTaxeType] = useState('')
  const [selectedExceptTax, setSelectedExceptTaxe] = useState([]);

  const [policyDetails, setPolicyDetails] = useState({
    checkInTime: '',
    checkOutTime: '',
    termsAndConditions: '',
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

  useEffect(() => {
    refetchList();
    refetchRoomData();
  }, [refetchList, update]);

  useEffect(() => {
    if (listData && listData.room_types && listData.hotels && listData.currencies) {
      console.log("List Data:", listData);
      setRoomTypes(listData.room_types);
      setHotels(listData.hotels);
      setCurrencies(listData.currencies);
      //   setAmenities(listData.room_amenities)
      // Initialize amenities with unchecked status by default
      const amenitiesWithUnchecked = listData.room_amenities.map((amenity) => ({
        ...amenity,
        selected: 'no', // Mark all amenities as unchecked initially
      }));

      setAmenities(amenitiesWithUnchecked);
    }
  }, [listData]);

  useEffect(() => {
    if (selectedHotel) {
      const formData = new FormData();
      formData.append('hotel_id', selectedHotel);
      postHotelId(formData);
    }
  }, [selectedHotel]);

  useEffect(() => {
    if (!loadingHotelId && responseHotelId) {
      setMealPlans(responseHotelId.data?.meal_plans)
      setTaxes(responseHotelId.data?.country_taxes)
    }
  }, [responseHotelId]);

  useEffect(() => {
    if (roomData && roomData.room) {
      console.log("All Room Data:", roomData);
      setRooms(roomData.room);
    }
  }, [roomData]); // Only run this effect when `data` changes

  useEffect(() => {
    if (!loadingPost && response) {
      navigate(-1);
    }
  }, [loadingPost, response]);

  useEffect(() => {
    if (roomData && roomData.room) {
      const room = roomData.room;

      setRoomDetails((prevDetails) => ({
        ...prevDetails,
        description: room.description || prevDetails.description,
        status: room.status === 1 ? true : false,
        price: room.price || prevDetails.price,
        quantity: room.quantity || prevDetails.quantity,
        maxAdults: room.max_adults || prevDetails.max_adults,
        maxChildren: room.max_children || prevDetails.max_children,
        maxCapacity: room.max_capacity || prevDetails.max_capacity,
        minStay: room.min_stay || prevDetails.min_stay,
        selectedRoomCurrencies: room.currency_id || prevDetails.currency_id,

        // thumbnail: room.thumbnail_link || prevDetails.thumbnail_link

      }));
      setSelectedRoomType(room.room_type_id);
      setPriceType(room.price_type)
      setSelectedHotel(room.hotel_id);
      setSelectedMealPlan(room.hotel_meal_id);

      const updatedSupplementList = room.supplement.map((supplement) => ({
        supplementName: supplement.name || '',
        supplementType: supplement.type || '',
        supplementPrice: supplement.price || 0,
        selectedCurrency: supplement.currency_id || '',
      }));
      setSupplementList(updatedSupplementList);

      // Update amenities based on room data:
      setAmenities((prevAmenities) =>
        prevAmenities.map((amenity) => {
          // Check if the amenity exists in room.amenity
          const roomAmenity = room.amenity.find(
            (roomAmenity) => roomAmenity.id === amenity.id
          );

          // If it exists and selected is 'yes', mark it as checked, else unchecked
          return {
            ...amenity,
            selected: roomAmenity && roomAmenity.selected === 'yes' ? 'yes' : 'no',
          };
        })
      );

      setMarkupDetails((prevDetails) => ({
        ...prevDetails,
        b2bMarkup: room.b2b_markup || prevDetails.b2b_markup,
        b2cMarkup: room.b2c_markup || prevDetails.b2c_markup,
        b2eMarkup: room.b2e_markup || prevDetails.b2e_markup,
      }));

      const updatedAgency = room.agencies.map((agency) => ({
        agencyCode: agency.agency_code || '',
        agencyCodeNumber: agency.percentage || '',
      }));
      setAgencyCodesList(updatedAgency);

      const selectedTaxeIds = room.taxes.map(tax => tax.id)
      setSelectedTaxe(selectedTaxeIds)
      setSelectedTaxeType(room.tax_type)
      if (room.tax_type === 'include_except') {
        const selectedExceptTaxeIds = room.except_taxes.map(tax => tax.id)
        setSelectedExceptTaxe(selectedExceptTaxeIds)
      }

      setPolicyDetails((prevDetails) => ({
        ...prevDetails,
        checkInTime: room.check_in ? convertTo24HourFormat(room.check_in) : prevDetails.checkInTime,
        checkOutTime: room.check_out ? convertTo24HourFormat(room.check_out) : prevDetails.checkOutTime,
        termsAndConditions: room.policy || prevDetails.termsAndConditions,
        childrenPolicy: room.children_policy || prevDetails.childrenPolicy,
        cancellationPolicy: room.cancelation === 'non_refunable' ? 'non_refundable' : 'free',
        cancellationPolicies: room.free_cancelation.map((policy) => ({
          cancellationType: policy.type === 'precentage' ? 'Percentage' : 'Value',
          cancellationValue: policy.amount || 0,
          cancellationBeforeDays: policy.before || 0,
        })),
      }));


    }
    console.log('roomData', roomData)
  }, [roomData]);

  const convertTo24HourFormat = (time) => {
    if (!time) return '';

    const [hour, minute, period] = time.match(/(\d{1,2}):(\d{2})(AM|PM)/i).slice(1);
    let hours = parseInt(hour, 10);
    const minutes = minute;

    if (period.toUpperCase() === 'PM' && hours < 12) {
      hours += 12;
    } else if (period.toUpperCase() === 'AM' && hours === 12) {
      hours = 0; // Midnight case
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };


  const handleChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setRoomDetails({
      ...roomDetails,
      status: e.target.checked,
    });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setRoomDetails((prevState) => ({
  //         ...prevState,
  //         thumbnail: reader.result,
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoomDetails((prevState) => ({
        ...prevState,
        thumbnail: file,  // Store the actual file, not base64
      }));
    }
  };


  const handleRemoveImage = () => {
    setRoomDetails((prevState) => ({
      ...prevState,
      thumbnail: null,
    }));
    // Clear the file input field
    fileInputRef.current.value = '';
  };
  // Handle changes for all supplements, including the default
  const handleSupplementChange = (e, index) => {
    const { name, value } = e.target;

    setSupplementList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], [name]: value };
      return updatedList;
    });
  };

  // Add new supplement
  const addSupplement = () => {
    setSupplementList((prevList) => [
      ...prevList,
      { supplementName: '', supplementType: '', supplementPrice: 0, selectedCurrency: '' },
    ]);
  };

  // Remove supplement from the list
  const removeSupplement = (index) => {
    setSupplementList((prevList) => prevList.filter((_, i) => i !== index));
  };

  //Amenity
  const handleAmenityCheckboxChange = (id) => {
    setAmenities((prevAmenities) =>
      prevAmenities.map((amenity) =>
        amenity.id === id
          ? { ...amenity, selected: amenity.selected === 'yes' ? 'no' : 'yes' }
          : amenity
      )
    );
  };

  const checkAll = () => {
    setAmenities((prevAmenities) =>
      prevAmenities.map((amenity) => ({ ...amenity, selected: 'yes' }))
    );
  };

  const uncheckAll = () => {
    setAmenities((prevAmenities) =>
      prevAmenities.map((amenity) => ({ ...amenity, selected: 'no' }))
    );
  };

  // Handle changes for dynamic agency code fields
  const handleAgencyCodesListChange = (e, index, field) => {
    const updatedList = [...agencyCodesList];
    updatedList[index][field] = e.target.value;
    setAgencyCodesList(updatedList);
  };

  // Add new agency code
  const addAgencyCode = () => {
    setAgencyCodesList([
      ...agencyCodesList,
      { agencyCode: '', agencyCodeNumber: 0 },
    ]);
  };

  // Remove agency code from the list, except the first one
  const removeAgencyCode = (index) => {
    if (index !== 0) {
      const updatedList = agencyCodesList.filter((_, i) => i !== index);
      setAgencyCodesList(updatedList);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplements = supplementList.map((supplement, index) => ({
      name: supplement.supplementName,
      type: supplement.supplementType,
      price: supplement.supplementPrice,
      currency_id: supplement.selectedCurrency
    }));
    const agencies = agencyCodesList.map((agency) => ({
      agency_code: agency.agencyCode,
      percentage: agency.agencyCodeNumber
    }));
    const freeCancellation = policyDetails.cancellationPolicies.map((policy) => ({
      amount: policy.cancellationValue,
      type: policy.cancellationType === 'Percentage' ? 'precentage' : 'value',
      before: policy.cancellationBeforeDays,
    }));
    const formatTime = (time) => format(new Date(`1970-01-01T${time}:00`), 'hh:mma');

    const formattedCheckInTime = formatTime(policyDetails.checkInTime, 'hh:mma');
    const formattedCheckOutTime = formatTime(policyDetails.checkOutTime, 'hh:mma');

    const formData = new FormData();

    //General Detalils
    formData.append('description', roomDetails.description);
    formData.append('status', roomDetails.status === true ? 1 : 0);
    formData.append('price_type', priceType);
    if (priceType === "fixed") {
      formData.append('price', roomDetails.price);
      formData.append('currency_id', roomDetails.selectedRoomCurrencies);
    }
    formData.append('room_type_id', selectedRoomType);
    formData.append('hotel_id', selectedHotel);
    formData.append('hotel_meal_id', selectedMealPlan);
    formData.append('quantity', roomDetails.quantity);
    formData.append('min_stay', roomDetails.minStay);
    formData.append('max_capacity', roomDetails.maxCapacity);
    formData.append('max_adults', roomDetails.maxAdults);
    formData.append('max_children', roomDetails.maxChildren);
    formData.append('thumbnail', roomDetails.thumbnail);
    formData.append('supplements', JSON.stringify(supplements));

    //Amenities
    // Get the ids of the amenities that are selected ('yes')
    const selectedAmenityIds = amenities
      .filter(amenity => amenity.selected === 'yes')
      .map(amenity => amenity.id); // Extract the id of selected amenities
    formData.append('amenities', JSON.stringify(selectedAmenityIds));

    //Markup & Taxes
    formData.append('b2c_markup', markupDetails.b2cMarkup);
    formData.append('b2e_markup', markupDetails.b2eMarkup);
    formData.append('b2b_markup', markupDetails.b2bMarkup);
    formData.append('agencies', JSON.stringify(agencies));
    formData.append('taxes', selectedTax ? selectedTax : null);
    formData.append('tax_type', selectedTaxType);
    if (selectedTaxType === "include_except") {
      formData.append('except_taxes', JSON.stringify(selectedExceptTax));
    }
    //Policy Settings    
    formData.append('check_in', formattedCheckInTime);
    formData.append('check_out', formattedCheckOutTime);
    formData.append('policy', policyDetails.termsAndConditions);
    formData.append('children_policy', policyDetails.childrenPolicy);
    formData.append('cancelation', policyDetails.cancellationPolicy === 'non_refundable' ? 'non_refunable' : 'free');
    if (policyDetails.cancellationPolicy === 'free') {
      formData.append('free_cancelation', JSON.stringify(freeCancellation));
    }

    postData(formData, 'Room Updated Success');
  };

  return (
    <div className="w-full pb-10">
      {loadingRoomData ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full p-2 md:p-6 bg-white shadow rounded">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-2 xl:space-x-4">
              {['General Details', 'Facilities', 'Markup & Taxes', 'Policy'].map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-4 text-sm font-medium text-gray-700 border-b-2 ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'
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

                {/* Image Upload Section */}
                <div className="mb-4">
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef} // Reference to the input field
                    />
                  </Button>
                  {(roomDetails.thumbnail || roomData?.room?.thumbnail_link) && (
                    <div className="flex flex-col xl:flex-row gap-5 items-center mt-4">
                      {/* <img src={roomDetails.thumbnail} alt="Room Preview" className="h-80 w-96 object-cover mr-4" /> */}
                      <img
                        // src={URL.createObjectURL(roomDetails.thumbnail)}
                        src={
                          roomDetails.thumbnail
                            ? URL.createObjectURL(roomDetails.thumbnail) // Display uploaded image
                            : roomData.room?.thumbnail_link // Display image from data
                        }
                        alt="Room Preview"
                        className="h-80 w-96 object-cover mr-4"
                      />
                      {/* <Button variant="outlined" onClick={handleRemoveImage}>
                    Remove Image
                  </Button> */}
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md"
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                <TextField
                  name="description"
                  label="Room Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={roomDetails.description}
                  onChange={handleChange}
                  className="mb-4"
                />
                <div className="flex items-center p-4 pb-0">
                  <span className="mr-2 text-mainColor font-semibold">Status : </span>
                  <Switch
                    checked={roomDetails.status}
                    onChange={handleCheckboxChange}
                    inputProps={{ 'aria-label': 'status switch' }}
                  />
                  <span className="ml-2">{roomDetails.status ? 'Enable' : 'Disable'}</span>
                </div>

                <div className="p-4 flex flex-col gap-5">
                  <h1 className='font-semibold text-2xl text-mainColor'>Main Setting</h1>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <TextField
                      select
                      label="Price Type"
                      name="priceType"
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value)}
                      fullWidth
                      required
                      className="mb-4"
                    >
                      <MenuItem value="fixed">Fixed</MenuItem>
                      <MenuItem value="variable">Variable</MenuItem>
                    </TextField>
                    {priceType === 'fixed' && (
                      <>
                        <TextField
                          name="price"
                          label="Price"
                          type="number"
                          fullWidth
                          required
                          value={roomDetails.price}
                          onChange={handleChange}
                          className="mb-4"
                          inputProps={{
                            min: "0",
                          }}
                        />
                        <TextField
                          select
                          label="Select Currency"
                          name="selectedRoomCurrencies"
                          value={roomDetails.selectedRoomCurrencies}
                          onChange={handleChange}
                          fullWidth
                        >
                          {currencies.map((currency) => (
                            <MenuItem key={currency.id} value={currency.id}>
                              {currency.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      value={selectedRoomType}
                      onChange={(e) => setSelectedRoomType(e.target.value)} // Update the selected service                }
                      label="Select Room Type"
                      className="mb-6"
                      required
                    >
                      {roomTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      value={selectedHotel}
                      onChange={(e) => setSelectedHotel(e.target.value)} // Update the selected service                }
                      label="Select Hotel"
                      className="mb-6"
                      required
                    >
                      {hotels.map((hotel) => (
                        <MenuItem key={hotel.id} value={hotel.id}>
                          {hotel.hotel_name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    {
                      selectedHotel && (
                        <TextField
                          select
                          fullWidth
                          variant="outlined"
                          value={selectedMealPlan}
                          onChange={(e) => setSelectedMealPlan(e.target.value)} // Update the selected service                }
                          label="Select Meal Plan"
                          className="mb-6"
                        >
                          {mealPlans.map((meal) => (
                            <MenuItem key={meal.id} value={meal.id}>
                              {meal.meal_name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )
                    }
                    <TextField
                      name="quantity"
                      label="Quantity"
                      type="number"
                      fullWidth
                      value={roomDetails.quantity}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                    />
                    <TextField
                      name="minStay"
                      label="Min Stay"
                      type="number"
                      fullWidth
                      value={roomDetails.minStay}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <TextField
                      name="maxCapacity"
                      label="Max Capacity"
                      type="number"
                      fullWidth
                      value={roomDetails.maxCapacity}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                    />
                    <TextField
                      name="maxAdults"
                      label="Max Adults"
                      type="number"
                      fullWidth
                      value={roomDetails.maxAdults}
                      onChange={handleChange}
                      inputProps={{ min: 1 }}
                    />
                    <TextField
                      name="maxChildren"
                      label="Max Children"
                      type="number"
                      fullWidth
                      value={roomDetails.maxChildren}
                      onChange={handleChange}
                      inputProps={{ min: 0 }}
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                  <h1 className="font-semibold text-2xl text-[#0D47A1] mb-6">Supplement</h1>

                  {supplementList.map((supplement, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <TextField
                          label="Supplement Name"
                          name="supplementName"
                          value={supplement.supplementName}
                          onChange={(e) => handleSupplementChange(e, index)}
                          fullWidth
                        />
                        <TextField
                          select
                          label="Supplement Type"
                          name="supplementType"
                          value={supplement.supplementType}
                          onChange={(e) => handleSupplementChange(e, index)}
                          fullWidth
                        >
                          <MenuItem value="night">For Night</MenuItem>
                          <MenuItem value="stay">For Stay</MenuItem>
                          <MenuItem value="person">For Person</MenuItem>
                        </TextField>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <TextField
                          label="Supplement Price"
                          name="supplementPrice"
                          type="number"
                          required
                          value={supplement.supplementPrice}
                          onChange={(e) => handleSupplementChange(e, index)}
                          fullWidth
                          inputProps={{
                            min: "0",
                          }}
                        />
                        <TextField
                          select
                          label="Select Currency"
                          name="selectedCurrency"
                          required
                          value={supplement.selectedCurrency}
                          onChange={(e) => handleSupplementChange(e, index)}
                          fullWidth
                        >
                          {currencies.map((currency) => (
                            <MenuItem key={currency.id} value={currency.id}>
                              {currency.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      {/* Only show the remove button for supplements other than the first one */}
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => removeSupplement(index)}
                          className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addSupplement}
                    className="add-supplement-btn bg-[#0D47A1] text-white px-4 py-2 rounded-md mt-4"
                  >
                    Add Supplement
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'Facilities' && (
              <div className="p-8 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Room Amenities</h2>
                <div className="flex justify-between items-center mb-8">
                  <button
                    className="px-6 py-3 bg-green-500 text-white text-sm font-medium rounded-full shadow-md transition-all hover:bg-green-600 focus:outline-none"
                    onClick={checkAll}
                  >
                    Select All
                  </button>
                  <button
                    className="px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-full shadow-md transition-all hover:bg-red-600 focus:outline-none"
                    onClick={uncheckAll}
                  >
                    Deselect All
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                      <input
                        type="checkbox"
                        className="w-6 h-6 text-indigo-600 bg-gray-200 border-gray-300 rounded focus:ring-indigo-500"
                        checked={amenity.selected === 'yes'}
                        onChange={() => handleAmenityCheckboxChange(amenity.id)}
                      />
                      <label className="ml-3 text-lg text-gray-800 font-medium">{amenity.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'Markup & Taxes' && (
              <div className="p-4 md:p-8 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Markup & Taxes</h2>

                <div className="flex w-full flex-col md:flex-row gap-5 items-start md:items-center">
                  {/* B2B Markup */}
                  <div className="flex">
                    <TextField
                      label="B2B Markup"
                      variant="outlined"
                      type="number"
                      name="b2bMarkup"
                      inputProps={{ min: 0 }}
                      value={markupDetails.b2bMarkup}
                      onChange={(e) => setMarkupDetails({ ...markupDetails, b2bMarkup: e.target.value })}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      className="bg-gray-100"
                    />
                  </div>

                  {/* B2C Markup */}
                  <div className="flex">
                    <TextField
                      label="B2C Markup"
                      variant="outlined"
                      type="number"
                      name="b2cMarkup"
                      inputProps={{ min: 0 }}
                      value={markupDetails.b2cMarkup}
                      onChange={(e) => setMarkupDetails({ ...markupDetails, b2cMarkup: e.target.value })}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      className="bg-gray-100"
                    />
                  </div>

                  {/* B2E Markup */}
                  <div className="flex">
                    <TextField
                      label="B2E Markup"
                      variant="outlined"
                      type="number"
                      name="b2eMarkup"
                      inputProps={{ min: 0 }}
                      value={markupDetails.b2eMarkup}
                      onChange={(e) => setMarkupDetails({ ...markupDetails, b2eMarkup: e.target.value })}
                      fullWidth
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      className="bg-gray-100"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-6 border-b pb-4">
                  {agencyCodesList.map((agencyCode, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 rounded-xl shadow-xl"
                    >
                      <div className="w-full flex flex-col flex-1">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                          Agency Code {index + 1}
                        </h3>

                        <div className="flex w-full flex-col md:flex-row gap-5 items-start md:items-center">
                          {/* Agency Code */}
                          <TextField
                            label="Agency Code"
                            variant="outlined"
                            name="agencyCode"
                            value={agencyCode.agencyCode}
                            onChange={(e) => handleAgencyCodesListChange(e, index, "agencyCode")}
                            // className="w-full"
                            InputProps={{
                              className: "bg-white shadow-sm rounded-md",
                            }}
                          />
                          {/* Agency Code Number */}
                          <TextField
                            label="Agency Markup"
                            variant="outlined"
                            type="number"
                            value={agencyCode.agencyCodeNumber}
                            onChange={(e) => handleAgencyCodesListChange(e, index, "agencyCodeNumber")}
                            // className="w-full"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">%</InputAdornment>,
                              className: "bg-white shadow-sm rounded-md",
                            }}
                            inputProps={{ min: 0 }}
                          />
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => removeAgencyCode(index)}
                              className="remove-supplement-btn flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                            >
                              <AiOutlineMinus className="mr-2" size={16} />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}

                  {/* Add Agency Code Button */}
                  <div className="flex mt-4">
                    <button
                      type="button"
                      onClick={() => addAgencyCode()}
                      className="add-supplement-btn flex items-center justify-center bg-[#0D47A1] text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out mt-4"
                    >
                      <AiOutlinePlus className="mr-2" size={16} />
                      Add Agency Code
                    </button>
                  </div>
                </div>
                {
                  selectedHotel && taxes.length > 0 && (
                    <div className="w-full flex items-center flex-col md:flex-row mt-6 gap-5">
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={selectedTax}
                        onChange={(e) => setSelectedTaxe(e.target.value)}
                        label="Select Tax"
                        className="mb-6"
                        SelectProps={{
                          multiple: true,  // Enable multi-select
                          renderValue: (selected) => selected.map((id) => taxes.find((tax) => tax.id === id).name).join(', ')  // Display selected tax names
                        }}
                      >
                        {taxes.map((tax) => (
                          <MenuItem key={tax.id} value={tax.id}>
                            {tax.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={selectedTaxType}
                        onChange={(e) => setSelectedTaxeType(e.target.value)}
                        label="Select Tax Type"
                        className="mb-6"
                      >
                        <MenuItem value="include">Including Taxes</MenuItem>
                        <MenuItem value="exclude">Excluding Taxes</MenuItem>
                        <MenuItem value="include_except">Including Taxes Except</MenuItem>
                      </TextField>
                      {
                        selectedTaxType === "include_except" && (
                          <TextField
                            select
                            fullWidth
                            variant="outlined"
                            value={selectedExceptTax}
                            onChange={(e) => setSelectedExceptTaxe(e.target.value)} // Update the selected service                }
                            label="Select Excepted Tax"
                            className="mb-6"
                          >
                            {taxes.map((tax) => (
                              <MenuItem key={tax.id} value={tax.id}>
                                {tax.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        )
                      }
                    </div>
                  )
                }
              </div>
            )}
            {activeTab === 'Policy' && (
              <div className="p-4 xl:p-8 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Policy Settings</h2>

                {/* Check-in and Check-out Time Inputs */}
                <div className="flex space-x-6 mb-6">
                  <TextField
                    label="Check-in Time"
                    type="time"
                    name="checkInTime"
                    value={policyDetails.checkInTime}
                    onChange={handlePolicyChange}
                    fullWidth
                    className="w-1/3"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    label="Check-out Time"
                    type="time"
                    name="checkOutTime"
                    value={policyDetails.checkOutTime}
                    onChange={handlePolicyChange}
                    fullWidth
                    className="w-1/3"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>

                {/* Terms and Conditions Text */}
                <div className="space-y-4 mb-6">
                  <TextField
                    label="Terms and Conditions"
                    name="termsAndConditions"
                    value={policyDetails.termsAndConditions}
                    onChange={handlePolicyChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                  />
                </div>

                {/* Children Policy */}
                <div className="space-y-4 mb-6">
                  <TextField
                    label="Children Policy"
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
                              inputProps={{
                                min: "0",
                              }}
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
                            inputProps={{
                              min: "0",
                            }}
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

              </div>

            )}

            <div className="mt-6 text-right">
              <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditRoomPage;
