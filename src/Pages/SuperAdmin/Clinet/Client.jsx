import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { useGet } from '../../../Hooks/useGet';
import StaticLoader from '../../../Components/StaticLoader';
import { useDelete } from '../../../Hooks/useDelete';
import { useAuth } from '../../../Context/Auth';
const Client = () => {
const { refetch: refetchClient, loading: loadingClient, data: DataClient } = useGet({url:'https://www.travelta.online/api/super/users'});
const [dataCline ,setDataClient] = useState([])
const { deleteData, loadingDelete, responseDelete } = useDelete();
const auth = useAuth()
  const tableData = [
    {
      UserName: 'John Doe',
      Email: 'john.doe@example.com',
      PhoneNumber: '+1234567890',
      Booking: '12345',
      Payment: 'Paid',
      Company: 'Travel Inc.',
      Destination: 'Paris, France',
      Emergency: 'Jane Doe (+0987654321)',
    },
    {
      UserName: 'Jane Smith',
      Email: 'jane.smith@example.com',
      PhoneNumber: '+0987654321',
      Booking: '67890',
      Payment: 'Pending',
      Company: 'Tourism Co.',
      Destination: 'New York, USA',
      Emergency: 'John Smith (+1234567890)',
    },
    {
      UserName: 'Michael Brown',
      Email: 'michael.brown@example.com',
      PhoneNumber: '+1122334455',
      Booking: '54321',
      Payment: 'Paid',
      Company: 'Adventure Ltd.',
      Destination: 'Tokyo, Japan',
      Emergency: 'Anna Brown (+5544332211)',
    },
  ];
useEffect(() => {
  refetchClient()
}, [refetchClient])

useEffect(() => {
  if(DataClient){
    setDataClient(DataClient.data)
  }
  console.log('data client', DataClient)
}, [DataClient])

  // Function to handle deleting a card
  const handleDelete = async (id, name) => {
    // Find the wallet by ID to check its amount
    const client = dataCline.find(client => client.id === id);

  
    // Proceed with deletion if amount is 0
    const success = await deleteData(`https://www.travelta.online/api/super/user/delete/${id}`, `${name} Deleted Success.`);
    
    if (success) {
      // Update the state to remove the deleted wallet from the list
      setDataClient(dataCline.filter((client) => client.id !== id));
    }
  
    console.log('data client', dataCline);
  };

  const exportToPDF = (row) => {
    const doc = new jsPDF();
    doc.text('User Details', 10, 10);
    doc.text(`UserName: ${row.name}`, 10, 20);
    doc.text(`Email: ${row.email}`, 10, 30);
    doc.text(`PhoneNumber: ${row.phone}`, 10, 40);
    // doc.text(`Booking: ${row.Booking}`, 10, 50);
    // doc.text(`Payment: ${row.Payment}`, 10, 60);
    // doc.text(`Company: ${row.Company}`, 10, 70);
    // doc.text(`Destination: ${row.Destination}`, 10, 80);
    doc.text(`Emergency Contact: ${row.emergency_phone}`, 10, 90);
    doc.save(`${row.name}_Details.pdf`);
  };
  return (
    <div className="w-full overflow-x-scroll scrollSection">
    {loadingClient?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) : (  <div className="p-6">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border border-gray-200 text-start text-sm">
        <thead>
          <tr className="bg-mainColor text-white uppercase text-xs text-left">
            <th className="px-4 py-3 border-b">UserName</th>
            <th className="px-4 py-3 border-b">Email</th>
            <th className="px-4 py-3 border-b">PhoneNumber</th>
         
            <th className="px-4 py-3 border-b">Emergency Reference</th>
            <th className="px-4 py-3 border-b">Documents</th>
            <th className="px-4 py-3 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {dataCline?.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200 border-b text-left"
            >
              <td className="px-4 py-3 border ">{row.name}</td>
              <td className="px-4 py-3 border ">{row.email}</td>
              <td className="px-4 py-3 border ">{row.phone}</td>

              <td className="px-4 py-3 border ">{row.emergency_phone
              }</td>
              <td className="px-4 py-3 border ">
                <button
                  onClick={() => exportToPDF(row)}   
                  className="flex items-center border border-mainColor  text-mainColor px-3 py-1 rounded text-xs"
                >
                  <FaFilePdf className="mr-2" />
                  Export to PDF
                </button>
              </td>
              <td className="px-4 py-3 flex justify-center ">
          
                <button 
                onClick={() => handleDelete(row.id,row.name)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm md:text-base w-full md:w-auto"
              >
                Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    

    
 </div>
        ) } 
       
       </div> 
  )
}

export default Client