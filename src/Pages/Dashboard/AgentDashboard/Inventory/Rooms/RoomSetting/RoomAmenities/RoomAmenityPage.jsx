import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../../../Components/StaticLoader';
import { useGet } from '../../../../../../../Hooks/useGet';
import { Switch} from "@mui/material";
import {useChangeState} from '../../../../../../../Hooks/useChangeState';
import {useDelete} from '../../../../../../../Hooks/useDelete';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import TitlePage from '../../../../../../../Components/TitlePage';
import AddButton from '../../../../../../../Components/Buttons/AddButton';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const RoomAmenityPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchRoomAmenity, loading: loadingRoomAmenity, data: roomAmenityData } = useGet({url:'https://travelta.online/agent/room/settings/amenity'});
    const [roomAmenity, setRoomAmenity] = useState([])
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);

    useEffect(() => {
        refetchRoomAmenity();
    }, [refetchRoomAmenity, refetch]);

    useEffect(() => {
        if (roomAmenityData && roomAmenityData.room_amenity) {
                console.log("Room Amenity Data:", roomAmenityData);
                setRoomAmenity(roomAmenityData.room_amenity);
        }
    }, [roomAmenityData]); // Only run this effect when `data` changes\

    // Change coupon status 
    const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
            ` https://travelta.online/agent/room/settings/amenity/status/${id}`,
            `${name} Changed Status.`,
            { status } // Pass status as an object if changeState expects an object
    );

        if (response) {
                // Update categories only if changeState succeeded
                setRoomAmenity((prevRoomAmenity) =>
                    prevRoomAmenity.map((room) =>
                        room.id === id ? { ...room, status: status } : room
                    )
                );
        }

    };

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
    };
    const handleCloseDelete = () => {
        setOpenDelete(null);
    };

    // Delete Language
    const handleDelete = async (id, name) => {
            const success = await deleteData(`https://travelta.online/agent/room/settings/amenity/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                // Update Discounts only if changeState succeeded
                setRoomAmenity(
                  roomAmenity.filter((room) =>
                    room.id !== id
                        )
                );
            }
    };

  const headers = ['SL', 'Name',"Included","Status", "Action"];

  return (
    <div className="w-full flex flex-col items-start justify-start overflow-x-scroll scrollSection">
        <div className='w-full flex justify-between items-center mb-6'>
            <TitlePage text="Room Amenity" />
            <Link to='add_amenity'>
                <AddButton />
            </Link>
        </div>
      {loadingRoomAmenity || loadingChange || loadingDelete   ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              {headers.map((name, index) => (
                <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {roomAmenity.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Room Amenity</td>
              </tr>
            ) : (
                roomAmenity.map((room, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {room?.name|| '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <div className="flex justify-center items-center gap-2">
                        {room?.selected === 'yes' ? (
                        <>
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-green-500">True</span>
                        </>
                        ) : (
                        <>
                            <FaTimesCircle className="text-red-500" />
                            <span className="text-red-500">False</span>
                        </>
                        )}
                    </div>
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        <Switch
                                checked={room.status === 1}
                                onChange={() => {
                                    handleChangeStaus(room.id, room.name, room.status === 1 ? 0 : 1);
                                }}
                                color="primary"
                        />
                    </td>
                    <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                                <Link to={`edit_amenity/${room.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(room.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
                                 {openDelete === room.id && (
                                    <Dialog
                                      open={true}
                                      onClose={handleCloseDelete}
                                      className="relative z-10"
                                    >
                                      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                              <PiWarningCircle color='#0D47A1'
                                              size="60"
                                              />
                                              <div className="flex items-center">
                                                <div className="mt-2 text-center">
                                                  You will delete account {room?.name || "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(room.id, room?.name)}>
                                                Delete
                                              </button>
            
                                              <button
                                                type="button"
                                                data-autofocus
                                                onClick={handleCloseDelete}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </DialogPanel>
                                        </div>
                                      </div>
                                    </Dialog>
                                  )}
                        </div>
                    </td>
                </tr>
              ))

            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RoomAmenityPage;