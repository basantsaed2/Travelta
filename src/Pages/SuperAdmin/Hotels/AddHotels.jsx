import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useAuth } from "../../../Context/Auth";
import { usePost } from "../../../Hooks/usePostJson";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Checkbox, FormControlLabel, Radio, TextField } from "@mui/material";
import { FaTrash, FaEdit } from "react-icons/fa";
import {  Dialog} from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import { useGet } from "../../../Hooks/useGet";
import { MenuItem } from "@mui/material";
import HotelPolicy from "./HotelPolicy";
import CardAccepted from "./CardAccepted";
import Feature from "./Feature/Feature";
import { useDelete } from "../../../Hooks/useDelete";
const AddHotels = () => {
  const [hotelName, setHotelName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rating, setRating] = useState("");
  const [video, setVideo] = useState("");
  const [webSite, setWebSite] = useState("");
  const [images, setImages] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [inputCount, setInputCount] = useState(1);
  const [viewAll, setViewAll] = useState(true); 
  const [viewAllThemes, setViewAllThemes] = useState(true); 
  const [viewAllCard, setViewAllCard] = useState(true); 
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [hotelLogo,setHotelLogo] = useState('')
  const [imageFile, setImageFile] = useState(null);
  const [nameFacility,setNameFacility] = useState('');
  const [nameTheme,setNameTheme] = useState('')
  const [nameCard,setNameCard] = useState('')
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState([]);
  const [selectedCard, setSelectedCard] = useState([]);
  const [isOpen ,setIsOpen] = useState(false);
  const [isOpenTheme ,setIsOpenTheme] = useState(false);
  const [isOpenCard ,setIsOpenCard] = useState(false);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([]); 
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [previewUrls, setPreviewUrls] = useState([]); // Stores preview URLs for display
  
  const handlePoliciesUpdate = (updatedPolicies) => {
    setPolicies(updatedPolicies);
    console.log("Policies in Parent: ", updatedPolicies);
  };
  const togglePopup = ()=>{
    setIsOpen(!isOpen)
  }

  const togglePopupCard = ()=>{
    setIsOpenCard(!isOpenCard)

  }

  const togglePopupTheme = ()=>{
    setIsOpenTheme(!isOpenTheme)
  }

  const auth = useAuth()

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const { refetch: refetchCountry, loading: loadingCountry, data: DataCountry } = useGet({url:'https://www.travelta.online/api/super/countries'});
  const { refetch: refetchCity, loading: loadingCity, data: DataCity } = useGet({url:'https://www.travelta.online/api/super/cities'});
  const { refetch: refetchZone, loading: loadingZone, data: DataZone } = useGet({url:'https://www.travelta.online/api/super/zones'});
  const { refetch: refetchFacilities, loading: loadingFacilities, data: DataFacilities } = useGet({url:'https://www.travelta.online/api/super/FacilIties'});
  const { refetch: refetchThemes, loading: loadingThemes, data: DataThemes } = useGet({url:'https://www.travelta.online/api/super/THemes'});
  
  const { refetch: refetchCard, loading: loadingCard, data: DataCard } = useGet({url:'https://www.travelta.online/api/super/acceptedCards'});
  const { refetch: refetchImage, loading: loadingImage, data: DataImage } = useGet({url:'https://www.travelta.online/api/super/hOtelImages'});
  const { deleteData:deleteFacility, loadingDelete:loadingFacility, responseDelete:responseDelFacility } = useDelete();
  const { deleteData:deleteTheme, loadingDelete:loadingTheme, responseDelete:responseDelTheme } = useDelete();
  const { deleteData:deleteCard, loadingDelete:loadingCards, responseDelete:responseDelCard } = useDelete();
  const [country,setCountry] = useState([])
  const [city,setCity] = useState([])
  const [Zone,setZone] = useState([])
  const [facilities,setFacilities] = useState([])
  const [theme,setTheme] = useState([])
  const [card,setCard] = useState([])
  const [featureImage,setFeatureImage] = useState([])
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  
      // facility
      const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
      const [currentFacility, setCurrentFacility] = useState(null);
      const [updatedName, setUpdatedName] = useState("");

      const handleUpdateClick = (facility) => {
        setCurrentFacility(facility);
        setUpdatedName(facility.name);
        setIsUpdateDialogOpen(true);
      };


      const handleUpdateSubmit = async () => {
        try {
          const response = await fetch(`https://www.travelta.online/api/super/Facility/uPdate/${currentFacility.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${auth.user?.token || ""}`,

            },
            body: JSON.stringify({ name: updatedName }),
          });
      
          if (response.ok) {
            auth.toastSuccess("Update successful")
          }
       
      
          const updatedFacility = await response.json(); // Assuming the API returns the updated facility
          setFacilities((prev) =>
            prev.map((facility) =>
              facility.id === currentFacility.id ? updatedFacility : facility
            )
          );
          setIsUpdateDialogOpen(false);
        } catch (error) {
          console.error("Error updating facility:", error);
          // Optionally, display an error message to the user
        }
      };
      

  // Handle delete facility
  const handleDelete = async (id, name) => {
    const success = await deleteFacility(`https://www.travelta.online/api/super/Facility/deLete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setFacilities(facilities.filter((facility) => facility.id !== id));
    }
  };
// Handle delete theme 
  const handleDeleteTheme = async (id, name) => {
    const success = await deleteTheme(`https://www.travelta.online/api/super/Theme/Delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setTheme(theme.filter((theme) => theme.id !== id));
    }
  };

  // Handle delete card
  const handleDeleteCard = async (id, name) => {
    const success = await deleteTheme(`https://www.travelta.online/api/super/acceptedCard/delete/${id}`, `${name} Deleted Success.`);
    if (success) {
      setCard(card.filter((card) => card.id !== id));
    }
  };
    
    const { postData, loadingPost, response } = usePost({
      url: "https://www.travelta.online/api/super/hotel/add ",
    });

    const { postData:postDataFacility, loadingPost:loadingDataFacility, response:responseFacility } = usePost({
      url: "https://www.travelta.online/api/super/Facility/aDd",
    });

    const { postData:postDataTheme, loadingPost:loadingDataTheme, response:responseTheme } = usePost({
      url: "https://www.travelta.online/api/super/Theme/Add",
    });

    const { postData:postDataCard, loadingPost:loadingDataCard, response:responseCard } = usePost({
      url: "https://www.travelta.online/api/super/acceptedCard/add ",
    });
    useEffect(() => {
      if(!loadingFacilities){
      refetchFacilities();}
  }, [responseFacility])

  useEffect(() => {
    if(!loadingThemes){
    refetchThemes();}
}, [responseTheme])

useEffect(() => {
  if(!loadingCard){
    refetchCard();}
}, [responseCard])

    useEffect(() => {
        refetchCountry();
        refetchCity();
        refetchZone();
        refetchFacilities();
        refetchThemes();
        refetchCard()
        refetchImage()
    }, [refetchCountry,refetchCity,refetchZone,refetchFacilities,refetchThemes,refetchCard,refetchImage])
 //  data country
    useEffect(() => {
    if(DataCountry)
    {
        setCountry(DataCountry.country)
    }
    console.log("data country",DataCountry )
    }, [DataCountry])
 //  data City
    useEffect(() => {
        if(DataCity)
        {
            setCity(DataCity.city)
        }
        console.log("data city",DataCity )
        }, [DataCity])
 //  data zone
    useEffect(() => {
        if(DataZone)
        {
            setZone(DataZone.zone)
        }
        console.log("data Zone",DataZone )
        }, [DataZone])
 //  data facility
    useEffect(() => {
          if(DataFacilities)
          {
              setFacilities(DataFacilities.facilities)
          }
          console.log("DataFacilities",DataFacilities )
          }, [DataFacilities])
 //  data theme
    useEffect(() => {
            if(DataThemes)
            {
                setTheme(DataThemes.themes)
            }
            console.log("DataThemes",DataThemes )
            }, [DataThemes])
 //  data card
    useEffect(() => {
              if(DataCard)
              {
                setCard(DataCard.cards)
              }
              console.log("Data card",DataCard )
              }, [DataCard])
    //  data image
    useEffect(() => {
                if(DataImage)
                {
                  setFeatureImage(DataImage)
                }
                console.log("Data Image",DataImage )
              }, [DataImage])          

    // Handle image file input change
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages([...images, { image: reader.result }]);
        };
        reader.readAsDataURL(file);
      }
    };
    
    const removeImageselect = (index) => {
      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
    };



  const handleImageFeatureChange = (e) => {
    const files = Array.from(e.target.files); // Get the selected files

    // Convert files to Base64 and create feature objects
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeatures((prevFeatures) => [
          ...prevFeatures,
          { id: prevFeatures.length + 1, base64: reader.result }, // Assign an index
        ]);
        setPreviewUrls((prevUrls) => [...prevUrls, reader.result]); // Add the preview URL
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setFeatures((prevFeatures) => prevFeatures.filter((feature) => feature.id !== id));
    setPreviewUrls((prevUrls, index) => prevUrls.filter((_, i) => i !== id - 1)); // Adjust previews
  };

  const handleImageLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setHotelLogo(reader.result); // Set the Base64 string of the image
        };
        reader.readAsDataURL(file); // Read the file as a data URL (Base64)
}
};

      const addImageInput = () => {
        setInputCount(inputCount + 1); // Increment input count to add a new input field
      };

      const handleFacilityChange = (event) => {
        const selected = event.target.checked
          ? [...selectedFacilities, event.target.name]
          : selectedFacilities.filter((facility) => facility !== event.target.name);
        setSelectedFacilities(selected);
        console.log("selectedfacility",selected)
      };
    
      const handleThemeChange = (event) => {
        const selected = event.target.checked
          ? [...selectedTheme, event.target.name]
          : selectedTheme.filter((theme) => theme !== event.target.name);
        setSelectedTheme(selected);
      };

      const handleCardChange = (event) => {
        const selected = event.target.checked
          ? [...selectedCard, event.target.name]
          : selectedCard.filter((card) => card !== event.target.name);
        setSelectedCard(selected);
      };

    
    
    
//  {     const handleImageChange = (event) => {
//         setImageFile(event.target.files[0]);
//       };    


// {const handleAddImage = (e) => {
// const file = e.target.files?.[0]; // Get the first file from the input
// if (file) {
//     // Read the file as a base64 string or generate a URL
//     const reader = new FileReader();
//     reader.onload = () => {
//     setImages(reader.result); // Save the base64 data or URL to the state
//     };
//     reader.readAsDataURL(file);
// } else {
//     console.error("No file selected.");
// }
// };}
useEffect(() => {
  console.log("loadingPost:", loadingPost); // Debugging
  console.log("response:", response); // Debugging

  if (!loadingPost) {
    if (response) {
      navigate(-1); // Navigate back only when the response is successful
      resetForm()
    } else {
      console.error("Response does not indicate success:", response);
    }
  }
}, [loadingPost, response, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
  // Validate individual fields
  if (!hotelName) {
   auth.toastError("Hotel name is required.")
  }
  if (!countryId) {
    auth.toastError ( "Country is required.");
  }
  if (!cityId) {
    auth.toastError ("City is required.");
  }
  if (!zoneId) {
    auth.toastError("Zone is required.");
  }
  if (!email) {
    auth.toastError ("Email is required.");
  }
  if (!phoneNumber) {
    auth.toastError ("Phone number is required.");
  }
  if (!rating) {
    auth.toastError("Rating is required.");
  }

  if (!checkInDate) {
    auth.toastError ("In Date is required.");
  }
  if (!checkOutDate) {
    auth.toastError("Out Date is required.");
  }

  if (selectedFacilities.length === 0) {
    auth.toastError('Please select at least one facility!');
  }

  if (selectedTheme.length === 0) {
    auth.toastError('Please select at least one Theme!');
  }

  if (selectedCard.length === 0) {
    auth.toastError('Please select at least one Accepted Card!');
  }


  if (!video) {
    auth.toastError('Please enter video link');
  }

  if (!webSite) {
    auth.toastError('Please enter website link');
  }

  if (policies.length===0) {
    auth.toastError('Please enter policies');
  }

   // Set loading state
   setIsSubmitting(true);

  // if (!hotelLogo) {
  //   auth.toastError('Please Enter Hotel Logo');
  // }

 
    // Create a FormData object
    const formData = new FormData();

    // Append fields to FormData
    formData.append("hotel_name", hotelName);
    formData.append("country_id", countryId);
    formData.append("city_id", cityId);
    formData.append("zone_id", zoneId);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("stars", rating);

    formData.append("hotel_logo", hotelLogo);

    formData.append("check_in", checkInDate);
    formData.append("check_out", checkOutDate);

    formData.append("hotel_video_link", video);
    formData.append("hotel_website", webSite);

// Ensure selectedFacilities and selectedTheme contain valid data
// Append policies
policies.forEach((policy) => formData.append("policies[]", JSON.stringify(policy)));

// Append facilities
selectedFacilities.forEach((facility) =>
  formData.append("facilities[]", Number(facility))
);

// Append themes
selectedTheme.forEach((theme) =>
  formData.append("themes[]", Number(theme))
);

// Append cards
selectedCard.forEach((card) =>
  formData.append("accepted_cards[]", Number(card))
);

// Append only the id of selected features
selectedFeatures.forEach((feature) => {
  formData.append("features[]", feature.id);
});

// // Log to verify the output before submission
// console.log("FormData values:");
console.log("Policies:", policies);
// console.log("Facilities:", facilitiesArray);
// console.log("Themes:", themesArray);

   // Append each image to FormData
   
   images.forEach(image => {
    formData.append("images[]",JSON.stringify(image)); // 'images[]' for array of images
  });

  try {
    // Simulate an API call
    postData(formData, 'Hotel Account Added Success');

    // Reset all fields

    // resetForm();

    // // Navigate back

   
  } catch (error) {
    auth.toastError("Error occurred during submission.");
  } finally {
    setIsSubmitting(false); // Stop loading state
  }
  };

  const handleAddFacility=(e)=>{
    e.preventDefault();
    if(!nameFacility){
      auth.toastError('Enter Name')
    }

    const formData = new FormData();
    formData.append('name', nameFacility);
    postDataFacility(formData, "facility Add Successful")
  }

  const handleAddTheme=(e)=>{
    e.preventDefault();
    if(!nameTheme){
      auth.toastError('Enter Name')
    }

    const formData = new FormData();
    formData.append('name', nameTheme);

    postDataTheme(formData, "Theme Add Successful")
  }

  const handleAddCard=(e)=>{
    e.preventDefault();
    if(!nameCard){
      auth.toastError('Enter Name')
    }

    const formData = new FormData();
    formData.append('card_name', nameCard);

    postDataCard(formData, "Accepted Card Add Successful")
  }

  const resetForm = () => {
    setHotelName("");
    setCountryId("");
    setCityId("");
    setZoneId("");
    setEmail("");
    setPhoneNumber("");
    setRating("");
    setCheckInDate("");
    setCheckOutDate("");
    setVideo("");
    setWebSite("");
    setPolicies([]);
    setSelectedFacilities([]);
    setSelectedTheme([]);
    setSelectedCard([]);
    setSelectedFeatures([]);
    setHotelLogo(null);
    setImages([]);
  };
  


  return (
    <div className="">
    <div className="flex items-center mb-4">
    <button
          onClick={handleBack}
          className="m-4"
          
        >
          <FaArrowLeft className="text-mainColor text-2xl" />
        </button>
        <h2 className="text-center text-mainColor text-3xl ">Add Hotels</h2>
        

    </div>
  <form onSubmit={handleSubmit} className="w-full rounded-lg p-6 shadow-md">
  <div className="flex flex-wrap grid grid-cols-1  gap-6 mb-6">
    {/* Left Side */}
    <div className="flex-1 min-w-[300px]">


    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
  {/* Hotel Name */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={hotelName}
    onChange={(e) => setHotelName(e.target.value)}
    label="Hotel Name"
    placeholder="Enter hotel name"
    required
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

  {/* Email */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    label="Hotel Email"
    placeholder="Enter hotel name"
    required
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

  {/* Phone Number */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    label="Hotel Number"
    placeholder="Enter hotel number"
    required
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

      </div>




     {/* Hotel Logo */}
     <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Hotel Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageLogoChange}
          className="w-full px-4 py-3 border bg-transparent border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {hotelLogo && (
          <div className="mt-4">
            <img src={hotelLogo} alt="Hotel Logo Preview" className="w-full h-32 object-cover rounded" />
          </div>
        )}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2"> 
    {/* Country Dropdown */}
    <div className="mb-6">
    <TextField
      select
      fullWidth
      variant="outlined"
      value={countryId}
      onChange={(e) => setCountryId(e.target.value)}
      label="Select Country"
      className="mb-6 shadow-lg border-gray-300"
    >
      {country.map((country) => (
        <MenuItem key={country.id} value={country.id}>
          {country.name}
        </MenuItem>
      ))}
    </TextField>
  </div>

  {/* City Dropdown */}
  <div className="mb-6">
    <TextField
      select
      fullWidth
      variant="outlined"
      value={cityId}
      onChange={(e) => setCityId(e.target.value)}
      label="Select City"
      className="mb-6 shadow-lg border-gray-300"
    >
      {city.map((city) => (
        <MenuItem key={city.id} value={city.id}>
          {city.name}
        </MenuItem>
      ))}
    </TextField>
  </div>

  {/* Zone Dropdown */}
  <div className="mb-6">
    <TextField
      select
      fullWidth
      variant="outlined"
      value={zoneId}
      onChange={(e) => setZoneId(e.target.value)}
      label="Select Zone"
      className="mb-6 shadow-lg border-gray-300"
    >
      {Zone.map((zone) => (
        <MenuItem key={zone.id} value={zone.id}>
          {zone.name}
        </MenuItem>
      ))}
    </TextField>
  </div>
  </div>




{/* Image Upload Section */}
<div className="mb-6">
  <label className="block text-gray-700 font-semibold mb-2">Upload Hotel Images</label>
  
  {/* Upload Button */}
  <div className="relative w-full max-w-md">
    <input
      id="image-upload"
      type="file"
      onChange={(e) => handleImageChange(e)}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    />
    <div className="px-4 py-3 bg-indigo-600 text-white text-center rounded-lg cursor-pointer hover:bg-indigo-700 transition duration-200">
      Click to Upload Image
    </div>
  </div>

  {/* Display Uploaded Images */}
  <div className="mt-4 flex flex-wrap gap-4">
    {images.map((img, index) => (
      <div key={index} className="relative w-24 h-24">
        <img
          src={img.image}
          alt={`Uploaded ${index}`}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
        {/* Remove Button */}
        <button
          type="button"
          onClick={() => removeImageselect(index)}
          className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 transition duration-200"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
</div>

  {/* Rating */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    label="Rating"
    placeholder="Enter rating"
    required
    type="number"
    inputProps={{
      min: 0,
      max: 5,
      step: 0.1,
    }}
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
  {/* Check-In */}
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">Check-In</label>
    <TextField
      fullWidth
      type="time"
      variant="outlined"
      value={checkInDate}
      onChange={(e) => setCheckInDate(e.target.value)}
      required
      className="shadow-sm"
    />
  </div>

  {/* Check-Out */}
  <div className="mb-6">
    <label className="block text-gray-700 font-semibold mb-2">Check-Out</label>
    <TextField
      fullWidth
      type="time"
      variant="outlined"
      value={checkOutDate}
      onChange={(e) => setCheckOutDate(e.target.value)}
      required
      className="shadow-sm"
    />
  </div>


  
  </div>

  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
  {/* Hotel Video */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={video}
    onChange={(e) => setVideo(e.target.value)}
    label="Hotel Video Link"
    placeholder="Enter hotel video link"
    required
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

  {/* Hotel Website */}
  <div className="mb-6">
  <TextField
    fullWidth
    variant="outlined"
    value={webSite}
    onChange={(e) => setWebSite(e.target.value)}
    label="Hotel Website Link"
    placeholder="Enter hotel website link"
    required
    className="shadow-sm"
    InputLabelProps={{
      className: "text-gray-700 font-semibold",
    }}
  />
</div>

</div>


  {/* <HotelPolicy policies={policies} setPolicies={setPolicies} /> */}


</div>


    {/* Right Side */}
    <div className="flex-1 "> 
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3">{/* Hotel Facilities */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
            type="button"
              onClick={togglePopup}
              className="absolute right-0 top-0 m-1 text-red-700 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter Facilit name"
              value={nameFacility}
              onChange={(e) => setNameFacility(e.target.value)}
            />
            <button
              onClick={handleAddFacility}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="mb-6 bg-white p-5">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-700">Hotel Facilities</h2>
    <button
      type="button"
      onClick={() => setFacilitiesOpen(!facilitiesOpen)} // Toggle the state to open/close
      className="text-blue-500"
    >
      {facilitiesOpen ? "▲" : "▼"} {/* Arrow toggle */}
    </button>
  </div>

  {facilitiesOpen && (
        <div>
          {/* Toggle between All and Most Used */}
          <div className="mb-4">
            <div className="flex gap-5 space-x-4">
              <button
              type="button"
                className={`text-blue-500 ${viewAll ? "font-semibold" : ""}`}
                onClick={() => setViewAll(true)}
              >
                All 
              </button>
              <button
               type="button"
                className={`text-blue-500 ${!viewAll ? "font-semibold" : ""}`}
                onClick={() => setViewAll(false)}
              >
                Most Used
              </button>
            </div>
          </div>

          {/* Render Facilities Based on View */}
          {viewAll ? (
            <div className="mb-4">
              <h2 className="text-lg font-medium">All Hotel Facilities</h2>
              <div className="space-y-2 flex flex-col">
                {facilities.map((facility) => (
                 <div key={facility.id} className="flex items-center justify-between mb-2">
                     <FormControlLabel
                    key={facility.id}
                    control={
                      <Checkbox
                        name={facility.id}
                        checked={selectedFacilities.includes(facility.id.toString())}
                        onChange={handleFacilityChange}
                      />
                    }
                    label={facility.name}
                  />
                      <div className="flex gap-2">
           
            <FaTrash
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => handleDelete(facility.id,facility.name)}
              title="Delete Facility"
            />
          </div>
                  </div>
              
                ))}
                  {/* Update Dialog */}
      <Dialog open={isUpdateDialogOpen} onClose={() => setIsUpdateDialogOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Update Facility Name</h3>
          <TextField
            label="Facility Name"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outlined"
              onClick={() => setIsUpdateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleUpdateSubmit}>
              Update
            </Button>
          </div>
        </div>
      </Dialog>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-lg font-medium">Most Used Hotel Facilities</h2>
              <div className="space-y-2 flex flex-col">
              {selectedFacilities.slice(0, 5).map((facility) => (
            <FormControlLabel
              key={facility.id}
              control={
                <Checkbox
                  name={facility.id}
                  checked={selectedFacilities.includes(facility.id)}
                  // onChange={handleFacilityChange}
                />
              }
              label={facility.name}
            />
          ))}
              </div>
            </div>
          )}
        </div>
      )}
  <Button className="mt-4" onClick={togglePopup}>+ New Hotel Facility</Button>
  
</div>


      {/* Hotel Theme */}
      {isOpenTheme && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
            type="button"
              onClick={togglePopupTheme}
              className="absolute right-0 top-0 m-1 text-red-700 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Theme</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter Theme name"
              value={nameTheme}
              onChange={(e) => setNameTheme(e.target.value)}
            />
            <button
              onClick={handleAddTheme}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="mb-6 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-700">Hotel Theme</h2>
          <button
            type="button"
            onClick={() => setThemeOpen(!themeOpen)} // Toggle the state to open/close
            className="text-blue-500"
          >
            {themeOpen ? "▲" : "▼"} {/* Arrow toggle */}
          </button>
        </div>
       
      {themeOpen && (
        <div>
          {/* Toggle between All and Most Used Themes */}
          <div className="mb-4">
            <div className="flex space-x-4">
              <button
              type="button"
                className={`text-blue-500 ${viewAllThemes ? "font-semibold" : ""}`}
                onClick={() => setViewAllThemes(true)}
              >
                All
              </button>
              <button
              type="button"
                className={`text-blue-500 ${!viewAllThemes ? "font-semibold" : ""}`}
                onClick={() => setViewAllThemes(false)}
              >
                Most Used
              </button>
            </div>
          </div>

          {/* Render Themes Based on View */}
          {viewAllThemes ? (
            <div className="mb-4">
              <h3 className="text-lg font-medium">All Themes</h3>
              <div className="space-y-2 flex flex-col">
                {theme.map((theme) => (
                  <div key={theme.id} className="flex items-center justify-between mb-2">
                        <FormControlLabel
                    key={theme.id}
                    control={
                      <Checkbox
                        name={theme.id}
                        checked={selectedTheme.includes(theme.id.toString())}
                        onChange={handleThemeChange}
                      />
                    }
                    label={theme.name}
                  />

<div className="flex gap-2">
           
           <FaTrash
             className="text-red-500 cursor-pointer hover:text-red-700"
             onClick={() => handleDeleteTheme(theme.id,theme.name)}
             title="Delete theme"
           />
         </div>
                  </div>

              
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h3 className="text-lg font-medium">Most Used Themes</h3>
              <div className="space-y-2 flex flex-col">
              {selectedTheme.slice(0, 5).map((theme) => (
            <FormControlLabel
              key={theme.id}
              control={
                <Checkbox
                  name={theme.id}
                  checked={selectedTheme.includes(theme.id)}
                  // onChange={handleFacilityChange}
                />
              }
              label={theme.name}
            />
          ))}
              </div>
            </div>
          )}
        </div>
      )}
        <Button className="mt-4" onClick={togglePopupTheme}>+ New Hotel Theme</Button>
      </div>
{/* Hotel card */}
      {isOpenCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 relative">
            <button
            type="button"
              onClick={togglePopupCard}
              className="absolute right-0 top-0 m-1 text-red-700 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter Facilit name"
              value={nameCard}
              onChange={(e) => setNameCard(e.target.value)}
            />
            <button
              onClick={handleAddCard}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}
      <div className="mb-6 bg-white p-5">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-700">Hotel Accepted Cards</h2>
    <button
      type="button"
      onClick={() => setCardOpen(!cardOpen)} // Toggle the state to open/close
      className="text-blue-500"
    >
      {cardOpen ? "▲" : "▼"} {/* Arrow toggle */}
    </button>
  </div>

  {cardOpen && (
        <div>
          {/* Toggle between All and Most Used */}
          <div className="mb-4">
            <div className="flex gap-5 space-x-4">
              <button
              type="button"
                className={`text-blue-500 ${viewAllCard ? "font-semibold" : ""}`}
                onClick={() => setViewAllCard(true)}
              >
                All 
              </button>
              <button
               type="button"
                className={`text-blue-500 ${!viewAllCard ? "font-semibold" : ""}`}
                onClick={() => setViewAllCard(false)}
              >
                Most Used
              </button>
            </div>
          </div>

          {/* Render Facilities Based on View */}
          {viewAllCard ? (
            <div className="mb-4">
              <h2 className="text-lg font-medium">All Hotel Accepted Cards</h2>
              <div className="space-y-2 flex flex-col">
                {card.map((card) => (
                   <div key={card.id} className="flex items-center justify-between mb-2">
                        <FormControlLabel
                    key={card.id}
                    control={
                      <Checkbox
                        name={card.id}
                        checked={selectedCard.includes(card.id.toString())}
                        onChange={handleCardChange}
                      />
                    }
                    label={card.card_name}
                  />
                               <div className="flex gap-2">
           
           <FaTrash
             className="text-red-500 cursor-pointer hover:text-red-700"
             onClick={() => handleDeleteCard(card.id,card.card_name)}
             title="Delete card"
           />
         </div>
                  </div>
              
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="text-lg font-medium">Most Used Hotel Card</h2>
              <div className="space-y-2 flex flex-col">
              {selectedCard.slice(0, 5).map((card) => (
            <FormControlLabel
              key={card.id}
              control={
                <Checkbox
                  name={card.id}
                  checked={selectedCard.includes(card.id)}
                  // onChange={handleFacilityChange}
                />
              }
              label={card.card_name}
            />
          ))}
              </div>
            </div>
          )}
        </div>
      )}
  <Button className="mt-4" onClick={togglePopupCard}>+ New Hotel Accepted Cards</Button>
  
</div>
</div>
 


{/* Hotel Theme */}
<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-3">
  <HotelPolicy onPoliciesChange={handlePoliciesUpdate} />
<Feature selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}/>
</div>


      {/* Feature Image */}


    {/* <Feature selectedFeatures={selectedFeatures} setSelectedFeatures={setSelectedFeatures}/> */}
    </div>

    
  </div>

  {/* Buttons */}
  <div className="flex flex-col md:flex-row justify-between gap-4">
  <button
  type="submit"
  disabled={isSubmitting}
  className={`px-6 py-3 text-white rounded-lg text-sm font-medium transition-transform transform ${
    isSubmitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
  }`}
>
  {loadingPost ? "Submitting..." : "Submit"}
</button>
    <button
      type="button"
      
      className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      Cancel
    </button>
  </div>
</form>


  </div>
  
  );
};

export default AddHotels;
