import React, { useState, useEffect ,useRef } from "react";
import { TextField, MenuItem, Button, Switch ,InputAdornment, IconButton  } from "@mui/material";
import { usePost } from '../../../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../../../Hooks/useGet';
import { IoMdPersonAdd } from "react-icons/io";
import { IoCloudUpload } from "react-icons/io5";
import StaticLoader from '../../../../../../../Components/StaticLoader';
import { useNavigate, useParams } from 'react-router-dom';

const EditRoomExtraPage = ({ update, setUpdate }) => {
    const { roomExtraId } = useParams();
    const { refetch: refetchExtraSelected, loading: loadingExtraSelected, data: dataExtraSelected } = useGet({ url:`https://travelta.online/agent/room/settings/extra/item/${roomExtraId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/room/settings/extra/update/${roomExtraId}` });
    const { refetch: refetchRoomExtra, loading: loadingRoomExtra, data: roomExtraData } = useGet({url:'https://travelta.online/agent/room/settings/extra'});
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState("");
    const ImageRef = useRef();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [logoFile, setLogoFile] = useState(null);
    const [logoName, setLogoName] = useState("");
    const [status, setStatus] = useState(0);

    useEffect(() => {
        refetchRoomExtra();
        refetchExtraSelected();
    }, [refetchRoomExtra,refetchExtraSelected, update]);

    useEffect(() => {
            if (dataExtraSelected && dataExtraSelected.room_extra) {
                const extra = dataExtraSelected.room_extra;
                setName(extra.name || '')
                setPrice(extra.price || 0)
                setSelectedHotel(extra.hotel_id || '')
                setLogoName(extra.thumbnail || '')
                setLogoFile(extra.thumbnail_link || '')
                setStatus(extra.status || 0)
            }
            console.log('room extra', dataExtraSelected)
    }, [dataExtraSelected]); // Only run this effect when `data` changes

    useEffect(() => {
        if (roomExtraData && roomExtraData.hotels) {
                console.log("Room Extra Data:", roomExtraData);
                setHotels(roomExtraData.hotels);
        }
    }, [roomExtraData]); 


    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
               setLogoFile(file);
               setLogoName(file.name);
        }
    }; 
    const handleImageClick = (ref) => {
        if (ref.current) {
               ref.current.click();
        }
    }; 
   
    const handleReset = () => {
        setName('');
        setPrice('')
        setSelectedHotel('')
        setLogoFile(null);
        setLogoName('')
        setStatus(0)
    };

    useEffect(() => {
        if (!loadingPost) {
            handleReset();
            setUpdate(!update);
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            auth.toastError('Please Enter Name');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('hotel_id', selectedHotel);
        formData.append('thumbnail', logoFile);
        formData.append('status', status);

        postData(formData, 'Room Extra Updated Success');
    };
    
    return (
        <>
        {(loadingPost || loadingExtraSelected || loadingRoomExtra)? (
               <div className="w-full h-56 flex justify-center items-center">
                      <StaticLoader />
               </div>
        ) : (
        <>
        <form
          className="w-full flex flex-col gap-5 p-6"
          onSubmit={handleSubmit}
          >
          <div
            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
          >
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
              label="Extra Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
            <TextField
              label="Extra Price"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
              />
          </div>
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
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
          <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <input
                    type="file"
                    ref={ImageRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
            <div className="w-full flex flex-col items-start justify-center">
                <TextField
                    label="Upload Thumbnail"
                    variant="outlined"
                    fullWidth
                    value={logoName}
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
                    className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                />
            </div>
        </div>
          <div className="sm:w-full lg:w-[30%] flex items-center ml-5 mt-2">
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
       </>
        )}
        </>
    );
};

export default EditRoomExtraPage;
