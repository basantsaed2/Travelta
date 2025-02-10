import React, { useState, useEffect } from "react";
import { usePost } from "../../../../Hooks/usePostJson";
import { FaSearch } from "react-icons/fa";
import { Button, TextField, CircularProgress } from "@mui/material";

const BookingPaymentPage = () => {
  const { postData: postSearch, loadingPost: loadingSearch, response: responseSearch } = usePost({
    url: "https://travelta.online/agent/accounting/booking/search",
  });
  const [referenceCode, setReferenceCode] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
    if (!loadingSearch) {
      console.log("response Search", responseSearch?.data);
      if(responseSearch){
      setData(responseSearch?.data)
      }
    }
  }, [responseSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!referenceCode) {
      alert("Please Enter Reference Code");
      return;
    }
    const formData = new FormData();
    formData.append("code", referenceCode);

    postSearch(formData, "Searching...");
  };

  return (
    <div className="max-w-lg mt-8 p-4 rounded-lg shadow-md ">
      {/* <h2 className="text-xl font-semibold text-center mb-4">Search Booking</h2> */}
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="relative w-full">
          <TextField
            label="Reference Code"
            variant="outlined"
            size="small"
            fullWidth
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            className="pr-12" // Add padding-right to make space for the icon
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
            <FaSearch className="text-gray-500 text-xl" onClick={handleSearch} />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="px-6 py-2 text-sm"
          disabled={loadingSearch}
        >
          {loadingSearch ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </Button>
      </form>

      
    </div>
  );
};

export default BookingPaymentPage;
