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

const AdminAccountPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchAdminAccount, loading: loadingAdminAccount, data:adminAccountData } = useGet({url:'https://travelta.online/agent/admin'});
    const [adminAccount, setAdminAccount] = useState([])
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const auth = useAuth()

    useEffect(() => {
        refetchAdminAccount();
    }, [refetchAdminAccount, refetch]);

    useEffect(() => {
        if (adminAccountData && adminAccountData.admins) {
                console.log("Admin Account Data:", adminAccountData);
                setAdminAccount(adminAccountData.admins);
        }
    }, [adminAccountData]);

     // Change coupon status 
     const handleChangeStaus = async (id, name, status) => {
        const response = await changeState(
                ` https://travelta.online/agent/admin/status/${id}`,
                `${name} Changed Status.`,
                { status } // Pass status as an object if changeState expects an object
        );
        if (response) {
            // Update categories only if changeState succeeded
            setAdminAccount((prevAdminAccount) =>
                prevAdminAccount.map((account) =>
                    account.id === id ? { ...account, status: status } : account
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
            const success = await deleteData(`https://travelta.online/agent/admin/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                // Update Discounts only if changeState succeeded
                setAdminAccount(
                  adminAccount.filter((account) =>
                    account.id !== id
                        )
                );
            }
    };

  const headers = ['SL', 'Name','Email','Phone',"Role","Status","Action"];

  return (
    <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingAdminAccount ||loadingChange|| loadingDelete   ? (
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
                {adminAccount.length === 0 ? (
                <tr>
                    <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not Find Admin Account</td>
                </tr>
                ) : (
                    adminAccount.map((account, index) => ( 
                    <tr className="w-full border-b-2" key={index}>
                        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {index + 1}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {account?.name|| '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {account?.email || '0'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {account?.phone || '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            {account?.position?.name || '-'}
                        </td>
                        <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            <Switch
                                    checked={account.status === 1}
                                    onChange={() => {
                                        handleChangeStaus(account.id, account.name, account.status === 1 ? 0 : 1);
                                    }}
                                    color="primary"
                            />
                        </td>
                        <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <Link to={`edit/${account.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(account.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
                                    {openDelete === account.id && (
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
                                                    You will delete account admin {account?.name || "-"}
                                                </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(account.id, account?.name)}>
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

export default AdminAccountPage;