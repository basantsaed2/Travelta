import React, { useEffect,useState } from 'react';


import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import StaticLoader from '../../../../Components/StaticLoader';

const AccountSupplier = () => {
    const { refetch: refetchSupplier, loading: loadingSupplier, data: dataSupplier } = useGet({url:'https://travelta.online/agent/supplier'});
    const [suppliers, setSuppliers] = useState([])
    const { deleteData, loadingDelete, responseDelete } = useDelete();
    const [openDelete, setOpenDelete] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        refetchSupplier();
    }, [refetchSupplier]);

    useEffect(() => {
        if (dataSupplier && dataSupplier.supplier_agent) {
                console.log("Suppliers Data:", dataSupplier);
                setSuppliers(dataSupplier.supplier_agent);
        }
    }, [dataSupplier]); // Only run this effect when `data` changes

    const handleOpenDelete = (item) => {
        setOpenDelete(item);
      };
      const handleCloseDelete = () => {
        setOpenDelete(null);
      };
    
      // Delete Customer
      const handleDelete = async (id, name) => {
        const success = await deleteData(`https://travelta.online/agent/supplier/delete/${id}`, `${name} Deleted Success.`);
    
        if (success) {
          // Update Deliveries only if changeState succeeded
          setSuppliers(
            suppliers.filter((supplier) =>
                supplier.id !== id
            )
          );
        }
        console.log('data Suppliers', suppliers)
      };

  const headers = ['SL', 'Name','Email', 'Phone',"Admin Name","Admin Email","Admin Phone","Transaction","Action"];

  return (
    <div className="w-full pb-5 flex items-start justify-start overflow-x-scroll scrollSection">
      {loadingSupplier  ? (
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
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={12} className='text-center text-xl text-mainColor font-TextFontMedium  '>Not find Suppliers</td>
              </tr>
            ) : (
                suppliers.map((supplier, index) => ( 
                <tr className="w-full border-b-2" key={index}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.agent|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.emails[0] ||supplier?.emails|| '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.phones[0] ||supplier?.phones ||'-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.admin_name || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.admin_email || '-'}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {supplier?.admin_phone || '-'}
                  </td>
              
<td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
  {supplier?.id ? (
    <Link
      to={`/dashboard_agent/accounting/account_transaction/${supplier.id}`} 
      className="text-blue-500 hover:underline underline"
    >
      View
    </Link>
  ) : (
    "-"
  )}
</td>

                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                    {/* <Link to={`edit/${supplier.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link> */}
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
                                      You will delete supplier {supplier?.agent || "-"}
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(supplier.id, supplier?.agent)}>
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

export default AccountSupplier