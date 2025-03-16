// import React, { useEffect,useState } from 'react';
// import StaticLoader from '../../../../../Components/StaticLoader';
// import { useGet } from '../../../../../Hooks/useGet';
// import { Switch} from "@mui/material";
// import {useChangeState} from '../../../../../Hooks/useChangeState';
// import {useDelete} from '../../../../../Hooks/useDelete';
// import { Link } from 'react-router-dom';
// import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
// import { MdDelete } from "react-icons/md";
// import { PiWarningCircle } from "react-icons/pi";
// import { FaEdit } from "react-icons/fa";
// import { useAuth } from '../../../../../Context/Auth';
// import { usePost } from '../../../../../Hooks/usePostJson';

// const PositionPage = ({ refetch, setUpdate }) => {
//     const { refetch: refetchPositions, loading: loadingPositions, data:positionsData } = useGet({url:'https://travelta.online/agent/admin/position'});
//     const [positions, setPositions] = useState([])
//     const { changeState, loadingChange, responseChange } = useChangeState();
//     const { deleteData, loadingDelete, responseDelete } = useDelete();
//     const [openDelete, setOpenDelete] = useState(null);
//     const [openView, setOpenView] = useState(null);
//     const auth = useAuth()

//     useEffect(() => {
//         refetchPositions();
//     }, [refetchPositions, refetch]);

//     useEffect(() => {
//         if (positionsData && positionsData.positions) {
//                 console.log("Position Data:", positionsData);
//                 setPositions(positionsData.positions);
//         }
//     }, [positionsData]);

//     const handleOpenView = (roleId) => {
//            setOpenView(roleId);
//     };

//     const handleCloseView = () => {
//            setOpenView(null);
//     };

//     const handleOpenDelete = (item) => {
//         setOpenDelete(item);
//     };
//     const handleCloseDelete = () => {
//         setOpenDelete(null);
//     };

//     // Delete Language
//     const handleDelete = async (id, name) => {
//             const success = await deleteData(`https://travelta.online/agent/admin/delete/${id}`, `${name} Deleted Success.`);

//             if (success) {
//                 // Update Discounts only if changeState succeeded
//                 setPositions(
//                   positions.filter((account) =>
//                     account.id !== id
//                         )
//                 );
//             }
//     };

//   const headers = ['SL', 'Name','Perimitions',"Action"];

//   return (
//     <div className="w-full flex items-start justify-start overflow-x-scroll scrollSection">
//       {loadingPositions ||loadingChange|| loadingDelete   ? (
//         <div className="w-full h-56 flex justify-center items-center">
//           <StaticLoader />
//         </div>
//       ) : (
//         <div className="w-full sm:min-w-0 block overflow-x-scroll scrollPage border-collapse">
//             <table className="w-full sm:min-w-0">
//                 <thead className="w-full">
//                 <tr className="w-full border-b-2">
//                 {headers.map((name, index) => (
//                     <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
//                     {name}
//                     </th>
//                 ))}
//                 </tr>
//             </thead>
//             <tbody className="w-full">
//                 {positions.length === 0 ? (
//                 <tr>
//                     <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not Find Positions Account</td>
//                 </tr>
//                 ) : (
//                     positions.map((position, index) => ( 
//                     <tr className="w-full border-b-2" key={index}>
//                         <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
//                             {index + 1}
//                         </td>
//                         <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
//                             {position?.name|| '-'}
//                         </td>
                        // <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                        //     <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                        //         onClick={() => handleOpenView(position.id)}>
                        //         View
                        //     </span>
                        //     {openView === position.id && (
                        //             <Dialog open={true} onClose={handleCloseView} className="relative z-10">
                        //                 <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        //                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        //                 <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        //                 <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                        //                 {/* Permissions List */}
                        //                 <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                        //                 {position.perimitions.length === 0 ? (
                        //                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                        //                             No permissions available for this role.
                        //                     </div>
                        //                 ) : (
                        //                     position.perimitions.map((permission, index) => {
                        //                             const displayIndex = index + 1;
                        //                             return (
                        //                                     <div
                        //                                             key={index}
                        //                                             className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                        //                                     >
                        //                                             <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                        //                                                 {displayIndex}. {permission.module} {permission.action}
                        //                                             </span>
                        //                                     </div>
                        //                             );
                        //                     })
                        //                 )}

                        //                 </div>
                        //                     {/* Dialog Footer */}
                        //                     <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        //                     <button
                        //                     type="button"
                        //                     onClick={handleCloseView}
                        //                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                        //                     >
                        //                     Close
                        //                     </button>
                        //                 </div>

                        //                 </DialogPanel>
                        //                 </div>
                        //                 </div>
                        //             </Dialog>
                        //     )}
                        // </td>
//                         <td className="px-4 py-3 text-center">
//                             <div className="flex items-center justify-center gap-3">
//                                 <Link to={`edit/${position.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
//                                 <button
//                                     type="button"
//                                     onClick={() => handleOpenDelete(position.id)}
//                                 >
//                                     <MdDelete color='#D01025' size="24"/>
//                                 </button>
//                                     {openDelete === position.id && (
//                                     <Dialog
//                                         open={true}
//                                         onClose={handleCloseDelete}
//                                         className="relative z-10"
//                                     >
//                                         <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                                         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                                             <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                                             <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                                 <PiWarningCircle color='#0D47A1'
//                                                 size="60"
//                                                 />
//                                                 <div className="flex items-center">
//                                                 <div className="mt-2 text-center">
//                                                     You will delete position {position?.name || "-"}
//                                                 </div>
//                                                 </div>
//                                             </div>
//                                             <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                                 <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(position.id, position?.name)}>
//                                                 Delete
//                                                 </button>
            
//                                                 <button
//                                                 type="button"
//                                                 data-autofocus
//                                                 onClick={handleCloseDelete}
//                                                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
//                                                 >
//                                                 Cancel
//                                                 </button>
//                                             </div>
//                                             </DialogPanel>
//                                         </div>
//                                         </div>
//                                     </Dialog>
//                                     )}
//                             </div>
//                         </td>
//                     </tr>
//                 ))

//                 )}
//             </tbody>
//             </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PositionPage;


import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit, FaEnvelope,FaFileExcel ,FaSearch ,FaGlobe ,FaFilter } from "react-icons/fa";
import { Link} from 'react-router-dom';
import {useChangeState} from '../../../../../Hooks/useChangeState';
import * as XLSX from "xlsx";

const PositionPage = ({ update, setUpdate }) => {
    const { refetch: refetchPositions, loading: loadingPositions, data:positionsData } = useGet({url:'https://travelta.online/agent/admin/position'});
    const [positions, setPositions] = useState([])
    const { changeState, loadingChange, responseChange } = useChangeState();
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [openView, setOpenView] = useState(null);

    const [searchText, setSearchText] = useState("");
    const [selectedRoleName, setSelectedRoleName] = useState("");
    const [selectedModule, setSelectedModule] = useState("");

    //Pagination State
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetchPositions();
    }, [refetchPositions, update]);

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
        const success = await deleteData(`https://travelta.online/agent/admin/position/delete/${id}`, `${name} Deleted Success.`);

        if (success) {
            // Update Discounts only if changeState succeeded
            setPositions(
                positions.filter((account) =>
                account.id !== id
                    )
            );
        }
    };

    // Get unique lists
    const uniqueRoleName = [...new Set(positions.map(position => position.name).filter(Boolean))];
    const uniqueModule = [...new Set(
        positions
          ?.flatMap(position => position.perimitions || []) // Flatten perimitions from all positions
          .map(permission => permission.module)
          .filter(Boolean) // Remove undefined or empty values
      )];
                
    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterRole = (e) => setSelectedRoleName(e.target.value);
    const handleFilterModule = (e) => setSelectedModule(e.target.value);

    const filteredRole = positions.filter((role) => {
        const matchesSearch =
          role?.name?.toLowerCase().includes(searchText.toLowerCase()) || // Check role name
          role?.perimitions?.some(permission => permission.module.toLowerCase().includes(searchText.toLowerCase())); // Check modules
      
        const roleMatch = selectedRoleName ? role.name === selectedRoleName : true;
      
        const moduleMatch = selectedModule 
          ? role?.perimitions?.some(permission => permission.module === selectedModule) 
          : true;
      
        return matchesSearch && roleMatch && moduleMatch;
      });      
       
    // Export filtered data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
        positions.map((role, index) => ({
            SL: index + 1,
            Role_Name: role.name || "-",
            Perimitions:role.perimitions
            ? role.perimitions.map(permission => permission.module).join(", ")
            : "-", 
        }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Roles");
        XLSX.writeFile(workbook, "Roles.xlsx");
    };

      // Pagination Logic
      const totalPages = Math.ceil(filteredRole.length / rowsPerPage);
      const paginatedData = filteredRole.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };
     
      const headers = ['Role Name','Perimitions',"Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingPositions || loadingDelete ? (
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
                      placeholder="Search by role name or module..."
                      value={searchText}
                      onChange={handleSearch}
                      className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                    />
                  </div>

                   {/* Filter by Role Name */}
                   <div className="relative w-full md:w-[240px]">
                    <select
                      onChange={handleFilterRole}
                      value={selectedRoleName}
                      className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Filter by Role Name</option>
                      {uniqueRoleName.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                    {/* <TbTaxEuro className="absolute right-3 top-3 text-gray-500 pointer-events-none" /> */}
                  </div>
          
                  {/* Filter by Country */}
                  <div className="relative w-full md:w-[240px]">
                    <select
                      onChange={handleFilterModule}
                      value={selectedModule}
                      className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Filter by Module</option>
                      {uniqueModule.map((module, index) => (
                        <option key={index} value={module}>
                          {module}
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
        
                     <tbody>
                     {paginatedData.length === 0 ? (
                          <tr>
                          <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                            No Roles Found
                          </td>
                        </tr>
                      ) : (
                        paginatedData.map((role, index) => ( // 👈 Use filteredleads
                          <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                          >
                            <td className="text-center py-2 text-gray-600">{index + 1}</td>
                            <td className="text-center py-2 text-gray-600">{role?.name || "-"}</td>
                            <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                            <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                onClick={() => handleOpenView(role.id)}>
                                View
                            </span>
                            {openView === role.id && (
                              <Dialog open={true} onClose={handleCloseView} className="relative z-10">
                              {/* Backdrop */}
                              <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
                            
                              {/* Centered Modal */}
                              <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
                                <DialogPanel className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg transform transition-all sm:p-6 p-4">
                                  
                                  {/* Title */}
                                  <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                                    Role Permissions
                                  </h2>
                            
                                  {/* Permissions List */}
                                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4 px-4">
                                    {role.perimitions.length === 0 ? (
                                      <div className="w-full text-center text-lg font-semibold text-gray-500 col-span-full">
                                        No permissions available for this role.
                                      </div>
                                    ) : (
                                      role.perimitions.map((permission, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-md py-3 px-4 rounded-lg"
                                        >
                                          <span className="text-mainColor font-medium text-lg capitalize">
                                            {index + 1}. {permission.module} - {permission.action}
                                          </span>
                                        </div>
                                      ))
                                    )}
                                  </div>
                            
                                  {/* Dialog Footer */}
                                  <div className="flex justify-end mt-6">
                                    <button
                                      type="button"
                                      onClick={handleCloseView}
                                      className="bg-mainColor hover:bg-mainColor-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </DialogPanel>
                              </div>
                            </Dialog>
                            
                            )}
                        </td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center gap-1">
                              <Link to={`edit/${role.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(role.id)}
                                >
                                  <MdDelete color='#D01025' size="24"/>
                                </button>
                 
                                {openDelete === role.id && (
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
                                                You will delete role {role?.name || "-"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(role.id, role?.name)}>
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

export default PositionPage;
