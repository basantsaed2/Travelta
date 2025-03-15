import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaWhatsapp, FaEdit, FaEnvelope, FaPhone, FaUserCircle, FaCopy,FaFileExcel ,FaSearch ,FaGlobe ,FaCity,FaFilter } from "react-icons/fa";
import { Link} from 'react-router-dom';
import {useChangeState} from '../../../../../Hooks/useChangeState';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { Switch} from "@mui/material";

const AdminAccountPage = ({ update, setUpdate }) => {
    const { refetch: refetchAdminAccount, loading: loadingAdminAccount, data:adminAccountData } = useGet({url:'https://travelta.online/agent/admin'});
    const [adminAccount, setAdminAccount] = useState([])
    const [selectedRole, setSelectedRole] = useState('')
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [copiedPhone, setCopiedPhone] = useState(null);
    const auth = useAuth()

    //Pagination State
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetchAdminAccount();
    }, [refetchAdminAccount, update]);

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
    
    // Get unique country & city lists
    const uniqueRole = [...new Set(adminAccount.map(admin => admin?.position?.name).filter(Boolean))];
    
    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterRole = (e) => setSelectedRole(e.target.value);
    
    const filteredAdmin = adminAccount.filter((admin) => {
    const matchesSearch =
        admin?.name?.toLowerCase().includes(searchText) ||
        admin?.email?.toLowerCase().includes(searchText) ||
        admin?.phone?.includes(searchText);
    
        const roleMatch = selectedRole
        ? admin?.position?.name === selectedRole // ✅ Directly compare the name
            : true;
        
        return matchesSearch && roleMatch;
    });  
    
     // Copy phone number to clipboard
     const copyToClipboard = (phone) => {
        navigator.clipboard.writeText(phone);
        setCopiedPhone(phone);
        setTimeout(() => setCopiedPhone(null), 2000);
      };
    
       // Export filtered data to Excel
       const exportToExcel = () => {
         const worksheet = XLSX.utils.json_to_sheet(
            adminAccount.map((admin, index) => ({
             SL: index + 1,
             Name: admin.name || "-",
             Email: admin.email || "-",
             Phone: admin.phone || "-",
             Role: admin.position?.name || "-",
             Status: admin.status=== 1?"Active":"UnActive" || "-",
           }))
         );
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Accounts");
         XLSX.writeFile(workbook, "Admin Accounts.xlsx");
       };

      // Pagination Logic
      const totalPages = Math.ceil(filteredAdmin.length / rowsPerPage);
      const paginatedData = filteredAdmin.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };
     
      const headers = ['Name','Email','Phone',"Role","Status","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingAdminAccount || loadingChange || loadingDelete ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
              <div className="w-full sm:min-w-0">

              {/* Search & Filter Section */}
                  <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
                    {/* Search Input */}
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
                      <FaSearch className="text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search by name or phone or email..."
                        value={searchText}
                        onChange={handleSearch}
                        className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder-gray-500"
                      />
                    </div>
            
                    {/* Filter by Country */}
                    <div className="relative w-full md:w-[240px]">
                      <select
                        onChange={handleFilterRole}
                        value={selectedRole}
                        className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                      >
                        <option value="">Filter by Role</option>
                        {uniqueRole.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <FaGlobe className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                    </div>
                        
                    {/* Export to Excel Button */}
                    <button
                      onClick={exportToExcel}
                      className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
                    >
                      <FaFileExcel className="w-5 h-5" />
                      Export to Excel
                    </button>
                  </div>

             {/* Rows per Page */}
             <div className="flex items-center space-x-2 mb-5">
              <label className="text-gray-700 font-medium">Rows per page:</label>
              <div className="w-full md:w-[120px]">
                <select
                  onChange={handleRowsChange}
                  value={rowsPerPage}
                  className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
                >
                  <option value="5">5 rows</option>
                  <option value="10">10 rows</option>
                  <option value="20">20 rows</option>
                  <option value="30">30 rows</option>
                  <option value="50">50 rows</option>
                </select>
              </div>
            </div>

            <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
              <table className="w-full min-w-[600px]">
                    {/* Table Header */}
                    <thead className="bg-gray-200 text-gray-700">
                      <tr className="border-t-2 border-b-2">
                        <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                          SL
                        </th>
                        {headers.map((name, index) => (
                          <th
                            key={index}
                            className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>
      
                    {/* Table Body */}
                    <tbody>
                        {paginatedData.length === 0 ? ( // 👈 Use filteredadmins
                        <tr>
                            <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                            No Admin Account Found
                            </td>
                        </tr>
                        ) : (
                        paginatedData.map((admin, index) => ( // 👈 Use filteredadmins
                            <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                            <td className="text-center py-2 text-gray-600">{index + 1}</td>
                            <td className="text-center py-2 text-gray-600 relative">
                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                {admin?.name || "-"}
                                {admin?.name && admin.name.length > 15 && (
                                    <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                    {admin.name}
                                    </span>
                                )}
                                </span>
                            </td>
                            <td className="text-center py-2 text-gray-600 relative">
                                <a
                                href={`mailto:${admin?.email}`}
                                className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                                >
                                {admin?.email?.length > 15 ? admin?.email.slice(0, 15) + "..." : admin?.email || "-"}
                                <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1">
                                    {admin?.email}
                                </span>
                                </a>
                            </td>
                            <td className="text-center py-2 text-gray-600">
                                {admin?.phone ? (
                                <div className="flex items-center justify-center gap-1">
                                    <span>{admin.phone}</span>
                                    <FaCopy
                                    className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                    onClick={() => copyToClipboard(admin.phone)}
                                    />
                                </div>
                                ) : (
                                "-"
                                )}
                                {copiedPhone === admin.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                            </td>
                            <td className="text-center py-2 text-gray-600">{admin?.position?.name || "-"}</td>                           
                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                <Switch
                                checked={admin.status === 1}
                                onChange={() => {
                                    handleChangeStaus(admin.id, admin.name, admin.status === 1 ? 0 : 1);
                                }}
                                color="primary"
                                />
                            </td>                     
                            <td className="text-center py-2">
                                <div className="flex items-center justify-center gap-1">
                                <Link to={`edit/${admin.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                    type="button"
                                    onClick={() => handleOpenDelete(admin.id)}
                                >
                                    <MdDelete color='#D01025' size="24"/>
                                </button>
                                
                                {openDelete === admin.id && (
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
                                                You will delete admin {admin?.name || "-"}
                                                </div>
                                            </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(admin.id, admin?.agent)}>
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
            >
              Next
            </button>
          </div>



              </div>
            )}
    </div>
  );
}
 export default AdminAccountPage;

