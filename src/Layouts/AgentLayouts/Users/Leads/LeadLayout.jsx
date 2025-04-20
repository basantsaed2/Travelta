// import React, { useState } from 'react';
// import TitlePage from '../../../../Components/TitlePage';
// import { LeadPage } from '../../../../Pages/AllPages';
// import AddButton from '../../../../Components/Buttons/AddButton';
// import { Link } from 'react-router-dom';
// import * as XLSX from 'xlsx';
// import { usePost } from '../../../../Hooks/usePostJson';
// const LeadLayout = () => {
//   const [update, setUpdate] = useState(false);
//   const { postData, loadingPost, response} = usePost({ url: 'https://travelta.online/agent/leads/import_excel' });

//   const handleDownloadBulk = () => {
//     const headers = [
//       "name", "phone", "email", "watts", "emergency_phone", "gender",
//       "source", "service", "nationality", "country",
//       "city", "image"
//     ];

//     const worksheet = XLSX.utils.aoa_to_sheet([headers]); 
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Leads_Template");

//     XLSX.writeFile(workbook, "Leads_Bulk_Template.xlsx");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', name);

//     postNewLead(formData, 'Bulk Uploaded Success');
// };

//   return (
//     <>
//       <div className='flex justify-between items-center mb-3'>
//         <div className='w-1/2'>
//         <TitlePage text={'Lead Table'} />
//         </div>
//         <div className="flex gap-3">
//           <Link to='add'>
//             <AddButton />
//           </Link>
//           <button
//             onClick={handleDownloadBulk}
//             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//           >
//             Import Bulk
//           </button>
//         </div>
//       </div>
//       <LeadPage update={update} setUpdate={setUpdate} />
//     </>
//   );
// };

// export default LeadLayout;


import React, { useState } from 'react';
import TitlePage from '../../../../Components/TitlePage';
import { LeadPage } from '../../../../Pages/AllPages';
import AddButton from '../../../../Components/Buttons/AddButton';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { usePost } from '../../../../Hooks/usePostJson';

const LeadLayout = () => {
  const [update, setUpdate] = useState(false);
  const [file, setFile] = useState(null);
  const { postData, loadingPost, response } = usePost({ url: 'https://travelta.online/agent/leads/import_excel' });

  const handleDownloadBulk = () => {
    const headers = [
      "name", "phone", "email", "watts", "emergency_phone", "gender",
      "source", "service", "nationality", "country",
      "city", "image"
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers]); 
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads_Template");

    XLSX.writeFile(workbook, "Leads_Bulk_Template.xlsx");
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    await postData(formData);
    setUpdate(prev => !prev); // Refresh the leads table after upload
    setFile(null);
  };

  return (
    <>
      <div className='w-full flex flex-col lg:flex-row lg:items-center justify-between mb-3'>
        <div className='w-full md:w-1/4'>
          <TitlePage text={'Lead Table'} />
        </div>
          <div className='flex flex-col lg:flex-row gap-2'>
          <Link to='add'>
            <AddButton Text="Add New Lead" Size="lg"/>
          </Link>
          <div className='flex gap-2'>
          <button
            onClick={handleDownloadBulk}
            className="bg-green-500 text-sm xl:text-base text-white px-2 md:px-4 py-2 rounded-md cursor-pointer hover:bg-green-600 transition"
          >
            Download Template
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="bg-blue-500 text-sm xl:text-base text-white px-2 md:px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition"
          >
            Upload Bulk
          </label>
          {file && (
            <button
              onClick={handleSubmit}
              className="bg-red-500 text-sm xl:text-base text-white px-2 md:px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition"
            >
              Submit
            </button>
          )}
          </div>
          </div>
        </div>
      <LeadPage update={update} setUpdate={setUpdate} />
    </>
  );
};

export default LeadLayout;
