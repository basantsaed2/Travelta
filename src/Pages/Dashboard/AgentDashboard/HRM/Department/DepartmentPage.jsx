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
import { FaExchangeAlt } from "react-icons/fa";
import { TextField, MenuItem, Select, InputLabel, FormControl, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useAuth } from '../../../../../Context/Auth';
import { usePost } from '../../../../../Hooks/usePostJson';

const DepartmentPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchDepartment, loading: loadingDepartment, data: departmentData } = useGet({url:'https://travelta.online/agent/hrm/department'});
    
    const [departments, setDepartments] = useState([])
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const auth = useAuth()

    useEffect(() => {
        refetchDepartment();
    }, [refetchDepartment, refetch]);

    useEffect(() => {
        if (departmentData && departmentData) {
                console.log("Department Data:", departmentData);
                // setFinancialAccount(financialAccountData.financials);
        }
    }, [departmentData]); // Only run this effect when `data` changes\

    // Change coupon status 
    const handleChangeStaus = async (id, name, status) => {
    const response = await changeState(
            ` https://travelta.online/agent/hrm/department/status/${id}`,
            `${name} Changed Status.`,
            { status } // Pass status as an object if changeState expects an object
    );

        if (response) {
                // Update categories only if changeState succeeded
                setDepartments((prevDepartments) =>
                    prevDepartments.map((department) =>
                        department.id === id ? { ...department, status: status } : department
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
            const success = await deleteData(`https://travelta.online/agent/hrm/department/delete/${id}`, `${name} Deleted Success.`);

            if (success) {
                // Update Discounts only if changeState succeeded
                setDepartments(
                  departments.filter((department) =>
                    department.id !== id
                        )
                );
            }
    };


  const headers = ['SL', 'Department Name',"Status", "Action"];

  return (
    <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingDepartment || loadingChange || loadingDelete   ? (
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
          {/* <tbody className="w-full">
            {departments.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Departments</td>
              </tr>
            ) : (
                departments.map((department, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                    <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {index + 1}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        {department?.name|| '-'}
                    </td>
                    <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        <Switch
                                checked={department.status === 1}
                                onChange={() => {
                                    handleChangeStaus(department.id, department.name, department.status === 1 ? 0 : 1);
                                }}
                                color="primary"
                        />
                    </td>
                    <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-3">
                                <Link to={`edit/${department.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                               
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(department.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
                                 {openDelete === department.id && (
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
                                                  You will delete account {department?.name || "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(department.id, department?.name)}>
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
          </tbody> */}
        </table>
      )}
    </div>
  );
}

export default DepartmentPage;