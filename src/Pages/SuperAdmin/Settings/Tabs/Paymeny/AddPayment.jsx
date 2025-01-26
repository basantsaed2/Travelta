
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { FaArrowLeft } from 'react-icons/fa';
const AddPayment = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBack= ()=>{
    navigate(-1);
  }

  return (
 <div className="">
     <div className="flex items-center mb-4">
      <button
            onClick={handleBack}
            className="m-4"
            
          >
            <FaArrowLeft className="text-mainColor text-2xl" />
          </button>
          <h2 className="text-center text-mainColor text-3xl ">Add Payment</h2>
          
  
      </div>
 </div>
  );
};

export default AddPayment;
