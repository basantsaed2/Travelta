import React, { useState, useEffect, useRef } from "react";
import { TextField, FormControlLabel, Button, Switch, Checkbox, IconButton } from "@mui/material";
import { usePost } from '../../../../../../../Hooks/usePostJson';
import StaticLoader from '../../../../../../../Components/StaticLoader';
import { useNavigate } from "react-router-dom";

const AddRoomAmenityPage = ({ update, setUpdate }) => {
    const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/room/settings/amenity/add' });

    const [name, setName] = useState("");
    const [isChecked, setIsChecked] = useState(true);
    const [status, setStatus] = useState(0);
    const navigate = useNavigate();

    const handleSwitchChange = () => {
        setStatus((prev) => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    };
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleReset = () => {
        setName('');
        setIsChecked(true)
        setStatus(0)
    };

    useEffect(() => {
        if (!loadingPost && response) {
            navigate(-1);
        }
    }, [response]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(isChecked)
        if (!name) {
            auth.toastError('Please Enter Name');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('selected', isChecked === true ? 'yes' : 'no');
        formData.append('status', status);

        postData(formData, 'Room Amenity Added Success');
    };

    return (
        <>
            {(loadingPost) ? (
                <div className="w-full h-56 flex justify-center items-center">
                    <StaticLoader />
                </div>
            ) : (
                <>
                    <form
                        className="w-full flex flex-col gap-5 p-6"
                        onSubmit={handleSubmit}
                    >
                        <div
                            className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5"
                        >
                            <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                                <TextField
                                    label="Room Amenity"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                                />
                            </div>
                            <div className="sm:w-full lg:w-[30%] gap-5 flex items-center ml-5 mt-2">
                                <div>
                                    <span className="text-mainColor text-lg font-semibold">Status : </span>
                                    <Switch
                                        checked={status === 1}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                </div>
                                <div>
                                    <span className="text-mainColor text-lg font-semibold">Included : </span>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={handleCheckboxChange}
                                                color="primary"
                                            />
                                        }
                                        label={isChecked ? 'Yes' : 'No'}
                                    />
                                </div>
                            </div>
                        </div>
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

export default AddRoomAmenityPage;
