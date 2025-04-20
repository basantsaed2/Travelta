import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { Dialog,DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FaEdit, FaFileExcel, FaSearch, FaFilter,FaCopy,FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../Context/Auth';
import { useDelete } from '../../../../../Hooks/useDelete';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";

const SupplierPage = ({ update, setUpdate }) => {
  const { refetch: refetchSupplier, loading: loadingSupplier, data: dataSupplier } = useGet({url:'https://travelta.online/agent/supplier'});

  const [suppliers, setSuppliers] = useState([])
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const {deleteData, loadingDelete, responseDelete} = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [copiedPhone, setCopiedPhone] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate()

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refetchSupplier();
  }, [refetchSupplier, update]);

  useEffect(() => {
    if (dataSupplier && dataSupplier.supplier_agent) {
        console.log("Suppliers Data:", dataSupplier);
        setSuppliers(dataSupplier.supplier_agent);
    }
  }, [dataSupplier]); 

  // Filtering Logic: search, type, and date range
  useEffect(() => {
    let filtered = suppliers;
    // Search filter (case-insensitive)
    if (searchText) {
      filtered = filtered.filter(supplier =>
        supplier?.name?.toLowerCase().includes(searchText) ||
        supplier?.phone?.toLowerCase().includes(searchText) 
      );
    }
    // Type filter
    if (selectedService) {
      filtered = filtered.filter(supplier =>
        supplier.services?.some(service => service.service_name === selectedService)
      );
          }
    // Date range filter
    setFilteredSuppliers(filtered);
    setCurrentPage(1);
  }, [searchText, selectedService,suppliers]);

  const handleOpenDelete = (item) => {
        setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  const handleDelete = async (selected) => {
      const success = await deleteData(`https://travelta.online/agent/supplier/delete/${selected.id}`, `${selected.name} Deleted Success.`);

      if (success) {
        // Update Discounts only if changeState succeeded
        setSuppliers(
            suppliers.filter((supplier) =>
              supplier.id !== selected.id
                )
        );
  };
  }
  
  // Copy phone number to clipboard
  const copyToClipboard = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // Handlers for filters
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterType = (e) => {
    setSelectedService(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSuppliers.slice(indexOfFirstRow, indexOfLastRow);

  const uniqueType = [
    ...new Set(
      suppliers
        .flatMap(supplier => supplier.services || []) // flatten services from each supplier
        .map(service => service.service_name) // extract names
        .filter(Boolean) // remove null/undefined
    )
  ];
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      suppliers.map((supplier, index) => ({
        SL: index + 1,
        Name: supplier?.name || "-",
        Phone:supplier?.phones?.join(", ") || "-",
        Email: supplier?.emails?.join(", ") || "-",
        Services: supplier?.services?.map(s => s.service_name).join(", ") || "-",
        Contact_Person: supplier?.admin_name || "-",
        Contact_Person_Phone: supplier?.admin_phone || "-",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");
    XLSX.writeFile(workbook, "Suppliers.xlsx");
  };

  const headers = ['Name','Email', 'Phone',"Services","Contact Person","Contact Phone","Profile","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingSupplier  || loadingDelete? (
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
                placeholder="Search by name or phone ..."
                value={searchText}
                onChange={handleSearch}
                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* Filter by type */}
            <div className="relative w-full md:w-[240px]">
              <select
                onChange={handleFilterType}
                value={selectedService}
                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Filter by Service</option>
                {uniqueType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
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

          {/* Rows per Page */}
          <div className="flex items-center space-x-2 mb-5">
            <label className="text-gray-700 font-medium">Rows per page:</label>
            <div className="w-full md:w-[120px]">
              <select
                onChange={handleRowsChange}
                value={rowsPerPage}
                className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
              >
                <option value="5">5 rows</option>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="30">30 rows</option>
                <option value="50">50 rows</option>
              </select>
            </div>
          </div>

          {/* supplier Table */}
          <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="border-t-2 border-b-2">
                  <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                    SL
                  </th>
                  {headers.map((name, index) => (
                    <th
                      key={index}
                      className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-md py-3 border-b-2"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                      No Suppliers Found
                    </td>
                  </tr>
                ) : (
                  currentRows.map((supplier, index) => (
                    <tr
                      key={index}
                      className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                    >
                      <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                      <td className="text-center py-2 text-gray-600 relative">
                        <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                          {supplier?.name || "-"}
                          {supplier?.name && supplier.name.length > 15 && (
                            <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                              {supplier.name}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="text-center py-2 text-gray-600 relative">
                        {supplier?.emails?.length ? (
                          <div className="flex flex-col items-center gap-1">
                            {supplier.emails.map((email, index) => (
                              <a
                                key={index}
                                href={`mailto:${email}`}
                                className="truncate max-w-[120px] inline-block cursor-pointer group text-blue-500 hover:underline relative"
                              >
                                {email.length > 15 ? email.slice(0, 15) + "..." : email}
                                <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                  {email}
                                </span>
                              </a>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2 text-gray-600">
                        {supplier?.phones?.length ? (
                          <div className="flex flex-col items-center gap-1">
                            {supplier.phones.map((phone, index) => (
                              <div key={index} className="flex items-center justify-center gap-1">
                                <span>{phone}</span>
                                <FaCopy
                                  className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                  onClick={() => copyToClipboard(phone)}
                                />
                                {copiedPhone === phone && (
                                  <span className="text-green-500 text-xs ml-2">Copied!</span>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2 text-gray-600 relative group">
                        {supplier?.services?.length ? (
                          <div className="truncate max-w-[150px] mx-auto text-ellipsis overflow-hidden whitespace-nowrap cursor-default group-hover:underline group-hover:text-blue-500">
                            {supplier.services.map(s => s.service_name).join(", ")}
                            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all z-10 whitespace-nowrap">
                              {supplier.services.map(s => s.service_name).join(", ")}
                            </span>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="text-center py-2 text-gray-600">{supplier?.admin_name || "-"}</td>
                      <td className="text-center py-2 text-gray-600">{supplier?.admin_phone || "-"}</td>
                      <td className="text-center py-2 text-gray-600">
                        <button
                          type="button"
                        >
                              <FaUserCircle
                                className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                                onClick={() => navigate(`/dashboard_agent/users/suppliers/profile/${supplier?.id}`)}
                              />
                        </button>
                      </td>
                      <td className="text-center py-2">
                        <div className="flex items-center justify-center gap-1">
                        <Link to={`edit/${supplier.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(supplier.id)}
                          >
                            <MdDelete color='#D01025' size="24"/>
                          </button>
            
                          {openDelete === supplier.id && (
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
                                          You will delete supplier {supplier?.name || "-"}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(supplier)}>
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

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages || 1}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;


