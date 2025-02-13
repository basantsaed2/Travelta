import React, { useEffect, useRef, useState } from "react";
import InvoicePDF from "./InvoicePdf";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../Hooks/useGet";
import StaticLoader from "../StaticLoader";

import html2canvas from "html2canvas";
import jsPDF from"jspdf";

const InvoicePage = ({bookingData}) => {
  const { refetch: refetchData, loading: loadingData, data: Data } = useGet({
    url: "https://travelta.online/agent/booking",
  });

  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  const downloadInvoice = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    // Capture the invoice as an image
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL("image/png");

    // Convert to PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
};


  useEffect(() => {
    refetchData();
  }, [refetchData]);

//   useEffect(() => {
//     if (Data) {
//       console.log("Fetched Data:", Data);

//       // Extract data dynamically
//       const formattedData = {
//         bus: Data.current?.buses?.[0] || null, // Get the first bus
//         flight: Data.current?.flights?.[0] || null, // Get the first flight
//         hotel: Data.current?.hotels?.[0] || null, // Get the first hotel
//         tour: Data.current?.tours?.[0] || null, // Get the first tour
//         visa: Data.current?.visas?.[0] || null, // Get the first visa

//         agent_data: {
//           name: "Travel Agent",
//           email: "agent@example.com",
//           phone: "+987654321",
//         },
//       };

//       setInvoiceData(formattedData);
//     }
//   }, [Data]);

  return (
    <div className="flex w-full flex-col items-center">
      <h2 className="text-2xl font-bold text-blue-600 mb-4"></h2>

      {loadingData ? (
        <p><StaticLoader /></p>
      ) : bookingData ? (
        <>
          {/* PDF Viewer */}
          <div className="border rounded-md shadow-lg w-full" ref={invoiceRef}>
            <InvoicePDF bookingData={bookingData} />
          </div>

                {/* Download Button */}
                <button
            onClick={downloadInvoice}
            className="mt-4 p-2 bg-blue-600 text-white rounded-md"
          >
            Download PDF
          </button>
        
        </>
      ) : (
        <p>No invoice data available.</p>
      )}
    </div>
  );
};

export default InvoicePage;
