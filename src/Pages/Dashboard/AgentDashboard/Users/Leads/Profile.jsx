import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { FaEnvelope, FaUser,FaEdit, FaPhone, FaCalendarCheck,FaFlag ,FaMapMarkerAlt ,FaWhatsapp,FaSearch } from "react-icons/fa";
import { FaChevronDown } from 'react-icons/fa6';

const Profile = ({ id }) => {
  const { refetch: refetchLeadProfile, loading: loadingLeadProfile, data: LeadProfile } = useGet({
    url: `https://travelta.online/agent/leads/profile/${id}`,
  });
  const [data, setData] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    refetchLeadProfile();
  }, [refetchLeadProfile]);

  useEffect(() => {
    if (LeadProfile && LeadProfile.requests) {
      setData(LeadProfile.customer_info); // Entire response
      setRequests(LeadProfile?.requests || []); // Safely set requests array
    }
  }, [LeadProfile]);

  if (loadingLeadProfile) {
    return <StaticLoader />;
  }

  return (
    <div className=" p-2 space-y-6">
      <div className="shadow-lg w-full xl:w-[80%] rounded-2xl p-4 border border-gray-300 transition-all hover:shadow-2xl relative bg-white flex flex-col md:flex-row gap-6 items-center">
        {/* Left: Profile Image */}
        <div className='w-full md:w-1/4 flex flex-col gap-3'>
          <div className="relative flex justify-center ">
            <img
              src={data?.image_link || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="md:w-36 md:h-36 w-full h-64 object-fit rounded-lg border border-gray-300 shadow-md"
            />
          </div>
          <h3 className="text-xl font-semibold text-mainColor text-center">{data?.name || '_'}</h3>
        </div>

        {/* Right: User Details */}
        <div className="w-full space-y-2">
          <span className="inline-block bg-green-200 text-green-700 text-sm font-medium px-3 py-1 rounded-full">Active</span>

          {/* Contact Info */}
          <div className=" grid grid-cols-1 md:grid-cols-2">
            <p className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-mainColor" />
              {data?.phone || "-"}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaWhatsapp className="text-mainColor" />
              {data?.watts || "-"}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-mainColor" />
              {data?.email || "-"}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaFlag className="text-mainColor" />
              {data?.nationality?.name || "-"}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaFlag className="text-mainColor" />
              {data?.country?.name || "-"}
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-mainColor" />
              {data?.city?.name || "-"}
            </p>
          </div>

          {/* Button */}
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg mt-4 hover:bg-blue-700">
            Upload Attachments
          </button>
        </div>
      </div>
    
        {/* <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
            {loadingOwner? (
              <div className="w-full h-56 flex justify-center items-center">
                <StaticLoader />
              </div>
            ) : (
              <div className="w-full sm:min-w-0">
                <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
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
      
                  <div className="relative w-full md:w-[240px]">
                    <select
                      onChange={handleFilterType}
                      value={selectedCurrency}
                      className="appearance-none w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Filter by currency</option>
                      {uniqueType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <FaFilter className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                  </div>
      
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
                  >
                    <FaFileExcel className="w-5 h-5" />
                    Export to Excel
                  </button>
                </div>
      
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
                      {currentRows.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center text-xl text-gray-500 py-4">
                            No Owners Found
                          </td>
                        </tr>
                      ) : (
                        currentRows.map((owner, index) => (
                          <tr
                            key={index}
                            className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                          >
                            <td className="text-center py-2">{indexOfFirstRow + index + 1}</td>
                            <td className="text-center py-2 text-gray-600">{owner?.name || "-"}</td>
                            <td className="text-center py-2 text-gray-600">
                                {owner?.phone ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <span>{owner.phone}</span>
                                    <FaCopy
                                      className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                      onClick={() => copyToClipboard(owner.phone)}
                                    />
                                  </div>
                                ) : (
                                  "-"
                                )}
                              {copiedPhone === owner.phone && <span className="text-green-500 text-xs ml-2">Copied!</span>}
                            </td>
                            <td className="text-center py-2 text-gray-600">{owner?.balance || 0} {owner?.currency?.name}</td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center gap-1">
                              <Link to={`edit/${owner.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(owner.id)}
                                >
                                  <MdDelete color='#D01025' size="24"/>
                                </button>
                  
                                {openDelete === owner.id && (
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
                                                You will delete owner {owner?.name || "-"}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(owner)}>
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
        </div> */}
   
    </div>
  );
};

export default Profile;
