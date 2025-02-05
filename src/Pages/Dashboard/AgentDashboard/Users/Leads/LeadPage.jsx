import React, { useEffect,useState } from 'react';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useGet } from '../../../../../Hooks/useGet';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LeadPage = ({ refetch, setUpdate }) => {
    const { refetch: refetchLead, loading: loadingLead, data: dataLead } = useGet({url:'https://travelta.online/agent/leads'});
    const [leads, setLeads] = useState([])
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const navigate= useNavigate()
    useEffect(() => {
        refetchLead();
    }, [refetchLead, refetch]);

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
    
      // Delete Customer
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

  const headers = ['SL', 'Name','Email', 'Phone',"Gender","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingLead  ? (
        <div className="w-full h-56 flex justify-center items-center">
          <StaticLoader />
        </div>
      ) : (
        <table className="w-full sm:min-w-0">
          <thead className="w-full">
            <tr className="w-full border-b-2">
              {headers.map((name, index) => (
                <th className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Leads</td>
              </tr>
            ) : (
                leads.map((lead, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {lead?.name|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {lead?.email || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {lead?.phone || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {lead?.gender || '-'}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenDelete(lead.id)}
                      >
                        <MdDelete color='#D01025' size="24"/>
                      </button>
                      <button
                        type="button"
                      >
                            <FaUserCircle
                              className="w-10 h-10 text-mainColor  cursor-pointer hover:text-blue-500 transition-all"
                              onClick={() => navigate(`/dashboard_agent/users/leads/profilee/${lead?.id}`)}
                            />
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
                                  <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(lead.id, lead?.name)}>
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
      )}
    </div>
  );
}

export default LeadPage