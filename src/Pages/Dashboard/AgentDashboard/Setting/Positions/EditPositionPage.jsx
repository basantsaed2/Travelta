import React, { useState, useEffect } from "react"; 
import { TextField, MenuItem, Button, Checkbox, ListItemText, IconButton } from "@mui/material";
import { usePost } from '../../../../../Hooks/usePostJson';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from '../../../../../Context/Auth';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';

const EditPositionPage = ({ update, setUpdate }) => {
    const { roleId } = useParams();
    const { refetch: refetchPosition, loading: loadingPosition, data: dataPosition } = useGet({ url:`https://travelta.online/agent/admin/position/item/${roleId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/admin/position/update/${roleId}` });
    const { refetch: refetchPositions, loading: loadingPositions, data: positionsData } = useGet({ url: 'https://travelta.online/agent/admin/position/lists' });
    const auth = useAuth();

    const [name, setName] = useState("");
    const [actions, setActions] = useState([]);   
    const [modules, setModules] = useState([]);
    const [positions, setPositions] = useState([{ module: "", actions: [] }]); // Array of positions

    useEffect(() => {
        refetchPositions();
        refetchPosition();
    }, [refetchPositions,refetchPosition,update]);

    useEffect(() => {
        if (positionsData && positionsData.actions && positionsData.modules) {
            setActions(positionsData.actions);
            setModules(positionsData.modules);
        }
    }, [positionsData]);

    useEffect(() => {
        if (dataPosition && dataPosition.position) {
            const position = dataPosition.position;
    
            setName(position.name || '');
    
            setPositions(
                position.perimitions?.map((perm) => ({
                    module: perm.module,
                    actions: [perm.action] // Convert single action into array format
                })) || []
            );
        }
    
        console.log('dataPosition', dataPosition);
    }, [dataPosition]);    

    const handleReset = () => {
        setName('');
        setPositions([{ module: "", actions: [] }]);
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
            auth.toastError("Please Enter Name");
            return;
        }
    
        let permissions = [];
        
        for (const position of positions) {
            if (!position.module) {
                auth.toastError("Please Select a Module for each position");
                return;
            }
            if (!position.actions.length) {
                auth.toastError("Please Select at least one Action for each position");
                return;
            }
    
            // Convert actions array into separate objects for each action
            position.actions.forEach((action) => {
                permissions.push({
                    module: position.module,
                    action: action
                });
            });
        }
    
        const payload = {
            name: name,
            premisions: permissions
        };
    
        console.log("Sending Data:", JSON.stringify(payload)); // Debugging
    
        postData(payload, "Position Added Successfully");
    };    

    const handleAddPosition = () => {
        setPositions([...positions, { module: "", actions: [] }]);
    };

    const handleRemovePosition = (index) => {
        if (positions.length > 1) {
            setPositions(positions.filter((_, i) => i !== index));
        }
    };

    const handleModuleChange = (index, value) => {
        const newPositions = [...positions];
        newPositions[index].module = value;
        setPositions(newPositions);
    };

    const handleActionChange = (index, value) => {
        const newPositions = [...positions];
        newPositions[index].actions = value;
        setPositions(newPositions);
    };

    return (
        <>
        {(loadingPost || loadingPositions) ? (
            <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
            </div>
        ) : (
        <>
        <form className="w-full flex flex-col gap-5 p-6" onSubmit={handleSubmit}>
          <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5">
            {/* Account Name Field */}
            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                <TextField
                    label="Position Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                />
            </div>
          </div>

          {/* Positions Section */}
          {positions.map((position, index) => (
            <div key={index} className="flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5 border p-4 rounded-lg shadow-md">
                {/* Module Selection */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={position.module}
                        onChange={(e) => handleModuleChange(index, e.target.value)}
                        label="Select Module"
                        className="mb-6"
                    >
                        {modules.length > 0 ? (
                            modules.map((module) => (
                                <MenuItem key={module} value={module}>
                                    {module}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No module available</MenuItem>
                        )}
                    </TextField>
                </div>

                {/* Multi-Select Actions */}
                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={position.actions}
                        onChange={(e) => handleActionChange(index, e.target.value)}
                        label="Select Actions"
                        SelectProps={{
                            multiple: true,
                            renderValue: (selected) => selected.join(" , "),
                        }}
                        className="mb-6"
                    >
                        {actions.length > 0 ? (
                            actions.map((action) => (
                                <MenuItem key={action} value={action}>
                                    <Checkbox checked={position.actions.includes(action)} />
                                    <ListItemText primary={action} />
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No action available</MenuItem>
                        )}
                    </TextField>
                </div>

                {/* Add & Remove Buttons */}
                <div className="flex items-center">
                    {index === positions.length - 1 && (
                        <IconButton onClick={handleAddPosition} color="primary">
                            <AiOutlinePlusCircle size={24} />
                        </IconButton>
                    )}
                    {index !== 0 && (
                        <IconButton onClick={() => handleRemovePosition(index)} color="error">
                            <AiOutlineMinusCircle size={24} />
                        </IconButton>
                    )}
                </div>
            </div>
          ))}

          {/* Form Buttons */}
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

export default EditPositionPage;
