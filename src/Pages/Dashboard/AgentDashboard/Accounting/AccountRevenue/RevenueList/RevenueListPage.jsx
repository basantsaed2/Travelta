import React, { useEffect, useState } from 'react';
import StaticLoader from '../../../../../../Components/StaticLoader';
import { useGet } from '../../../../../../Hooks/useGet';
import { useDelete } from '../../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit, FaFileExcel, FaSearch, FaFilter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
import { useAuth } from '../../../../../../Context/Auth';

const RevenueListPage = ({ update, setUpdate }) => {
    const { refetch: refetchRevenues, loading: loadingRevenues, data: revenueData } = useGet({
        url: 'https://travelta.online/agent/accounting/revenue',
    });
    const [revenues, setRevenues] = useState([]);
    const { deleteData, loadingDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [selectedFinancial, setSelectedFinancial] = useState("");
    const auth = useAuth();

    // Pagination State
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        refetchRevenues();
    }, [refetchRevenues, update]);

    useEffect(() => {
        if (revenueData?.revenue) {
            setRevenues(revenueData.revenue);
        }
    }, [revenueData]);

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
    };

    const handleCloseDelete = () => {
        setOpenDelete(null);
    };

    // Delete Revenue
    const handleDelete = async (id, title) => {
        const success = await deleteData(
            `https://travelta.online/agent/accounting/revenue/delete/${id}`,
            `${title} Revenue Deleted Successfully.`
        );

        if (success) {
            setRevenues(revenues.filter((revenue) => revenue.id !== id));
        }
    };

    // Handle input changes
    const handleSearch = (e) => setSearchText(e.target.value.toLowerCase());
    const handleFilterFinancial = (e) => setSelectedFinancial(e.target.value);

    // Filter revenues
    const filteredRevenues = revenues.filter((revenue) => {
        const matchesSearch =
            revenue?.title?.toLowerCase().includes(searchText) ||
            revenue?.description?.toLowerCase().includes(searchText) ||
            revenue?.amount?.toString().includes(searchText);

        const financialMatch = selectedFinancial ? 
            revenue.financial?.name === selectedFinancial : true;

        return matchesSearch && financialMatch;
    });

    // Get unique financial accounts
    const uniqueFinancials = [...new Set(revenues.map(revenue => revenue.financial?.name).filter(Boolean))];

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            filteredRevenues.map((revenue, index) => ({
                SL: index + 1,
                Title: revenue.title || "-",
                Description: revenue.description || "-",
                Financial_Account: revenue.financial?.name || "-",
                Amount: revenue.amount || "-",
                Currency: revenue.currency?.name || "-",
                Date: revenue.date || "-"
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Revenues");
        XLSX.writeFile(workbook, "Revenues.xlsx");
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredRevenues.length / rowsPerPage);
    const paginatedData = filteredRevenues.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const handleRowsChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const headers = ['Title', 'Description', 'Financial Account', 'Amount', 'Currency', 'Date', 'Action'];

    return (
        <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
            {loadingRevenues || loadingDelete ? (
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
                                placeholder="Search by title or description..."
                                value={searchText}
                                onChange={handleSearch}
                                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                            />
                        </div>

                        {/* Filter by Financial Account */}
                        <div className="relative w-full md:w-[240px]">
                            <select
                                onChange={handleFilterFinancial}
                                value={selectedFinancial}
                                className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">Filter by Financial Account</option>
                                {uniqueFinancials.map((financial, index) => (
                                    <option key={index} value={financial}>
                                        {financial}
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
                                            className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                                        >
                                            {name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan={headers.length + 1} className="text-center text-xl text-gray-500 py-4">
                                            No Revenues Found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((revenue, index) => (
                                        <tr
                                            key={revenue.id}
                                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                                        >
                                            <td className="text-center py-2 text-gray-600">
                                                {(currentPage - 1) * rowsPerPage + index + 1}
                                            </td>
                                            <td className="text-center py-2 text-gray-600 relative">
                                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                                    {revenue?.title || "-"}
                                                    {revenue?.title && revenue.title.length > 15 && (
                                                        <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                                            {revenue.title}
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="text-center py-2 text-gray-600 relative">
                                                <span className="block max-w-[150px] truncate mx-auto cursor-pointer group">
                                                    {revenue?.description || "-"}
                                                    {revenue?.description && revenue.description.length > 15 && (
                                                        <span className="absolute bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                                                            {revenue.description}
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="text-center py-2 text-gray-600">
                                                {revenue?.financial?.name || "-"}
                                            </td>
                                            <td className="text-center py-2 text-gray-600">
                                                {revenue?.amount || "-"}
                                            </td>
                                            <td className="text-center py-2 text-gray-600">
                                                {revenue?.currency?.name || "-"}
                                            </td>
                                            <td className="text-center py-2 text-gray-600">
                                                {revenue?.date || "-"}
                                            </td>
                                            <td className="text-center py-2">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Link to={`edit/${revenue.id}`} state={{ revenue }}>
                                                        <FaEdit color='#4CAF50' size="24" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenDelete(revenue.id)}
                                                    >
                                                        <MdDelete color='#D01025' size="24" />
                                                    </button>

                                                    {openDelete === revenue.id && (
                                                        <Dialog
                                                            open={true}
                                                            onClose={handleCloseDelete}
                                                            className="relative z-10"
                                                        >
                                                            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                        <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                            <PiWarningCircle color='#0D47A1' size="60" />
                                                                            <div className="flex items-center">
                                                                                <div className="mt-2 text-center">
                                                                                    You will delete revenue: {revenue?.title || "-"}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                            <button 
                                                                                className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" 
                                                                                onClick={() => handleDelete(revenue.id, revenue?.title)}
                                                                            >
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
                            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-mainColor text-white hover:bg-blue-600"} transition-all`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RevenueListPage;