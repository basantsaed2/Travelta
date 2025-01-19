import React, { useState ,useEffect } from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment ,Switch } from "@mui/material";
import { useGet } from '../../../../../Hooks/useGet';

const AddRoomPage = ({ update, setUpdate }) => {
    const { refetch: refetchList, loading: loadingList, data: listData } = useGet({url:'https://travelta.online/agent/room/lists'});
    // const { refetch: refetchHotels, loading: loadingHotels, data: roomHotelsData } = useGet({url:'https://travelta.online/agent/room/hotel_lists'});
    const [roomTypes, setRoomTypes] = useState([])
    const [hotels, setHotels] = useState([])
    const [selectedRoomType, setSelectedRoomType] = useState('')
    const [selectedHotel, setSelectedHotel] = useState('')

    const [activeTab, setActiveTab] = useState('General Details');
    const [priceType, setPriceType] = useState('fixed');
    const [roomDetails, setRoomDetails] = useState({
        description: '',
        status: true,
        price: '',
        quantity: '',
        maxAdults: '',
        maxChildren: '',
        maxCapacity: '',
        minStay: '',
        roomTypeId: '',
        hotelId: '',
        hotelMealId: '',
        currencyId: '',
    });

     useEffect(() => {
        refetchList();
    }, [refetchList,update]);
    
    useEffect(() => {
        if (listData && listData.room_types && listData.hotels ) {
                console.log("List Data:", listData);
                setRoomTypes(listData.room_types);
                setHotels(listData.hotels);
        }
    }, [listData]); // Only run this effect when `data` changes\

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

  return (
    <div className="w-full p-6 bg-white shadow rounded">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
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
              label="Room Description"
              multiline
              rows={4}
              fullWidth
              value={roomDetails.description}
              onChange={handleChange}
              className="mb-4"
            />
        <div className="flex items-center p-4">
            <span className="mr-2 text-mainColor font-semibold">Status : </span>
            <Switch
                checked={roomDetails.status}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'status switch' }}
            />
            <span className="ml-2">{roomDetails.status ? 'Enable' : 'Disable'}</span>
        </div>

             <div className="flex space-x-4 mb-4">
             <TextField
              select
              label="Price Type"
              name="priceType"
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              fullWidth
              className="mb-4"
            >
              <MenuItem value="fixed">Fixed</MenuItem>
              <MenuItem value="variable">Variable</MenuItem>
            </TextField>
            {priceType === 'fixed' && (
              <TextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={roomDetails.price}
                onChange={handleChange}
                className="mb-4"
              />
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
                >
                {hotels.map((hotel) => (
                    <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.hotel_name}
                    </MenuItem>
                ))}
            </TextField>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={roomDetails.quantity}
                onChange={handleChange}
              />
              <TextField
                name="maxAdults"
                label="Max Adults"
                type="number"
                fullWidth
                value={roomDetails.maxAdults}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <TextField
                name="maxChildren"
                label="Max Children"
                type="number"
                fullWidth
                value={roomDetails.maxChildren}
                onChange={handleChange}
              />
              <TextField
                name="maxCapacity"
                label="Max Capacity"
                type="number"
                fullWidth
                value={roomDetails.maxCapacity}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <TextField
                name="minStay"
                label="Min Stay"
                type="number"
                fullWidth
                value={roomDetails.minStay}
                onChange={handleChange}
              />
              <TextField
                name="roomTypeId"
                label="Room Type ID"
                fullWidth
                value={roomDetails.roomTypeId}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <TextField
                name="hotelId"
                label="Hotel ID"
                fullWidth
                value={roomDetails.hotelId}
                onChange={handleChange}
              />
              <TextField
                name="hotelMealId"
                label="Hotel Meal ID"
                fullWidth
                value={roomDetails.hotelMealId}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {activeTab === 'Facilities' && (
          <div className="p-4">
            Facilities content here...
          </div>
        )}
        {activeTab === 'Markup & Taxes' && (
          <div className="p-4">
            Markup & Taxes content here...
          </div>
        )}
        {activeTab === 'Policy' && (
          <div className="p-4">
            Policy content here...
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRoomPage;
