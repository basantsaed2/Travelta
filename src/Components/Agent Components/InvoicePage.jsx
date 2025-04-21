// import React, { useEffect, useRef, useState } from "react";
// import InvoicePDF from "./InvoicePdf";
// import { useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from"jspdf";

// const InvoicePage = ({bookingData}) => {
//   const navigate = useNavigate();
//   const invoiceRef = useRef(null);

//   const downloadInvoice = async () => {
//     const element = invoiceRef.current;
//     if (!element) return;

//     // Capture the invoice as an image
//     const canvas = await html2canvas(element);
//     const imageData = canvas.toDataURL("image/png");

//     // Convert to PDF
//     const pdf = new jsPDF("p", "mm", "a4");
//     const imgWidth = 210; // A4 width in mm
    // const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
//     pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
//     pdf.save("invoice.pdf");
// };

//   return (
//     <div className="flex w-full flex-col items-center">
//       <h2 className="text-2xl font-bold text-blue-600 mb-4"></h2>
//       {bookingData ? (
//         <>
//           {/* PDF Viewer */}
//           <div className="border rounded-md shadow-lg w-full" ref={invoiceRef}>
//             <InvoicePDF bookingData={bookingData} />
//           </div>

//                 {/* Download Button */}
//           <button
//             onClick={downloadInvoice}
//             className="mt-4 p-2 bg-blue-600 text-white rounded-md"
//           >
//             Download PDF
//           </button>
        
//         </>
//       ) : (
//         <p>No invoice data available.</p>
//       )}
//     </div>
//   );
// };

// export default InvoicePage;


import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import Invoice from './InvoicePdf';
import Voucher from './VoucherPage';

export default function InvoiceVoucherExporter({ bookingData }) {
  const invoiceRef = useRef();
  const voucherRef = useRef();
  const [pdfUrls, setPdfUrls] = useState({ invoice: null, voucher: null });
  const [activeView, setActiveView] = useState('invoice');
  const phone = bookingData?.client?.phone;

  // Capture DOM node and convert to PDF blob
  const capturePdfBlob = async (ref) => {
    const element = ref.current;
    if (!element) throw new Error('Element not found');
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    return pdf.output('blob');
  };

  // Ensure both PDFs are generated and URLs created
  const ensurePdfs = async () => {
    if (pdfUrls.invoice && pdfUrls.voucher) return;
    const [invBlob, vouBlob] = await Promise.all([
      capturePdfBlob(invoiceRef),
      capturePdfBlob(voucherRef)
    ]);
    setPdfUrls({
      invoice: URL.createObjectURL(invBlob),
      voucher: URL.createObjectURL(vouBlob)
    });
  };

  // Download handler for active view
  const handleDownload = async () => {
    await ensurePdfs();
    const url = pdfUrls[activeView];
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeView}-${bookingData.id}.pdf`;
    a.click();
  };

  // WhatsApp handler for active view
  const handleWhatsApp = async () => {
    await ensurePdfs();
    const url = pdfUrls[activeView];
    window.open(
      `https://wa.me/${phone}?text=Your ${activeView}: ${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  // Upload both PDF blobs to API in one request
  const handleUploadAll = async () => {
    try {
      const [invBlob, vouBlob] = await Promise.all([
        capturePdfBlob(invoiceRef),
        capturePdfBlob(voucherRef)
      ]);

      const form = new FormData();
      form.append('manuel_id', bookingData.id);
      form.append('invoice', invBlob, 'invoice.pdf');
      form.append('voucher', vouBlob, 'voucher.pdf');

      const res = await fetch(
        'https://travelta.online/agent/manual_booking/pdf',
        { method: 'POST', body: form }
      );
      if (!res.ok) throw new Error('Upload failed');
      alert('Invoice and voucher successfully sent to API');
    } catch (err) {
      console.error(err);
      alert('Failed to upload PDFs to API');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Hidden renderers for capture */}
      <div style={{ position: 'absolute', top: -9999, left: -9999, visibility: 'hidden' }}>
        <div ref={invoiceRef}><Invoice bookingData={bookingData} /></div>
        <div ref={voucherRef}><Voucher bookingData={bookingData} /></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {['invoice', 'voucher'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded ${
              activeView === view ? 'bg-indigo-600 text-white' : 'bg-gray-200'
            }`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download {activeView}
        </button>
        <button
          onClick={handleWhatsApp}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Send via WhatsApp
        </button>
        <button
          onClick={handleUploadAll}
          className="bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Upload Both to API
        </button>
      </div>

      {/* Preview the PDF (once generated) */}
      <div className="border rounded shadow h-[600px] overflow-hidden">
        {pdfUrls[activeView] ? (
          <embed
            src={pdfUrls[activeView]}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        ) : (
          <p className="p-6 text-center text-gray-500">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)} preview will appear here…
          </p>
        )}
      </div>
    </div>
  );
}