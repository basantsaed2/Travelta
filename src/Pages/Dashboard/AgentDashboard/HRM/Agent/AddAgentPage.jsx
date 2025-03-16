// import React, { useState, useEffect } from "react";
// import { TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
// import { usePost } from '../../../../../Hooks/usePostJson';
// import { useGet } from '../../../../../Hooks/useGet';
// import { useNavigate } from 'react-router-dom';
// import StaticLoader from '../../../../../Components/StaticLoader';

// const AddAgentPage = ({ update, setUpdate }) => {
    // const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/hrm/agent/add' });
    // const { refetch: refetchAgentList, loading: loadingAgentList, data: agentListData } = useGet({url:'https://travelta.online/agent/hrm/agent'});
    // const [departments, setDepartments] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [filteredEmployees, setFilteredEmployees] = useState([]);
    // const [selectedDepartment, setSelectedDepartment] = useState("");
    // const [selectedEmployee, setSelectedEmployee] = useState(null);
    // const [name, setName] = useState("");
    // const [password, setPassword] = useState("");
    // const navigate = useNavigate();

    // useEffect(() => {
    //     refetchAgentList();
    // }, [refetchAgentList, update]);

    // useEffect(() => {
    //     if (agentListData && agentListData.departments && agentListData.employees) {
    //         setDepartments(agentListData.departments);
    //         setEmployees(agentListData.employees);
    //         setFilteredEmployees(agentListData.employees);
    //     }
    // }, [agentListData]);

    // const handleReset = () => {
    //     setName('');
    //     setPassword('');
    //     setSelectedEmployee(null);
    // };

    // const handleGoBack = () => {
    //     navigate(-1, { replace: true });
    // };

//     useEffect(() => {
//         if (!loadingPost) {
//             handleReset();
//             setUpdate(!update);
//         }
//     }, [response]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!name || !password || !selectedEmployee) {
    //         alert('Please complete all fields and select an employee.');
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append('user_name', name);
    //     formData.append('password', password);
    //     formData.append('employee_id', selectedEmployee);
    //     postData(formData, 'Agency Added Success');
    // };

    // const handleDepartmentChange = (event) => {
    //     const departmentId = event.target.value;
    //     setSelectedDepartment(departmentId);
    //     setFilteredEmployees(employees.filter(emp => emp.department_id === departmentId));
    // };

    // const handleSearch = (event) => {
    //     const query = event.target.value.toLowerCase();
    //     const filtered = employees.filter(emp =>
    //         emp.name.toLowerCase().includes(query) || emp.phone.includes(query)
    //     );
    //     setFilteredEmployees(filtered);
    //     if (filtered.length > 0) {
    //         setSelectedDepartment(filtered[0].department_id);
    //     }
    // };

//     return (
//         <>
//             {(loadingPost || loadingAgentList) ? (
//                 <div className="w-full h-56 flex justify-center items-center">
//                     <StaticLoader />
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col gap-5">
//                     <div className="flex gap-4 items-center justify-between">
                    // <TextField
                    //     label="Search by Name or Phone"
                    //     variant="outlined"
                    //     fullWidth
                    //     onChange={handleSearch}
                    // />
//                     <TextField
//                         select
//                         label="Search by Department"
//                         variant="outlined"
//                         fullWidth
//                         value={selectedDepartment}
//                         onChange={handleDepartmentChange}
//                     >
//                         {departments.map((dept) => (
//                             <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
//                         ))}
//                     </TextField>
//                 </div>
//                     <TableContainer component={Paper} elevation={3}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell><strong>Name</strong></TableCell>
//                                     <TableCell><strong>Phone</strong></TableCell>
//                                     <TableCell><strong>Department</strong></TableCell>
//                                     <TableCell><strong>Action</strong></TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredEmployees.length > 0 ? (
//                                     filteredEmployees.map((emp) => (
//                                         <TableRow
//                                             key={emp.id}
//                                             style={{ backgroundColor: selectedEmployee === emp.id ? "#d1e7fd" : "white", cursor: "pointer" }}
//                                         >
//                                             <TableCell>{emp.name}</TableCell>
//                                             <TableCell>{emp.phone}</TableCell>
//                                             <TableCell>{departments.find(dept => dept.id === emp.department_id)?.name || "N/A"}</TableCell>
//                                             <TableCell>
//                                                 <Button
//                                                     variant="contained"
//                                                     onClick={() => setSelectedEmployee(emp.id)}
//                                                     style={{ backgroundColor: selectedEmployee === emp.id ? "#1976D2" : "gray", color: "white" }}
//                                                 >
//                                                     Select
//                                                 </Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={4} style={{ textAlign: "center", fontStyle: "italic" }}>No employees found</TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
                    // {selectedEmployee && (
                    //     <div className="flex flex-col gap-4">
                    //         <Typography variant="h6" gutterBottom>
                    //                 Add Credentials for Selected Employee
                    //         </Typography>
                    //         <div className="flex gap-4 items-center justify-between">
                    //         <TextField
                    //             label="Username"
                    //             variant="outlined"
                    //             fullWidth
                    //             required
                    //             value={name}
                    //             onChange={(e) => setName(e.target.value)}
                    //         />
                    //         <TextField
                    //             label="Password"
                    //             variant="outlined"
                    //             type="password"
                    //             fullWidth
                    //             required
                    //             value={password}
                    //             onChange={(e) => setPassword(e.target.value)}
                    //         />
                    //         </div>
                    //     </div>
                    // )}
                    // <div className="flex gap-x-4">
                    //     <div className="">
                    //         <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
                    //     </div>                        
                    //     <Button type="submit" variant="contained" color="primary">Submit</Button>
                    // </div>
//                 </form>
//             )}
//         </>
//     );
// };

// export default AddAgentPage;



import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaWhatsapp, FaEdit,FaCopy,FaFileExcel ,FaSearch ,FaGlobe ,FaCity,FaFilter } from "react-icons/fa";
import { Link} from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { CiFilter } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../../../../Hooks/usePostJson';
import { TextField, MenuItem, Button, InputAdornment, IconButton, Autocomplete} from "@mui/material";

const AddAgentPage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/hrm/agent/add' });
    const { refetch: refetchAgentList, loading: loadingAgentList, data: agentListData } = useGet({url:'https://travelta.online/agent/hrm/agent'});
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [copiedPhone, setCopiedPhone] = useState(null);
    const auth = useAuth()

    useEffect(() => {
        refetchAgentList();
    }, [refetchAgentList, update]);

    useEffect(() => {
        if (agentListData && agentListData.departments && agentListData.employees) {
            setDepartments(agentListData.departments);
            setEmployees(agentListData.employees);
            setFilteredEmployees(agentListData.employees);
        }
    }, [agentListData]);

       //Pagination State
       const [rowsPerPage, setRowsPerPage] = useState(5);
       const [currentPage, setCurrentPage] = useState(1);

    const handleReset = () => {
        setName('');
        setPassword('');
        setSelectedEmployee(null);
        setSelectedDepartment('')
        setFilteredEmployees(employees)
    };

    useEffect(() => {
         if (!loadingPost) {
             if (response) {
             navigate(-1); // Navigate back only when the response is successful
             }
         }
         }, [loadingPost, response, navigate]);
    const handleDepartmentChange = (event, newValue) => {
        const departmentId = newValue ? newValue.id : "";
        setSelectedDepartment(departmentId);
    
        if (departmentId === "") {
            // Show all employees if no department is selected
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(employees.filter(emp => emp.department_id === departmentId));
        }
    };
    
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchText(query);
    
        if (query === "" && selectedDepartment === "") {
            // Show all employees when both department and search text are empty
            setFilteredEmployees(employees);
            return;
        }
    
        let filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(query) || emp.phone.includes(query)
        );
    
        if (selectedDepartment) {
            filtered = filtered.filter(emp => emp.department_id === selectedDepartment);
        }
    
        setFilteredEmployees(filtered);
    };
    
        // Copy phone number to clipboard
        const copyToClipboard = (phone) => {
            navigator.clipboard.writeText(phone);
            setCopiedPhone(phone);
            setTimeout(() => setCopiedPhone(null), 2000);
        };

        
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('user_name', name);
        formData.append('password', password);
        formData.append('employee_id', selectedEmployee);
        postData(formData, 'Agency Added Success');
    };

      // Pagination Logic
      const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
      const paginatedData = filteredEmployees.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

      const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
      const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
      const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when rows per page changes
      };
     
      const headers = ['Name', 'Email',"Phone","Department","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingAgentList || loadingPost ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
              <div className="w-full sm:min-w-0">

                {selectedEmployee && (
                    <div className=" bg-white shadow-lg rounded-xl p-6 border space-y-3 border-gray-200 mb-3">
                        <div className='text-bold text-lg md:text-xl'>
                                <h1>Add Credentials for Selected Employee</h1>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <div className="flex gap-x-4">
                     <div className="w-full flex items-center gap-x-4">
                                <div className="">
                                    <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
                                </div>
                                <div className="">
                                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="bg-mainColor hover:bg-blue-600 text-white"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loadingPost || !name } // Ensure button is disabled if no currency is selected
                                >
                                {loadingPost ? "Submitting..." : "Submit"}
                                </Button>
                                </div>
                    </div>
                    </div>
                    </div>
                )}
                {/* Search & Filter Section */}
                <div className="flex flex-wrap items-center gap-4 p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
                  {/* Search Input */}
                  <div className="relative w-full md:w-[240px]">
                  <TextField
                      type="text"
                      placeholder="Search by name or phone or email..."
                      onChange={handleSearch}
                      className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                      />
                  </div>

                   {/* Filter by Currency */}
                   <div className="relative w-full md:w-[240px]">
                     <Autocomplete
                        options={Array.isArray(departments) && departments.length > 0 ? departments : [{ id: "", name: "No Departments" }]} 
                        getOptionLabel={(option) => option.name} 
                        value={departments.find((department) => department.id === selectedDepartment) || null}
                        onChange={handleDepartmentChange}
                        loading={loadingAgentList} 
                        className="w-full shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Department"
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                {loadingAgentList ? <CircularProgress size={20} /> : null}
                                {params.InputProps.endAdornment}
                                </>
                            ),
                            }}
                        />
                        )}
                    />
                  </div>
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
                                No Department Found
                            </td>
                            </tr>
                        ) : (
                            paginatedData.map((employee, index) => ( // 👈 Use filteredleads
                            <tr
                                key={index}
                                className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                                <td className="text-center py-2 text-gray-600">{index + 1}</td>
                                <td className="text-center py-2 text-gray-600 relative">
                                    <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                    {employee?.name || "-"}
                                    {employee?.name && employee.name.length > 15 && (
                                        <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                        {employee.name}
                                        </span>
                                    )}
                                    </span>
                                </td> 
                                <td className="text-center py-2 text-gray-600 relative">
                                <a
                                    href={`mailto:${employee?.email}`}
                                    className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                                >
                                    {employee?.email?.length > 15 ? employee?.email.slice(0, 15) + "..." : employee?.email || "-"}
                                    <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1">
                                    {employee?.email}
                                    </span>
                                </a>
                                </td>
                                <td className="text-center py-2 text-gray-600">
                                    {employee?.phone ? (
                                        <div className="flex items-center justify-center gap-1">
                                        <span>{employee.phone}</span>
                                        <FaCopy
                                            className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                            onClick={() => copyToClipboard(employee.phone)}
                                        />
                                        </div>
                                    ) : (
                                        "-"
                                    )}
                                    {copiedPhone === employee.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                                </td>
                                <td className="text-center py-2 text-gray-600">{departments.find(dept => dept.id === employee.department_id)?.name || "N/A"}</td>
                                <td className="text-center py-2 text-gray-600">
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                    setSelectedEmployee((prev) => (prev === employee.id ? null : employee.id))
                                    }
                                    style={{
                                    backgroundColor: selectedEmployee === employee.id ? "#1976D2" : "gray",
                                    color: "white",
                                    }}
                                >
                                    {selectedEmployee === employee.id ? "Deselect" : "Select"}
                                </Button>
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

export default AddAgentPage;
