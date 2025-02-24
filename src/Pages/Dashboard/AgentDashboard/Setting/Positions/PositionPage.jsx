import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Switch} from "@mui/material";
import {useChangeState} from '../../../../../Hooks/useChangeState';
import {useDelete} from '../../../../../Hooks/useDelete';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import { useAuth } from '../../../../../Context/Auth';
import { usePost } from '../../../../../Hooks/usePostJson';

const PositionPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchPositions, loading: loadingPositions, data:positionsData } = useGet({url:'https://travelta.online/agent/admin/position'});
    const [positions, setPositions] = useState([])
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [openView, setOpenView] = useState(null);
    const auth = useAuth()

    useEffect(() => {
        refetchPositions();
    }, [refetchPositions, refetch]);

    useEffect(() => {
        if (positionsData && positionsData.positions) {
                console.log("Position Data:", positionsData);
                setPositions(positionsData.positions);
        }
    }, [positionsData]);

    const handleOpenView = (roleId) => {
           setOpenView(roleId);
    };

    const handleCloseView = () => {
           setOpenView(null);
    };

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
    };
    const handleCloseDelete = () => {
        setOpenDelete(null);
    };

    // Delete Language
    const handleDelete = async (id, name) => {
            const success = await deleteData(`https://travelta.online/agent/admin/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                // Update Discounts only if changeState succeeded
                setPositions(
                  positions.filter((account) =>
                    account.id !== id
                        )
                );
            }
    };

  const headers = ['SL', 'Name','Perimitions',"Action"];

  return (
    <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingPositions ||loadingChange|| loadingDelete   ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <div className="w-full sm:min-w-0 block overflow-x-scroll scrollPage border-collapse">
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
                {positions.length === 0 ? (
                <tr>
                    <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not Find Positions Account</td>
                </tr>
                ) : (
                    positions.map((position, index) => ( 
                    <tr className="w-full border-b-2" key={index}>
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {index + 1}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {position?.name|| '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                onClick={() => handleOpenView(position.id)}>
                                View
                            </span>
                            {openView === position.id && (
                                    <Dialog open={true} onClose={handleCloseView} className="relative z-10">
                                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                        {/* Permissions List */}
                                        <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                        {position.perimitions.length === 0 ? (
                                            <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                    No permissions available for this role.
                                            </div>
                                        ) : (
                                            position.perimitions.map((permission, index) => {
                                                    const displayIndex = index + 1;
                                                    return (
                                                            <div
                                                                    key={index}
                                                                    className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                            >
                                                                    <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                        {displayIndex}. {permission.module} {permission.action}
                                                                    </span>
                                                            </div>
                                                    );
                                            })
                                        )}

                                        </div>
                                            {/* Dialog Footer */}
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                            type="button"
                                            onClick={handleCloseView}
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                            >
                                            Close
                                            </button>
                                        </div>

                                        </DialogPanel>
                                        </div>
                                        </div>
                                    </Dialog>
                            )}
                        </td>
                        <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <Link to={`edit/${position.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(position.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
                                    {openDelete === position.id && (
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
                                                    You will delete position {position?.name || "-"}
                                                </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(position.id, position?.name)}>
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
        </div>
      )}
    </div>
  );
}

export default PositionPage;