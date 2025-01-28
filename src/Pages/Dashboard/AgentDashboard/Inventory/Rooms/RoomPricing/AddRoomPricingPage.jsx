import React, { useState ,useEffect ,useRef} from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment,ListItemText,Switch, Button,FormControlLabel,RadioGroup,Radio  } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import StaticLoader from '../../../../../../Components/StaticLoader';

const AddRoomPricingPage =({ update, setUpdate })=>{
    const { roomId } = useParams();
    const { refetch: refetchPricing, loading: loadingPricing, data: dataPricing } = useGet({url:`https://travelta.online/agent/room/pricing/${roomId}`});
    const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/room/pricing/add",});
    const [name, setName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [nationalityType, setNationalityType] = useState('');
    const [price, setPrice] = useState('');

    const [currencies, setCurrencies] = useState([])
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [nationalities, setNationalities] = useState([])
    const [selectedNationality, setSelectedNationality] = useState([])
    const [pricingData, setPricingData] = useState([])
    const [selectedPricingData, setSelectedPricingData] = useState('')
    
    useEffect(() => {
        refetchPricing();
    }, [refetchPricing, update]);

    useEffect(() => {
        if (dataPricing && dataPricing.currencies && dataPricing.groups && dataPricing.nationalities && dataPricing.pricing_data) {
                console.log("Pricing Data:", dataPricing);
                setCurrencies(dataPricing.currencies);
                setGroups(dataPricing.groups);
                setNationalities(dataPricing.nationalities);
                setPricingData(dataPricing.pricing_data);
        }
    }, [dataPricing]);
    
    useEffect(() => {
        if (!loadingPost) {
                handleReset()
                setUpdate(!update)     
            }
    }, [response])

    const handleReset = () => {
        setName('')
        setToDate('')
        setFromDate('')
        setPrice('')
        setNationalityType('')
        setSelectedCurrency('')
        setSelectedGroup([])
        setSelectedNationality([])
        setSelectedPricingData('')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('room_id', roomId);

        formData.append('name', name);
        formData.append('from', fromDate);
        formData.append('to', toDate);
        formData.append('price', price);
        formData.append('currency_id', selectedCurrency);
        formData.append('pricing_data_id', selectedPricingData);
        
        if(nationalityType === 'nationality&group'){
            selectedGroup.forEach((id) => {
                formData.append('groups_id[]', id);
            });    
            selectedNationality.forEach((id) => {
                formData.append('nationality_id[]', id);
            });
        }
        else if(nationalityType === 'nationality'){
            selectedGroup.forEach((id) => {
                formData.append('groups_id[]', id);
            });  
        }
        else if (nationalityType === 'group'){
            selectedGroup.forEach((id) => {
                formData.append('groups_id[]', id);
            }); 
        }
        postData(formData, 'Pricing Room Added Success');
    };

     
    return(
        <>
        {loadingPost || loadingPricing ? (
            <>
                   <div className="w-full h-56 flex justify-center items-center">
                          <StaticLoader />
                   </div>
            </>
            ) : (
                <form className="w-full flex flex-col gap-5 p-6" onSubmit={handleSubmit}>
                <div className="w-full flex sm:flex-col lg:flex-row flex-wrap items-start justify-start gap-5">
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            fullWidth
                            label="From Date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className="w-full"
                        />
                    </div>
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            fullWidth
                            label="To Date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            className="w-full"
                        />
                    </div>
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            required
                            type='number'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            inputProps={{
                                min: 0,
                            }}
                        />
                    </div>
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            select
                            label="Select Currency"
                            required
                            value={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                            fullWidth
                            className="w-full"
                        >
                            {currencies.map((currency) => (
                                <MenuItem key={currency.id} value={currency.id}>
                                    {currency.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            select
                            label="Select From Pricing List"
                            required
                            value={selectedPricingData}
                            onChange={(e) => setSelectedPricingData(e.target.value)}
                            fullWidth
                            className="w-full"
                        >
                            {pricingData.map((data) => (
                                <MenuItem key={data.id} value={data.id}>
                                    Adults {data.adults},Childreen {data.children},MealPlan {`"${data.meal_plan}"`},RoomType {`"${data.room_type}"`}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            label="Nationality"
                            variant="outlined"
                            select
                            fullWidth
                            required
                            value={nationalityType}
                            onChange={(e) => setNationalityType(e.target.value)}
                            className="shadow-md font-mainColor border-mainColor hover:border-mainColor focus:border-mainColor"
                        >
                            <MenuItem value="nationality">Select Nationality</MenuItem>
                            <MenuItem value="group">Select Group</MenuItem>
                            <MenuItem value="nationality&group">Select Nationality && Group</MenuItem>
                        </TextField>
                    </div>
                    {nationalityType === 'nationality' && (
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                value={selectedNationality}
                                onChange={(e) => setSelectedNationality(e.target.value)} // Update the selected service                }
                                label="Select Nationality"
                                className="mb-6"
                                SelectProps={{
                                    multiple: true,  // Enable multi-select
                                    renderValue: (selected) => selected.map((id) => nationalities.find((nationality) => nationality.id === id).name).join(', ')  // Display selected tax names
                                }}
                                >
                                {nationalities.length > 0 ? (
                                    nationalities.map((nationality) => (
                                    <MenuItem key={nationality.id} value={nationality.id}>
                                        <Checkbox checked={selectedNationality.includes(nationality.id)} />{" "}
                                        <ListItemText primary={nationality.name} />{" "}
                                    </MenuItem>
                                        ))) : (
                                    <MenuItem value="" disabled>
                                        No Nationality available
                                    </MenuItem>              
                                )}
                            </TextField>
                            
                        </div>       
                    )}
                    {nationalityType === 'group' && (
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)} // Update the selected service                }
                                label="Select Group"
                                className="mb-6"
                                SelectProps={{
                                    multiple: true,  // Enable multi-select
                                    renderValue: (selected) => selected.map((id) => groups.find((group) => group.id === id).name).join(', ')  // Display selected tax names
                                }}
                                >
                                {groups.length > 0 ? (
                                    groups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        <Checkbox checked={selectedGroup.includes(group.id)} />{" "}
                                        <ListItemText primary={group.name} />{" "}
                                    </MenuItem>
                                        ))) : (
                                    <MenuItem value="" disabled>
                                        No group available
                                    </MenuItem>              
                            )}
                            </TextField>
                        </div>  
                    )}
                    {nationalityType === 'nationality&group' && (
                    <>
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            value={selectedNationality}
                            onChange={(e) => setSelectedNationality(e.target.value)} // Update the selected service                }
                            label="Select Nationality"
                            className="mb-6"
                            SelectProps={{
                                multiple: true,  // Enable multi-select
                                renderValue: (selected) => selected.map((id) => nationalities.find((nationality) => nationality.id === id).name).join(', ')  // Display selected tax names
                            }}
                            >
                            {nationalities.length > 0 ? (
                                nationalities.map((nationality) => (
                                <MenuItem key={nationality.id} value={nationality.id}>
                                    <Checkbox checked={selectedNationality.includes(nationality.id)} />{" "}
                                    <ListItemText primary={nationality.name} />{" "}
                                </MenuItem>
                                    ))) : (
                                <MenuItem value="" disabled>
                                    No nationality available
                                </MenuItem>              
                            )}
                        </TextField>
                        </div>       
                        <div className="sm:w-full lg:w-[30%] flex flex-col items-start justify-center gap-y-1">
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)} // Update the selected service                }
                                label="Select Group"
                                className="mb-6"
                                SelectProps={{
                                    multiple: true,  // Enable multi-select
                                    renderValue: (selected) => selected.map((id) => groups.find((group) => group.id === id).name).join(', ')  // Display selected tax names
                                }}
                                >
                                {groups.length > 0 ? (
                                    groups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        <Checkbox checked={selectedGroup.includes(group.id)} />{" "}
                                        <ListItemText primary={group.name} />{" "}
                                    </MenuItem>
                                        ))) : (
                                    <MenuItem value="" disabled>
                                        No group available
                                    </MenuItem>              
                            )}
                            </TextField>
                        </div> 
                    </> 
                    )} 
                </div>
                <div className="w-full flex items-center gap-x-4">
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
    )}
    </>
)
}

export default AddRoomPricingPage;