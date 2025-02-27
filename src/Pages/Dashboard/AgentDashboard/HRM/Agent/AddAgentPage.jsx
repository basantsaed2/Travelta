import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import { useNavigate } from 'react-router-dom';
import StaticLoader from '../../../../../Components/StaticLoader';

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

    const handleReset = () => {
        setName('');
        setPassword('');
        setSelectedEmployee(null);
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    useEffect(() => {
        if (!loadingPost) {
            handleReset();
            setUpdate(!update);
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !password || !selectedEmployee) {
            alert('Please complete all fields and select an employee.');
            return;
        }
        const formData = new FormData();
        formData.append('user_name', name);
        formData.append('password', password);
        formData.append('employee_id', selectedEmployee);
        postData(formData, 'Agency Added Success');
    };

    const handleDepartmentChange = (event) => {
        const departmentId = event.target.value;
        setSelectedDepartment(departmentId);
        setFilteredEmployees(employees.filter(emp => emp.department_id === departmentId));
    };

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        const filtered = employees.filter(emp =>
            emp.name.toLowerCase().includes(query) || emp.phone.includes(query)
        );
        setFilteredEmployees(filtered);
        if (filtered.length > 0) {
            setSelectedDepartment(filtered[0].department_id);
        }
    };

    return (
        <>
            {(loadingPost || loadingAgentList) ? (
                <div className="w-full h-56 flex justify-center items-center">
                    <StaticLoader />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-full p-6 flex flex-col gap-5">
                    <div className="flex gap-4 items-center justify-between">
                    <TextField
                        label="Search by Name or Phone"
                        variant="outlined"
                        fullWidth
                        onChange={handleSearch}
                    />
                    <TextField
                        select
                        label="Search by Department"
                        variant="outlined"
                        fullWidth
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
                        ))}
                    </TextField>
                </div>
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Name</strong></TableCell>
                                    <TableCell><strong>Phone</strong></TableCell>
                                    <TableCell><strong>Department</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((emp) => (
                                        <TableRow
                                            key={emp.id}
                                            style={{ backgroundColor: selectedEmployee === emp.id ? "#d1e7fd" : "white", cursor: "pointer" }}
                                        >
                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>{emp.phone}</TableCell>
                                            <TableCell>{departments.find(dept => dept.id === emp.department_id)?.name || "N/A"}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setSelectedEmployee(emp.id)}
                                                    style={{ backgroundColor: selectedEmployee === emp.id ? "#1976D2" : "gray", color: "white" }}
                                                >
                                                    Select
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} style={{ textAlign: "center", fontStyle: "italic" }}>No employees found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {selectedEmployee && (
                        <div className="flex flex-col gap-4">
                            <Typography variant="h6" gutterBottom>
                                    Add Credentials for Selected Employee
                            </Typography>
                            <div className="flex gap-4 items-center justify-between">
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
                        </div>
                    )}
                    <div className="flex gap-x-4">
                        <div className="">
                            <Button text={'Reset'} onClick={handleReset} className="bg-mainColor hover:bg-blue-600 hover:text-white">Reset</Button>
                        </div>                        
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                    </div>
                </form>
            )}
        </>
    );
};

export default AddAgentPage;