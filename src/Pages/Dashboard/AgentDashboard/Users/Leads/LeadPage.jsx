import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaWhatsapp, FaEdit, FaEnvelope, FaPhone, FaUserCircle, FaCopy,FaFileExcel ,FaSearch ,FaGlobe ,FaCity,FaFilter } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {useChangeState} from '../../../../../Hooks/useChangeState';
import { Switch} from "@mui/material";
import * as XLSX from "xlsx";

const LeadPage = ({ update, setUpdate }) => {
    const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({url:'https://travelta.online/agent/leads'});
    const { changeState, loadingChange, responseChange } = useChangeState();
    const [leads, setLeads] = useState([])
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [copiedPhone, setCopiedPhone] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [filterMode, setFilterMode] = useState("both");
    const navigate= useNavigate()
    useEffect(() => {
        refetchLead();
    }, [refetchLead, update]);

    useEffect(() => {
        if (dataLead && dataLead.leads) {
                console.log("Leads Data:", dataLead);
                setLeads(dataLead.leads);
        }
    }, [dataLead]); // Only run this effect when `data` changes

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
      };
      const handleCloseDelete = () => {
        setOpenDelete(null);
      };
    
      // Delete lead
      const handleDelete = async (id, name) => {
        const success = await deleteData(`https://travelta.online/agent/leads/delete/${id}`, `${name} Deleted Success.`);
    
        if (success) {
          // Update Deliveries only if changeState succeeded
          setLeads(
            leads.filter((lead) =>
                lead.id !== id
            )
          );
        }
        console.log('data leads', leads)
      };

    // Get unique country & city lists
       const uniqueCountries = [...new Set(leads.map(lead => lead.country?.name).filter(Boolean))];
       const uniqueCities = [...new Set(leads.map(lead => lead.city?.name).filter(Boolean))];
       
       // Handle input changes
       const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
       const handleFilterCountry = (e) => setSelectedCountry(e.target.value);
       const handleFilterCity = (e) => setSelectedCity(e.target.value);
       const handleFilterMode = (e) => setFilterMode(e.target.value);
       
       // Filtering customers
       const filteredLeads = leads.filter((lead) => {
         const matchesSearch =
         lead?.name?.toLowerCase().includes(searchText) || 
         lead?.phone?.includes(searchText);
       
         const countryMatch = selectedCountry ? lead.country?.name === selectedCountry : true;
         const cityMatch = selectedCity ? lead.city?.name === selectedCity : true;
       
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
          leads.map((lead, index) => ({
             SL: index + 1,
             Name: lead.name || "-",
             Email: lead.email || "-",
             Phone: lead.phone || "-",
             WhatsApp: lead.watts || "-",
             Service: lead.service?.service_name || "-",
             Agent: lead.agent_sales?.name || "-",
             Source: lead.source?.source || "-",
             Country: lead.country?.name || "-",
             City: lead.city?.name || "-",
             Status: lead.status=== 1?"Active":"UnActive" || "-",
           }))
         );
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
         XLSX.writeFile(workbook, "Leads.xlsx");
       };
     
      // Change status 
    const handleChangeStaus = async (id, name, status) => {
      const response = await changeState(
              ` https://travelta.online/agent/leads/status/${id}`,
              `${name} Changed Status.`,
              { status } // Pass status as an object if changeState expects an object
      );
  
          if (response) {
                  // Update categories only if changeState succeeded
                  setLeads((prevLead) =>
                    prevLead.map((lead) =>
                      lead.id === id ? { ...lead, status: status } : lead
                      )
                  );
          }
  
      };

      const headers = ['Name','Email','Phone',"Whatshapp","Service","Agent","Source","Country","City","Status","Profile","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingLead  ? (
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
                        {filteredLeads.length === 0 ? ( // 👈 Use filteredleads
                          <tr>
                            <td colSpan={headers.length} className="text-center text-xl text-gray-500 py-4">
                              No Leads Found
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead, index) => ( // 👈 Use filteredleads
                            <tr
                              key={index}
                              className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                            >
                              <td className="text-center py-2 text-gray-600">{index + 1}</td>
                              <td className="text-center py-2 text-gray-600 relative">
                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                  {lead?.name || "-"}
                                  {lead?.name && lead.name.length > 15 && (
                                    <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                      {lead.name}
                                    </span>
                                  )}
                                </span>
                              </td>
                              <td className="text-center py-2 text-gray-600 relative">
                                <a
                                  href={`mailto:${lead?.email}`}
                                  className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline"
                                >
                                  {lead?.email?.length > 15 ? lead?.email.slice(0, 15) + "..." : lead?.email || "-"}
                                  <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1">
                                    {lead?.email}
                                  </span>
                                </a>
                              </td>
                              <td className="text-center py-2 text-gray-600">
                                {lead?.phone ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <span>{lead.phone}</span>
                                    <FaCopy
                                      className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                      onClick={() => copyToClipboard(lead.phone)}
                                    />
                                  </div>
                                ) : (
                                  "-"
                                )}
                                {copiedPhone === lead.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                              </td>
                              <td className="text-center py-2 text-gray-600">
                                {lead?.watts ? (
                                  <a
                                    href={`https://wa.me/${lead.watts}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-1 text-green-500 hover:text-green-700"
                                  >
                                    <FaWhatsapp className="w-3 h-3" />
                                    <span>{lead.watts}</span>
                                  </a>
                                ) : (
                                  "-"
                                )}
                              </td>
                              <td className="text-center py-2 text-gray-600">{lead?.service?.service_name || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{lead?.agent_sales?.name || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{lead?.source?.source || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{lead?.country?.name || "-"}</td>
                              <td className="text-center py-2 text-gray-600">{lead?.city?.name || "-"}</td>
                              <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                <Switch
                                  checked={lead.status === 1}
                                  onChange={() => {
                                      handleChangeStaus(lead.id, lead.name, lead.status === 1 ? 0 : 1);
                                  }}
                                  color="primary"
                                  />
                              </td>
                              <td className="text-center py-2">
                                <button onClick={() => navigate(`/dashboard_agent/users/leads/profiles/${lead?.id}`)}>
                                  <FaUserCircle className="w-7 h-7 text-gray-700 hover:text-blue-500 transition-all cursor-pointer" />
                                </button>
                              </td>
                              <td className="text-center py-2">
                                <div className="flex items-center justify-center gap-1">
                                <Link to={`edit/${lead.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenDelete(lead.id)}
                                  >
                                    <MdDelete color='#D01025' size="24"/>
                                  </button>
            
                                                
                                  
                                  {openDelete === lead.id && (
                                    <Dialog
                                      open={true}
                                      onClose={handleCloseDelete}
                                      className="relative z-10"
                                    >
                                      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                            <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                              <PiWarningCircle color='#0D47A1'
                                              size="60"
                                              />
                                              <div className="flex items-center">
                                                <div className="mt-2 text-center">
                                                  You will delete lead {lead?.name || "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                              <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(lead.id, lead?.agent)}>
                                                Delete
                                              </button>
            
                                              <button
                                                type="button"
                                                data-autofocus
                                                onClick={handleCloseDelete}
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </DialogPanel>
                                        </div>
                                      </div>
                                    </Dialog>
                                  )}
                                </div>
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

export default LeadPage