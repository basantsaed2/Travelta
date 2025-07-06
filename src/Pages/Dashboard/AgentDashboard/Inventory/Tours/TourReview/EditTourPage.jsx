import React, { useState, useEffect, useRef } from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment, ListItemText, Switch, Button, FormControlLabel, RadioGroup, Radio, IconButton } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineMinusCircle } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import PickUpMap from "../../../../../../Components/PickUpMap"; // Import the map component
import { useNavigate } from 'react-router-dom';

const EditTourPage = ({ update, setUpdate }) => {
  const { tourId } = useParams();
  const { refetch: refetchTourData, loading: loadingTourData, data: tourData } = useGet({ url: `https://travelta.online/agent/tour/item/${tourId}` });
  const { refetch: refetchList, loading: loadingList, data: listData } = useGet({ url: 'https://travelta.online/agent/tour/lists' });
  const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/tour/update/${tourId}` });
  const [activeTab, setActiveTab] = useState('General Details');
  const navigate = useNavigate();
  // const { refetch: refetchTour, data: dataTour } = useGet({
  //     url: "https://travelta.online/agent/tour",
  // });

  //General Detalils
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [tours, setTours] = useState([])
  const [currencies, setCurrencies] = useState([])
  const [selectedTours, setSelectedTours] = useState('')
  const [selectedDestinationType, setSelectedDestinationType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [paymentOption, setPaymentOption] = useState('')
  const [tourArrival, setTourArrival] = useState('')

  const [hotels, setHotels] = useState([{ id: 1, name: "" }]);
  const [price, setPrice] = useState("");
  const [selectCurrency, setSelectCurrency] = useState("");

  // Handle hotel name change
  const handleHotelChange = (index, e) => {
    const updatedHotels = [...hotels];
    updatedHotels[index].name = e.target.value;
    setHotels(updatedHotels);
  };

  // Add more hotels
  const addHotel = () => {
    setHotels([...hotels, { id: hotels.length + 1, name: "" }]);
  };

  // Remove hotel (except the first one)
  const removeHotel = (index) => {
    if (hotels.length > 1) {
      setHotels(hotels.filter((_, i) => i !== index));
    }
  };

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
    tour_email: '',
    tour_phone: '',
    tour_website: '',
    tour_address: '',
    thumbnail: null,
  });
  const tourType = [
    { value: "private", label: "Private Tour" },
    { value: "group", label: "Group Tour" },
  ];
  const [tourPickUp, setTourPickUp] = useState({
    pick_up_country: '',
    pick_up_city: '',
    pick_up_map: '',
    lat: 31.2001, // Default latitude (Alexandria)
    lng: 29.9187, // Default longitude

  });
  const [tourDestination, setTourDestination] = useState([
    {
      destination_country: '',
      destination_city: '',
      destination_arrival_map: '',
    }]);
  const [tourItinerary, setTourItinerary] = useState([
    {
      itinerary_image: '',
      itinerary_day_name: '',
      itinerary_day_description: '',
      itinerary_content: '',
    }]);
  const [tourAvailability, setTourAvailability] = useState([
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

  const [includes, setIncludes] = useState([
    {
      name: '',
    }]);
  const [excludes, setExcludes] = useState([
    {
      name: '',
    }]);

  const [isExtraPriceEnabled, setIsExtraPriceEnabled] = useState(false);
  const [extraPrices, setExtraPrices] = useState([
    { name: '', price: '', currency: '', type: '' } // Default entry
  ]);

  const [discounts, setDiscounts] = useState([
    { from: '', to: '', discount: '', type: 'fixed' } // Default entry
  ]);

  // Handle Extra Price Input Change
  const handleExtraPriceChange = (e, index) => {
    const { name, value } = e.target;
    setExtraPrices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  };

  // Add Extra Price Entry
  const addExtraPrice = () => {
    setExtraPrices([...extraPrices, { name: '', price: '', currency: '', type: '' }]);
  };

  // Remove Extra Price Entry
  const removeExtraPrice = (index) => {
    setExtraPrices(extraPrices.filter((_, i) => i !== index));
  };

  // Handle Discount Change
  const handleDiscountChange = (e, index) => {
    const { name, value } = e.target;
    setDiscounts((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [name]: value } : d))
    );
  };

  // Add Discount Entry
  const addDiscount = () => {
    setDiscounts([...discounts, { from: '', to: '', discount: '', type: 'fixed' }]);
  };

  // Remove Discount Entry
  const removeDiscount = (index) => {
    setDiscounts(discounts.filter((_, i) => i !== index));
  };

  const [isPersonTypeEnabled, setIsPersonTypeEnabled] = useState(false);
  const [withAccommodation, setWithAccommodation] = useState(false);

  // State for Person Type entries
  const [persons, setPersons] = useState([
    {
      type: "",
      minAge: "",
      maxAge: "",
      price: "",
      currency: "",
      singlePrice: "",
      doublePrice: "",
      triplePrice: "",
      quadruplePrice: "",
      singlePriceCurrency: "",
      doublePriceCurrency: "",
      triplePriceCurrency: "",
      quadruplePriceCurrency: "",
    },
  ]);

  // State for Room Capacity entries
  const [roomCapacities, setRoomCapacities] = useState([
    {
      singleChildren: "",
      singleAdults: "",
      doubleChildren: "",
      doubleAdults: "",
      tripleChildren: "",
      tripleAdults: "",
      quadrupleChildren: "",
      quadrupleAdults: "",
    },
  ]);

  // Handler for Person Type input changes
  const handlePersonTypeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedPersons = [...persons];
    updatedPersons[index][name] = value;
    setPersons(updatedPersons);
  };

  // Add a new Person Type entry
  const addPersonType = () => {
    setPersons([
      ...persons,
      {
        type: "",
        minAge: "",
        maxAge: "",
        price: "",
        currency: "",
        singlePrice: "",
        doublePrice: "",
        triplePrice: "",
        quadruplePrice: "",
        singlePriceCurrency: "",
        doublePriceCurrency: "",
        triplePriceCurrency: "",
        quadruplePriceCurrency: "",
      },
    ]);
  };

  // Remove a Person Type entry (if more than one exists)
  const removePersonType = (index) => {
    if (persons.length > 1) {
      setPersons(persons.filter((_, i) => i !== index));
    }
  };

  // Handler for Room Capacity input changes
  const handleRoomCapacityChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCapacities = [...roomCapacities];
    updatedCapacities[index][name] = value;
    setRoomCapacities(updatedCapacities);
  };

  const handleMainImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTourDetails((prevState) => ({
          ...prevState,
          thumbnail: reader.result, // Store Base64 string instead of file
        }));
      };
    }
  };
  const handleMainRemoveImage = () => {
    setTourDetails((prevState) => ({
      ...prevState,
      thumbnail: null,
    }));

    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setTourItinerary((prevList) => {
          const updatedList = [...prevList];
          updatedList[index] = { ...updatedList[index], itinerary_image: reader.result }; // Store Base64
          return updatedList;
        });
      };
    }
  };

  const handleRemoveImage = (index) => {
    setTourItinerary((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], itinerary_image: null };
      return updatedList;
    });

    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    refetchList();
    refetchTourData();
    // refetchTour()
  }, [refetchList, refetchTourData, update]);

  useEffect(() => {
    if (listData && listData.tour_types && listData.countries && listData.cities) {
      console.log("List Data:", listData);
      setTours(listData.tour_types);
      setCountries(listData.countries);
      setCities(listData.cities);
      setCurrencies(listData.currencies);
    }
  }, [listData]);

useEffect(() => {
  if (tourData && tourData.tour) {
    const tour = tourData.tour;
    console.log("Tour", tour)
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
      setQuantity(tour.availability?.[0]?.quantity || 0);
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

     setPolicyDetails({
        childrenPolicy: tour.policy || '',
        cancellationPolicy: tour.cancelation === 1 ? 'non_refundable' : 'refundable',
        cancellationPolicies: tour.cancelation_items?.map(item => ({
          cancellationType: item.type === 'precentage' ? 'Percentage' : 'Value',
          cancellationValue: item.amount || 0,
          cancellationBeforeDays: item.days || 0,
        })) || [],
      });

      setIncludes(tour.includes?.map(include => ({
        name: include.name || '',
      })) || []);

      setExcludes(tour.excludes?.map(exclude => ({
        name: exclude.name || '',
      })) || []);

      // Pricing Data
      setPrice(tour.price || "");
      setSelectCurrency(tour.currency_id || "");
      
      // Extra Prices
      setIsExtraPriceEnabled(tour.enabled_extra_price === 1);
      setExtraPrices(tour.tour_extras?.map(extra => ({
        name: extra.name || '',
        price: extra.price || '',
        currency: extra.currency_id || '',
        type: extra.type || ''
      })) || [{ name: '', price: '', currency: '', type: '' }]);

      // Discounts
      setDiscounts(tour.tour_discounts?.map(discount => ({
        from: discount.from || '',
        to: discount.to || '',
        discount: discount.discount || '',
        type: discount.type === 'precentage' ? 'Percentage' : 'fixed'
      })) || [{ from: '', to: '', discount: '', type: 'fixed' }]);

      // Person Type Pricing
      setIsPersonTypeEnabled(tour.enable_person_type === 1);
      setWithAccommodation(tour.with_accomodation === 1);
      
      setPersons(tour.tour_pricings?.map(pricing => ({
        type: pricing.person_type || '',
        minAge: pricing.min_age || '',
        maxAge: pricing.max_age || '',
        price: pricing.tour_pricing_items?.find(item => !item.type)?.price || '', // base price
        currency: pricing.tour_pricing_items?.find(item => !item.type)?.currency_id || '',
        singlePrice: pricing.tour_pricing_items?.find(item => item.type === 'single')?.price || '',
        doublePrice: pricing.tour_pricing_items?.find(item => item.type === 'double')?.price || '',
        triplePrice: pricing.tour_pricing_items?.find(item => item.type === 'triple')?.price || '',
        quadruplePrice: pricing.tour_pricing_items?.find(item => item.type === 'quadruple')?.price || '',
        singlePriceCurrency: pricing.tour_pricing_items?.find(item => item.type === 'single')?.currency_id || '',
        doublePriceCurrency: pricing.tour_pricing_items?.find(item => item.type === 'double')?.currency_id || '',
        triplePriceCurrency: pricing.tour_pricing_items?.find(item => item.type === 'triple')?.currency_id || '',
        quadruplePriceCurrency: pricing.tour_pricing_items?.find(item => item.type === 'quadruple')?.currency_id || '',
      })) || [{
        type: "",
        minAge: "",
        maxAge: "",
        price: "",
        currency: "",
        singlePrice: "",
        doublePrice: "",
        triplePrice: "",
        quadruplePrice: "",
        singlePriceCurrency: "",
        doublePriceCurrency: "",
        triplePriceCurrency: "",
        quadruplePriceCurrency: "",
      }]);
      // Hotels
      setHotels(tour.tour_hotels?.map(hotel => ({
        id: hotel.id,
        name: hotel.name || ''
      })) || [{ id: 1, name: "" }]);

      // Room Capacities (if with accommodation)
      if (tour.with_accomodation === 1) {
        setRoomCapacities([{
          singleChildren: tour.tour_room?.[0]?.children_single || "",
          singleAdults: tour.tour_room?.[0]?.adult_single || "",
          doubleChildren: tour.tour_room?.[0]?.children_double || "",
          doubleAdults: tour.tour_room?.[0]?.adult_double || "",
          tripleChildren: tour.tour_room?.[0]?.children_triple || "",
          tripleAdults: tour.tour_room?.[0]?.adult_triple || "",
          quadrupleChildren: tour.tour_room?.[0]?.children_quadruple || "",
          quadrupleAdults: tour.tour_room?.[0]?.adult_quadruple || "",
        }]);
      }
    }
  }
}, [tourData, tourId]);

    useEffect(() => {
      if (!loadingPost && response) {
      navigate(-1)
      }
    }, [response,loadingPost,navigate]);

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


  //   const handleChangeTourPickUp = (e) => {
  //     setTourPickUp({
  //     ...tourPickUp,
  //     [e.target.name]: e.target.value,
  //     });
  // };

  // Function to extract lat/lng from Google Maps link
  const extractLatLngFromGoogleLink = (link) => {
    const regex = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = link.match(regex);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
      };
    }
    return null;
  };

  // Function to handle input change
  const handleChangeTourPickUp = (e) => {
    const { name, value } = e.target;

    // If user enters a Google Maps link, extract lat/lng and update state
    if (name === "pick_up_map") {
      const googleCoords = extractLatLngFromGoogleLink(value);
      if (googleCoords) {
        setTourPickUp((prev) => ({
          ...prev,
          pick_up_map: value, // Store full URL
          lat: googleCoords.lat,
          lng: googleCoords.lng,
        }));
      } else {
        setTourPickUp((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setTourPickUp((prev) => ({ ...prev, [name]: value }));
    }
  };


  //   const handleChangeTourDestination = (e) => {
  //     setTourDestination({
  //     ...tourDestination,
  //     [e.target.name]: e.target.value,
  //     });
  // };

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
      { itinerary_image: '', itinerary_day_name: '', itinerary_day_description: '', itinerary_content: '' },
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
      { destination_country: '', destination_city: '', destination_arrival_map: '' },
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
      { date: '', last_booking: '' },
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
      { name: '' },
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
      { name: '' },
    ]);
  };
  // Remove Excludes from the list
  const removeExcludes = (index) => {
    setExcludes((prevList) => prevList.filter((_, i) => i !== index));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const googleMapsLink = `https://www.google.com/maps?q=${tourPickUp.lat},${tourPickUp.lng}`;

    // Basic Tour Details
    formData.append("name", tourDetails.name);
    formData.append("image", tourDetails.thumbnail);
    formData.append("description", tourDetails.description);
    formData.append("video_link", tourDetails.videoLink);
    formData.append("tour_type", tourDetails.selectedTourType); // 'private' or 'group'
    formData.append('status', tourDetails.status === true ? 1 : 0);
    formData.append("arrival", tourArrival);
    formData.append("days", tourDetails.days);
    formData.append("nights", tourDetails.nights);
    formData.append("tour_type_id", selectedTours);
    formData.append("featured", tourDetails.featured ? "yes" : "no");
    if (tourDetails.featured) {
      formData.append("featured_from", tourDetails.featured_from);
      formData.append("featured_to", tourDetails.featured_to);
    }
    formData.append("deposit", tourDetails.deposit);
    formData.append("deposit_type", tourDetails.deposit_type === 'Percentage' ? 'precentage' : 'fixed'); // 'percentage' or 'fixed'
    formData.append("tax", tourDetails.tax);
    formData.append("tax_type", tourDetails.tax_type === 'Percentage' ? 'precentage' : 'fixed'); // 'percentage' or 'fixed'

    // Pickup Information
    formData.append("pick_up_country_id", tourPickUp.pick_up_country);
    formData.append("pick_up_city_id", tourPickUp.pick_up_city);
    formData.append("pick_up_map", googleMapsLink);

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
      formData.append(`cancelation_items[${index}][type]`, policy.cancellationType === 'Percentage' ? 'precentage' : 'fixed');
      formData.append(`cancelation_items[${index}][amount]`, policy.cancellationValue);
      formData.append(`cancelation_items[${index}][days]`, policy.cancellationBeforeDays);
    });

    // Policy & Cancellation
    formData.append("policy", policyDetails.childrenPolicy);
    formData.append("cancelation", policyDetails.cancellationPolicy === 'non_refundable' ? 1 : 0);

    // Append the boolean for extra pricing
    formData.append("enabled_extra_price", isExtraPriceEnabled ? 1 : 0);
    formData.append("enable_person_type", isPersonTypeEnabled ? 1 : 0);
    formData.append("with_accomodation", withAccommodation ? 1 : 0);

    formData.append("price", price);
    formData.append("currency_id", selectCurrency);

    if (withAccommodation) {
      // Hotels
      hotels.forEach((hotel, index) => {
        formData.append(`hotels[${index}][name]`, hotel.name);
      });
      // Append Room Capacity Data
      roomCapacities.forEach((room, index) => {
        formData.append(`tour_room[${index}][adult_single]`, room.singleAdults || 0);
        formData.append(`tour_room[${index}][adult_double]`, room.doubleAdults || 0);
        formData.append(`tour_room[${index}][adult_triple]`, room.tripleAdults || 0);
        formData.append(`tour_room[${index}][adult_quadruple]`, room.quadrupleAdults || 0);
        formData.append(`tour_room[${index}][children_single]`, room.singleChildren || 0);
        formData.append(`tour_room[${index}][children_double]`, room.doubleChildren || 0);
        formData.append(`tour_room[${index}][children_triple]`, room.tripleChildren || 0);
        formData.append(`tour_room[${index}][children_quadruple]`, room.quadrupleChildren || 0);
      });
    }

    if (isExtraPriceEnabled) {
      // Append Extra Prices
      extraPrices.forEach((extra, index) => {
        formData.append(`extra[${index}][name]`, extra.name);
        formData.append(`extra[${index}][price]`, extra.price);
        formData.append(`extra[${index}][currency_id]`, extra.currency);
        formData.append(`extra[${index}][type]`, extra.type); // Can be 'one_time', 'person', or 'night'
      });
    }

    // Append Discounts
    discounts.forEach((discount, index) => {
      formData.append(`discounts[${index}][from]`, discount.from);
      formData.append(`discounts[${index}][to]`, discount.to);
      formData.append(`discounts[${index}][discount]`, discount.discount);
      formData.append(`discounts[${index}][type]`, discount.type === 'Percentage' ? 'precentage' : 'fixed'); // Can be 'percentage' or 'fixed'
    });

    // Append Pricing Data
    persons.forEach((person, personIndex) => {
      formData.append(`pricing[${personIndex}][person_type]`, person.type);
      formData.append(`pricing[${personIndex}][min_age]`, person.minAge);
      formData.append(`pricing[${personIndex}][max_age]`, person.maxAge);

      let pricingItems = [];

      if (!withAccommodation) {
        pricingItems.push({
          currency_id: person.currency,
          price: person.price,
          type: "single",
        });
      } else {
        ["singlePrice", "doublePrice", "triplePrice", "quadruplePrice"].forEach((field) => {
          if (person[field]) {
            pricingItems.push({
              currency_id: person[`${field}Currency`],
              price: person[field],
              type: field.replace("Price", "").toLowerCase(),
            });
          }
        });
      }

      // Append Pricing Items
      pricingItems.forEach((item, priceIndex) => {
        formData.append(`pricing[${personIndex}][pricing_item][${priceIndex}][currency_id]`, item.currency_id);
        formData.append(`pricing[${personIndex}][pricing_item][${priceIndex}][price]`, item.price);
        formData.append(`pricing[${personIndex}][pricing_item][${priceIndex}][type]`, item.type);
      });
    });

    postData(formData, 'Tour Added Success');

  };

  return (
    <div className="w-full p-2 md:p-6 bg-white shadow rounded">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 xl:space-x-4">
          {['General Details', 'Pickup & Destination', 'Itinerary', 'Pricing', 'Policy'].map((tab) => (
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
                  onChange={handleMainImageUpload}
                  ref={fileInputRef} // Reference to the input field
                />
              </Button>
              {tourDetails.thumbnail && (
                <div className="flex flex-col xl:flex-row gap-5 items-center mt-4">
                  <img
                    src={tourDetails.thumbnail} // Directly use Base64 string
                    alt="Room Preview"
                    className="h-80 w-96 object-cover mr-4"
                  />
                  <button
                    type="button"
                    onClick={handleMainRemoveImage}
                    className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

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
            <div className="space-y-6">
              {/* Country & City Selection (Side-by-Side on Desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  select
                  name="pick_up_country"
                  fullWidth
                  variant="outlined"
                  value={tourPickUp.pick_up_country}
                  onChange={handleChangeTourPickUp}
                  label="Select PickUp Country"
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
                  required
                >
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              {/* Map Input Field (Full Width) */}
              <TextField
                name="pick_up_map"
                label="Pick-up Map"
                type="text"
                fullWidth
                required
                value={tourPickUp.pick_up_map}
                onChange={handleChangeTourPickUp}
              />

              {/* Hidden Lat/Lng Fields */}
              <input type="hidden" name="lat" value={tourPickUp.lat} />
              <input type="hidden" name="lng" value={tourPickUp.lng} />

              {/* Interactive Map (Auto-updates with location) */}
              <div className="border rounded-xl overflow-hidden shadow-md">
                <PickUpMap tourPickUp={tourPickUp} setTourPickUp={setTourPickUp} />
              </div>
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
                          src={itinerary.itinerary_image} // Directly use Base64 string
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
        {activeTab === 'Pricing' && (
          <div className=" bg-gray-50 rounded-lg shadow-md flex flex-col gap-5">

            <div className='rounded-lg bg-white shadow-md p-4'>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Pricing</h2>

              {/* Price Input */}
              <div className="w-full mb-6 flex gap-5">
                <TextField
                  label="Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  className='w-full md:w-1/2'
                  inputProps={{
                    min: "0",
                  }}
                />

                {/* Currency Selection */}
                <TextField
                  select
                  value={selectCurrency}
                  onChange={(e) => setSelectCurrency(e.target.value)}
                  variant="outlined"
                  label="Currency"
                  className='w-full md:w-1/2'
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.id} value={currency.id}>
                      {currency.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

            </div>

            <div className='flex flex-col gap-5 rounded-lg bg-white shadow-md p-4'>
              <h2 className="text-2xl font-semibold text-gray-800">Person Type</h2>
              {/* Settings Card */}
              <div className="w-full flex flex-col md:flex-row gap-5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="enablePersonType"
                    checked={isPersonTypeEnabled}
                    onChange={() => setIsPersonTypeEnabled(!isPersonTypeEnabled)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <label htmlFor="enablePersonType" className="ml-2 text-lg font-semibold text-gray-800">
                    Enable Person Type
                  </label>
                </div>
                {isPersonTypeEnabled && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="withAccommodation"
                      checked={withAccommodation}
                      onChange={() => setWithAccommodation(!withAccommodation)}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <label htmlFor="withAccommodation" className="ml-2 text-lg font-semibold text-gray-800">
                      With Accommodation
                    </label>
                  </div>
                )}
              </div>

              {/* Person Type Details Card */}
              {isPersonTypeEnabled && (
                <div className="w-full p-4 border rounded-lg shadow-md bg-white">
                  <div className="font-bold text-gray-800 text-xl">Person Type Details</div>
                  {persons.map((person, index) => (
                    <div key={index} className="w-full border-b pb-4 mb-4 flex flex-wrap items-center">

                      <div className="w-full md:w-4/12 p-2">
                        <TextField
                          select
                          name="type"
                          value={person.type}
                          fullWidth
                          variant="outlined"
                          onChange={(e) => handlePersonTypeChange(index, e)}
                          label="Person Type"
                        >
                          <MenuItem value="adult">Adult</MenuItem>
                          <MenuItem value="child">Child</MenuItem>
                          <MenuItem value="infant">Infant</MenuItem>
                        </TextField>
                      </div>

                      <div className="w-full md:w-3/12 xl:w-2/12 p-2">
                        <TextField
                          fullWidth
                          type="number"
                          label="Min Age"
                          name="minAge"
                          value={person.minAge}
                          onChange={(e) => handlePersonTypeChange(index, e)}
                          inputProps={{
                            min: "0",
                          }}
                        />
                      </div>

                      <div className="w-full md:w-3/12 xl:w-2/12 p-2">
                        <TextField
                          fullWidth
                          type="number"
                          label="Max Age"
                          name="maxAge"
                          value={person.maxAge}
                          onChange={(e) => handlePersonTypeChange(index, e)}
                          inputProps={{
                            min: "0",
                          }}
                        />
                      </div>

                      {!withAccommodation ? (
                        <div className="w-full md:w-6/12 xl:w-4/12 p-2">
                          <div className="flex flex-wrap items-center">
                            <div className="w-8/12 p-1">
                              <TextField
                                fullWidth
                                type="number"
                                label="Price"
                                name="price"
                                value={person.price}
                                onChange={(e) => handlePersonTypeChange(index, e)}
                                inputProps={{
                                  min: "0",
                                }}
                              />
                            </div>
                            <div className="w-4/12 p-1">
                              <TextField
                                select
                                fullWidth
                                label="Currency"
                                name="currency"
                                value={person.currency}
                                onChange={(e) => handlePersonTypeChange(index, e)}
                              >
                                {currencies.map((currency) => (
                                  <MenuItem key={currency.id} value={currency.id}>
                                    {currency.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full">
                          <div className="flex flex-wrap">
                            {["singlePrice", "doublePrice", "triplePrice", "quadruplePrice"].map((field) => (
                              <div className="w-full md:w-6/12 p-2" key={field}>
                                <div className="flex flex-wrap items-center">
                                  <div className="w-8/12 p-1">
                                    <TextField
                                      fullWidth
                                      type="number"
                                      label={field.replace("Price", " Price")}
                                      name={field}
                                      value={person[field]}
                                      onChange={(e) => handlePersonTypeChange(index, e)}
                                      inputProps={{
                                        min: "0",
                                      }}
                                    />
                                  </div>
                                  <div className="w-4/12 p-1">
                                    <TextField
                                      select
                                      fullWidth
                                      label="Currency"
                                      name={`${field}Currency`}
                                      value={person[`${field}Currency`]}
                                      onChange={(e) => handlePersonTypeChange(index, e)}
                                    >
                                      {currencies.map((currency) => (
                                        <MenuItem key={currency.id} value={currency.id}>
                                          {currency.name}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {index !== 0 && (
                        <div className="w-auto p-2">
                          <IconButton
                            onClick={() => removePersonType(index)}
                            disabled={persons.length === 1}
                          >
                            <AiOutlineMinusCircle
                              size={24}
                              className={persons.length === 1 ? "text-gray-400" : "text-red-500 hover:text-red-700"}
                            /> Remove
                          </IconButton>
                        </div>
                      )}

                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPersonType}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition mt-2"
                  >
                    + Add Person Type
                  </button>
                </div>

              )}

              {withAccommodation && (
                <div className='w-full p-4 border rounded-lg shadow-md bg-white'>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hotels</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {hotels.map((hotel, index) => (
                      <div key={hotel.id} className="relative">
                        <TextField
                          label="Hotel Name"
                          value={hotel.name}
                          onChange={(e) => handleHotelChange(index, e)}
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            endAdornment: index !== 0 && (
                              <IconButton onClick={() => removeHotel(index)} size="small">
                                <AiOutlineDelete color="red" />
                              </IconButton>
                            ),
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add More Hotels Button */}
                  <button
                    type="button"
                    onClick={addHotel}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                  >
                    + Add More Hotels
                  </button>
                </div>
              )}

              {/* Room Capacity Card (Visible when With Accommodation is enabled) */}
              {withAccommodation && (
                <div className="w-full p-4 border rounded-lg shadow-md bg-white">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Maximum Room Capacity</h2>
                  <div className="p-4 border rounded-lg bg-gray-100 relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {["singleChildren", "singleAdults", "doubleChildren", "doubleAdults", "tripleChildren", "tripleAdults", "quadrupleChildren", "quadrupleAdults"].map((field) => (
                        <div key={field} className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700">
                            {field.replace(/([A-Z])/g, " $1")}:
                          </label>
                          {roomCapacities.length > 0 && (
                            <TextField
                              type="number"
                              name={field}
                              value={roomCapacities[0][field] || ""}
                              onChange={(e) => handleRoomCapacityChange(0, e)}
                              inputProps={{ min: 0 }}
                              fullWidth
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              )}

            </div>

            {/* Extra Price Section */}
            <div className="flex flex-col gap-4 rounded-lg bg-white shadow-md p-4">
              <h2 className="text-2xl font-semibold text-gray-800">Extra Price</h2>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="enableExtraPrice"
                  checked={isExtraPriceEnabled}
                  onChange={() => setIsExtraPriceEnabled(!isExtraPriceEnabled)}
                  className="w-5 h-5 accent-blue-600"
                />
                <label htmlFor="enableExtraPrice" className="ml-2 text-lg font-semibold text-gray-800">
                  Enabled Extra Price
                </label>
              </div>

              {isExtraPriceEnabled && (
                <div>
                  {extraPrices.map((extra, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-md shadow">

                      {/* Name */}
                      <TextField
                        label="Name"
                        type="text"
                        name="name"
                        value={extra.name}
                        onChange={(e) => handleExtraPriceChange(e, index)}
                        variant="outlined"
                      />

                      {/* Price */}
                      <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={extra.price}
                        onChange={(e) => handleExtraPriceChange(e, index)}
                        variant="outlined"
                        inputProps={{
                          min: "0",
                        }}
                      />

                      {/* Currency Selection */}
                      <TextField
                        select
                        name="currency"
                        value={extra.currency}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => handleExtraPriceChange(e, index)}
                        label="Currency"
                      >
                        {currencies.map((currency) => (
                          <MenuItem key={currency.id} value={currency.id}>
                            {currency.name}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Extra Price Type */}
                      <TextField
                        select
                        name="type"
                        value={extra.type}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => handleExtraPriceChange(e, index)}
                        label="Type"
                      >
                        <MenuItem value="one_time">One Time</MenuItem>
                        <MenuItem value="person">Per Person</MenuItem>
                        <MenuItem value="night">Per Night</MenuItem>
                      </TextField>

                      {/* Remove Button (not for first entry) */}
                      {index !== 0 && (
                        <button
                          type="button"
                          onClick={() => removeExtraPrice(index)}
                          className="bg-red-500 text-white mt-2 px-4 py-2 rounded shadow hover:bg-red-600 transition"
                        >
                          - Remove
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add More Extra Prices Button */}
                  <button
                    type="button"
                    onClick={addExtraPrice}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                  >
                    + Add More
                  </button>
                </div>
              )}
            </div>

            {/* Discount By Number of People Section */}
            <div className="flex flex-col gap-4 rounded-lg bg-white shadow-md p-4">
              <h2 className="text-2xl font-semibold text-gray-800">Discount By Number of People</h2>
              <div>
                {discounts.map((discount, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-md shadow">

                    {/* From */}
                    <TextField
                      label="From"
                      type="number"
                      name="from"
                      value={discount.from}
                      onChange={(e) => handleDiscountChange(e, index)}
                      variant="outlined"
                      inputProps={{
                        min: "0",
                      }}
                    />

                    {/* To */}
                    <TextField
                      label="To"
                      type="number"
                      name="to"
                      value={discount.to}
                      onChange={(e) => handleDiscountChange(e, index)}
                      variant="outlined"
                      inputProps={{
                        min: "0",
                      }}
                    />

                    {/* Discount Value */}
                    <TextField
                      label="Discount Price"
                      type="number"
                      name="discount"
                      value={discount.discount}
                      onChange={(e) => handleDiscountChange(e, index)}
                      variant="outlined"
                      inputProps={{
                        min: "0",
                      }}
                    />

                    {/* Discount Type: Fixed or Percentage */}
                    <TextField
                      select
                      name="type"
                      value={discount.type}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => handleDiscountChange(e, index)}
                      label="Discount Type"
                    >
                      <MenuItem value="percentage">Percentage</MenuItem>
                      <MenuItem value="fixed">Fixed</MenuItem>
                    </TextField>

                    {/* Remove Button (not for first entry) */}
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => removeDiscount(index)}
                        className="bg-red-500 text-white mt-2 px-4 py-2 rounded shadow hover:bg-red-600 transition"
                      >
                        - Remove
                      </button>
                    )}
                  </div>
                ))}
                {/* Add More Discounts Button */}
                <button
                  type="button"
                  onClick={addDiscount}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                  + Add More
                </button>
              </div>

            </div>

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
                          inputProps={{
                            min: "0",
                          }}
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
