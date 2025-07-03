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
    const { refetch: refetchPosition, loading: loadingPosition, data: dataPosition } = useGet({ url: `https://travelta.online/agent/admin/position/item/${roleId}` });
    const { postData, loadingPost, response } = usePost({ url: `https://travelta.online/agent/admin/position/update/${roleId}` });
    const { refetch: refetchPositions, loading: loadingPositions, data: positionsData } = useGet({ url: 'https://travelta.online/agent/admin/position/lists' });
    const auth = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [modules, setModules] = useState({}); // Ensure modules are stored properly
    const [positions, setPositions] = useState([{ module: "", actions: [] }]);

    useEffect(() => {
        refetchPositions();
        refetchPosition();
    }, [update]);

    useEffect(() => {
        if (positionsData?.modules) {
            setModules(positionsData.modules);
        }
    }, [positionsData]);

    useEffect(() => {
        if (dataPosition?.position) {
            setName(dataPosition.position.name || '');

            const formattedPositions = Object.entries(dataPosition.module || {}).map(
                ([module, actions]) => ({
                    module,
                    actions,
                })
            );

            setPositions(formattedPositions);
        }
    }, [dataPosition]);

    const handleReset = () => {
        setName('');
        setPositions([{ module: "", actions: [] }]);
    };

    useEffect(() => {
        if (!loadingPost && response) {
            navigate(-1); // Navigate back only when the response is successful
        }
    }, [loadingPost, response, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            auth.toastError("Please Enter Name");
            return;
        }

        let premisions = [];

        for (const position of positions) {
            if (!position.module) {
                auth.toastError("Please Select a Module for each position");
                return;
            }
            if (!position.actions.length) {
                auth.toastError("Please Select at least one Action for each position");
                return;
            }

            position.actions.forEach((action) => {
                premisions.push({ module: position.module, action });
            });
        }

        const payload = { name, premisions };
        postData(payload, "Position Updated Successfully");
    };

    const handleAddPosition = () => {
        setPositions([...positions, { module: "", actions: [] }]);
    };

    const handleRemovePosition = (index) => {
        if (positions.length > 1) {
            setPositions(positions.filter((_, i) => i !== index));
        }
    };

    const handleModuleChange = (index, selectedModule) => {
        setPositions((prev) =>
            prev.map((pos, i) =>
                i === index ? { ...pos, module: selectedModule, actions: [] } : pos
            )
        );
    };

    const handleActionChange = (index, selectedAction) => {
        setPositions((prev) =>
            prev.map((pos, i) => {
                if (i === index) {
                    const newActions = pos.actions.includes(selectedAction)
                        ? pos.actions.filter(action => action !== selectedAction)
                        : [...pos.actions, selectedAction];

                    return { ...pos, actions: newActions };
                }
                return pos;
            })
        );
    };

    const handleSelectAll = (index) => {
        setPositions((prev) =>
            prev.map((pos, i) => {
                if (i === index) {
                    const allActions = modules[pos.module] || [];
                    return {
                        ...pos,
                        actions: pos.actions.length === allActions.length ? [] : allActions,
                    };
                }
                return pos;
            })
        );
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
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                <TextField
                                    label="Position Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        {positions.map((position, index) => (
                            <div key={index} className="flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5 border p-4 rounded-lg shadow-md">

                                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        value={position.module}
                                        onChange={(e) => handleModuleChange(index, e.target.value)}
                                        label="Select Module"
                                    >
                                        {Object.keys(modules).map((module) => (
                                            <MenuItem key={module} value={module}>
                                                {module}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                    <TextField
                                        select
                                        fullWidth
                                        variant="outlined"
                                        value={position.actions}
                                        onChange={(e) => handleActionChange(index, e.target.value)}
                                        label="Select Actions"
                                        SelectProps={{ multiple: true, renderValue: (selected) => selected.join(" , ") }}
                                    >
                                        {position.module && Array.isArray(modules[position.module]) ? (
                                            <>
                                                <MenuItem value="select_all" onClick={() => handleSelectAll(index)}>
                                                    <Checkbox checked={position.actions.length === modules[position.module].length}
                                                        indeterminate={position.actions.length > 0 && position.actions.length < modules[position.module].length} />
                                                    <ListItemText primary="Select All" />
                                                </MenuItem>

                                                {modules[position.module]?.map((action) => (
                                                    <MenuItem key={action} value={action} onClick={() => handleActionChange(index, action)}>
                                                        <Checkbox checked={position.actions.includes(action)} />
                                                        <ListItemText primary={action} />
                                                    </MenuItem>
                                                ))}
                                            </>
                                        ) : <MenuItem disabled>No actions available</MenuItem>}
                                    </TextField>
                                </div>

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
