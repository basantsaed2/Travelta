import React, { useState ,useEffect ,useRef} from 'react';
import { TextField, MenuItem, Checkbox, InputAdornment,ListItemText,Switch, Button,FormControlLabel,RadioGroup,Radio  } from "@mui/material";
import { useGet } from '../../../../../../Hooks/useGet';
import { usePost } from '../../../../../../Hooks/usePostJson';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdAttachMoney } from "react-icons/md";
import { FiPercent } from "react-icons/fi";
import { format } from 'date-fns';

const AddTourPage = ({ update, setUpdate }) => {
    const { refetch: refetchList, loading: loadingList, data: listData } = useGet({url:'https://travelta.online/agent/tour/lists'});
    // const { postData:postHotelId, loadingPost:loadingHotelId , response:responseHotelId} = usePost({url:`https://travelta.online/agent/room/hotel_lists`});
    const { postData, loadingPost, response } = usePost({url: "https://travelta.online/agent/tour/add",});
    const [activeTab, setActiveTab] = useState('General Details');

    //General Detalils
    const [countries, setCountries] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [cities, setCities] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    // const [mealPlans, setMealPlans] = useState([])
    // const [selectedMealPlan, setSelectedMealPlan] = useState('')
    // const [priceType, setPriceType] = useState('fixed');
    // const [currencies, setCurrencies] = useState([])
    // const fileInputRef = useRef();
    // const [selectedRoomCurrencies, setSelectedRoomCurrencies] = useState([])
    const [tourDetails, setTourDetails] = useState({
        name:'',
        description: '',
        status:true,
        videoLink: '',
        nights: 1,
        days:1,
        selectedTourType:'',
    });
    const tourType = [
        { value: "private", label: "Private Tour" },
        { value: "group", label: "Group Tour" },
      ];
    // const [supplementList, setSupplementList] = useState([
    //   {
    //       supplementName: '', 
    //       supplementType: '', 
    //       supplementPrice: 0, 
    //       selectedCurrency: '',
    //   },
    // ]);


    useEffect(() => {
      refetchList();
    }, [refetchList,update]);
      
    useEffect(() => {
      if (listData && listData.tour_types && listData.countries && listData.cities) {
          console.log("List Data:", listData);
        //   setRoomTypes(listData.room_types);
        //   setHotels(listData.hotels);
      }
    }, [listData]);

    // useEffect(() => {
    //   if (selectedHotel) {  
    //     const formData = new FormData();
    //     formData.append('hotel_id', selectedHotel);              
    //     postHotelId(formData);
    //   }
    // }, [selectedHotel]);

    // useEffect(() => {
    //   if (!loadingHotelId && responseHotelId) {                
    //     setMealPlans(responseHotelId.data?.meal_plans)
    //     setTaxes(responseHotelId.data?.country_taxes)
    //   }
    // }, [responseHotelId]);


   
    
  const handleSubmit = async (e) => {
     
  };

  return (
    <div className="w-full p-2 md:p-6 bg-white shadow rounded">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-2 xl:space-x-4">
          {['General Details', 'Facilities', 'Markup & Taxes', 'Policy'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 text-sm font-medium text-gray-700 border-b-2 ${
                activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {activeTab === 'General Details' && (
            <div>
                </div>
        )}
        {activeTab === 'Facilities' && (
          <div>
            </div>
        )}
        {activeTab === 'Markup & Taxes' && (
          <div>
            </div>
        )}
        {activeTab === 'Policy' && (
        <div>
            </div>
        )}

        <div className="mt-6 text-right">
            <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
              Done 
            </Button>
          </div>
      </div>
    </div>
  );
};

export default AddTourPage;
