import React, { useState } from 'react';
import TitlePage from '../../../../Components/TitlePage';
import { LeadPage } from '../../../../Pages/AllPages';
import AddButton from '../../../../Components/Buttons/AddButton';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

const LeadLayout = () => {
  const [update, setUpdate] = useState(false);

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

  return (
    <>
      <div className='flex justify-between items-center mb-3'>
        <div className='w-1/2'>
        <TitlePage text={'Lead Table'} />
        </div>
        <div className="flex gap-3">
          <Link to='add'>
            <AddButton />
          </Link>
          <button
            onClick={handleDownloadBulk}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Import Bulk
          </button>
        </div>
      </div>
      <LeadPage update={update} setUpdate={setUpdate} />
    </>
  );
};

export default LeadLayout;
