import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { FaWhatsapp, FaEnvelope, FaPhone, FaUserCircle, FaCopy,FaFileExcel ,FaSearch ,FaGlobe ,FaCity,FaFilter } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";

const CustomerPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchCustomer, loading: loadingCustomer, data: dataCustomer } = useGet({url:'https://travelta.online/agent/customer'});
    const [customers, setCustomers] = useState([])
    const [searchText, setSearchText] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [filterMode, setFilterMode] = useState("both");
    const [copiedPhone, setCopiedPhone] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        refetchCustomer();
    }, [refetchCustomer, refetch]);

    useEffect(() => {
        if (dataCustomer && dataCustomer.customers) {
                console.log("Customer Data:", dataCustomer);
                setCustomers(dataCustomer.customers);
        }
    }, [dataCustomer]);
    
    // Get unique country & city lists
    const uniqueCountries = [...new Set(customers.map(customer => customer.country?.name).filter(Boolean))];
    const uniqueCities = [...new Set(customers.map(customer => customer.city?.name).filter(Boolean))];
    
    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterCountry = (e) => setSelectedCountry(e.target.value);
    const handleFilterCity = (e) => setSelectedCity(e.target.value);
    const handleFilterMode = (e) => setFilterMode(e.target.value);
    
    // Filtering customers
    const filteredCustomers = customers.filter((customer) => {
      const matchesSearch =
        customer?.name?.toLowerCase().includes(searchText) || 
        customer?.phone?.includes(searchText);
    
      const countryMatch = selectedCountry ? customer.country?.name === selectedCountry : true;
      const cityMatch = selectedCity ? customer.city?.name === selectedCity : true;
    
      if (filterMode === "both") return matchesSearch && countryMatch && cityMatch;
      if (filterMode === "countryOnly") return matchesSearch && countryMatch;
      if (filterMode === "cityOnly") return matchesSearch && cityMatch;
      return matchesSearch;
    });
    
    // Copy phone number to clipboard
    const copyToClipboard = (phone) => {
      navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2000);
    };
  
    // Export filtered data to Excel
    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(
        customers.map((customer, index) => ({
          SL: index + 1,
          Name: customer.name || "-",
          Email: customer.email || "-",
          Phone: customer.phone || "-",
          WhatsApp: customer.watts || "-",
          Country: customer.country?.name || "-",
          City: customer.city?.name || "-",
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
      XLSX.writeFile(workbook, "Customers.xlsx");
    };
  
  const headers = ['Name','Email','Phone',"Whatshapp","Country","City","Profile"];

  return (
    <div className="w-full pb-5 flex items-start justify-start">
      {loadingCustomer  ? (
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
            placeholder="Search by name or phone..."
            value={searchText}
            onChange={handleSearch}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Filter by Country */}
        <div className="relative w-full md:w-[240px]">
          <select
            onChange={handleFilterCountry}
            value={selectedCountry}
            className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Filter by Country</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <FaGlobe className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
        </div>

        {/* Filter by City */}
        <div className="relative w-full md:w-[240px]">
          <select
            onChange={handleFilterCity}
            value={selectedCity}
            className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Filter by City</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <FaCity className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
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

      <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
        <table className="w-full min-w-[600px]">
              {/* Table Header */}
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

              {/* Table Body */}
              <tbody>
                {filteredCustomers.length === 0 ? ( // 👈 Use filteredCustomers
                  <tr>
                    <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                      No Customers Found
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer, index) => ( // 👈 Use filteredCustomers
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2 text-gray-600">{index + 1}</td>
                      <td className="text-center py-2 text-gray-600 relative">
                        <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                          {customer?.name || "-"}
                          {customer?.name && customer.name.length > 15 && (
                            <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                              {customer.name}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="text-center py-2 text-gray-600 relative">
                        <a
                          href={`mailto:${customer?.email}`}
                          className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                        >
                          {customer?.email?.length > 15 ? customer?.email.slice(0, 15) + "..." : customer?.email || "-"}
                          <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1">
                            {customer?.email}
                          </span>
                        </a>
                      </td>
                      <td className="text-center py-2 text-gray-600">
                        {customer?.phone ? (
                          <div className="flex items-center justify-center gap-2">
                            <span>{customer.phone}</span>
                            <FaCopy
                              className="text-gray-500 hover:text-blue-500 cursor-pointer"
                              onClick={() => copyToClipboard(customer.phone)}
                            />
                          </div>
                        ) : (
                          "-"
                        )}
                        {copiedPhone === customer.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                      </td>
                      <td className="text-center py-2 text-gray-600">
                        {customer?.watts ? (
                          <a
                            href={`https://wa.me/${customer.watts}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 text-green-500 hover:text-green-700"
                          >
                            <FaWhatsapp className="w-5 h-5" />
                            <span>{customer.watts}</span>
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2 text-gray-600">{customer?.country?.name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{customer?.city?.name || "-"}</td>
                      <td className="text-center py-2">
                        <button onClick={() => navigate(`/dashboard_agent/users/customers/profile/${customer?.id}`)}>
                          <FaUserCircle className="w-7 h-7 text-gray-700 hover:text-blue-500 transition-all cursor-pointer" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
        </table>
        </div>
      </div>
      
      )}
    </div>
  );
}

export default CustomerPage