import React, { useState ,useEffect} from 'react';
import { TextField,Button} from "@mui/material";
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import StaticLoader from '../../../../../../Components/StaticLoader';

const AddRoomAvailabilityPage =({ update, setUpdate })=>{
    const { availableId } = useParams();
    const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/room/availability/add",});
    const [roomNumber, setRoomNumber] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [availabilityList, setAvailabilityList] = useState([
          {
            roomNumber: 0, 
            fromDate: '', 
            toDate: '', 
          },
        ]);
    
    
    useEffect(() => {
        if (!loadingPost) {
                handleReset()
                setUpdate(!update)     
            }
    }, [response])

    const handleAvailabilityChange = (e, index) => {
        const { name, value } = e.target;

        setAvailabilityList((prevList) => {
            const updatedList = [...prevList];
            updatedList[index] = { ...updatedList[index], [name]: value };
            return updatedList;
        });
    };

    // Add new supplement
    const addAvailability = () => {
        setAvailabilityList((prevList) => [
            ...prevList,
            { roomNumber:0, fromDate: '', toDate: 0},
        ]);
    };

    // Remove supplement from the list
    const removeAvailability = (index) => {
        setAvailabilityList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleReset = () => {
        setRoomNumber('')
        setToDate('')
        setFromDate('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const availabilityRooms = availabilityList.map((room, index) => ({
            from: room.fromDate,
            to: room.toDate,
            quantity: room.roomNumber,
          }));
    
        const formData = new FormData();
        formData.append('room_id', availableId);
        // formData.append('rooms', JSON.stringify(availabilityRooms));
        
        // Append each room separately
        availabilityRooms.forEach((room, index) => {
            formData.append(`rooms[${index}][from]`, room.from);
            formData.append(`rooms[${index}][to]`, room.to);
            formData.append(`rooms[${index}][quantity]`, room.quantity);
        });
        
        postData(formData, 'Room Availability Success');
    };

     
    return(
        <>
        {loadingPost ? (
            <>
                   <div className="w-full h-56 flex justify-center items-center">
                          <StaticLoader />
                   </div>
            </>
            ) : (
                <form className="w-full flex flex-col gap-5 p-6" onSubmit={handleSubmit}>

                    {availabilityList.map((room, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm mb-4">
                            <div className="flex flex-col md:flex-row gap-4 mt-4">
                            <TextField
                                fullWidth
                                label="From Date"
                                name="fromDate"  // Add name attribute
                                value={room.fromDate}
                                onChange={(e) => handleAvailabilityChange(e, index)}
                                variant="outlined"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                className="w-full"
                            />
                            <TextField
                                fullWidth
                                label="To Date"
                                name="toDate"  // Add name attribute
                                value={room.toDate}
                                onChange={(e) => handleAvailabilityChange(e, index)}
                                variant="outlined"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                className="w-full"
                            />
                            <TextField
                                label="Room Numbers"
                                name="roomNumber"  // Add name attribute
                                variant="outlined"
                                fullWidth
                                required
                                value={room.roomNumber}
                                onChange={(e) => handleAvailabilityChange(e, index)}
                            />
                        </div>
                        <div className='flex gap-5'>
                            {index !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeAvailability(index)}
                                    className="remove-supplement-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                                >
                                    Remove
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={addAvailability}
                                className="add-supplement-btn bg-[#0D47A1] text-white px-4 py-2 rounded-md mt-4"
                            >
                                Add Availability
                            </button>
                        </div>

                        </div>
                    ))}

                <div className="w-full flex items-center gap-x-4">
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
    )}
    </>
)
}

export default AddRoomAvailabilityPage;