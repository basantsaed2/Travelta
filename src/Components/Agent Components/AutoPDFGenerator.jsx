// // AutoPDFGenerator.jsx
// import React, { useEffect, useState } from 'react';
// import Invoice from './InvoicePdf';
// import Voucher from './VoucherPage';

// export default function AutoPDFGenerator({ bookingData }) {
//   const [pdfLinks, setPdfLinks] = useState({ invoice: null, voucher: null });
//   const [activeView, setActiveView] = useState('invoice');
//   const phone = bookingData?.client?.phone;

//   // 1. On mount, call your PDF API for both invoice & voucher:
//   useEffect(() => {
//     if (!bookingData?.id) return;
//     const makePdf = (type) =>
//       fetch('https://travelta.online/agent/manual_booking/pdf', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ manuel_id: bookingData.id, type })
//       })
//       .then(res => res.json())
//       .then(json => json.url); // assumes { url: 'https://…/file.pdf' }

//     Promise.all([ makePdf('invoice'), makePdf('voucher') ])
//       .then(([ invoice, voucher ]) => setPdfLinks({ invoice, voucher }))
//       .catch(console.error);
//   }, [bookingData]);

//   // 2. Handlers for Download & WhatsApp
//   const handleDownload = () => {
//     const url = pdfLinks[activeView];
//     if (!url) return alert('PDF not ready yet');
//     window.open(url, '_blank');
//   };
//   const handleWhatsApp = () => {
//     const url = pdfLinks[activeView];
//     if (!url) return alert('PDF not ready yet');
//     // prefill message with link
//     window.open(`https://wa.me/${phone}?text=Here is your ${activeView}: ${encodeURIComponent(url)}`, '_blank');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['invoice','voucher'].map(view => (
//           <button
//             key={view}
//             onClick={() => setActiveView(view)}
//             className={`px-4 py-2 rounded ${
//               activeView===view ? 'bg-indigo-600 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {view.charAt(0).toUpperCase() + view.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Actions */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={handleWhatsApp}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Send via WhatsApp
//         </button>
//         <button
//           onClick={handleDownload}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Download {activeView}
//         </button>
//       </div>

//       {/* Preview */}
//       <div className="border rounded-lg p-4 bg-white shadow">
//         {activeView === 'invoice'
//           ? <Invoice bookingData={bookingData} />
//           : <Voucher bookingData={bookingData} />
//         }
//       </div>
//     </div>
//   );
// }


// import React, { useRef, useState } from 'react';
// import Invoice from './InvoicePdf';
// import Voucher from './VoucherPage';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// export default function AutoPDFGenerator({ bookingData }) {
//   const [activeView, setActiveView] = useState('invoice');
//   const [pdfLinks, setPdfLinks] = useState({ invoice: null, voucher: null });

//   const phone = bookingData?.client?.phone;
//   const invoiceRef = useRef();
//   const voucherRef = useRef();

//   const handleDownload = (view) => {
//     const ref = view === 'invoice' ? invoiceRef.current : voucherRef.current;
//     if (!ref) return alert('Content not ready yet');
  
//     html2canvas(ref, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
  
//       const aspectRatio = canvas.width / canvas.height;
//       let imgWidth = pageWidth;
//       let imgHeight = pageWidth / aspectRatio;
  
//       if (imgHeight > pageHeight) {
//         imgHeight = pageHeight;
//         imgWidth = pageHeight * aspectRatio;
//       }
  
//       const x = (pageWidth - imgWidth) / 2;
//       const y = 0; // Align to top
  
//       pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
//       pdf.save(`${view}.pdf`);
//     }).catch((error) => {
//       console.error('Download failed:', error);
//       alert('Failed to generate PDF. Please try again.');
//     });
//   };
  
//   const handleWhatsApp = (view) => {
//     const ref = view === 'invoice' ? invoiceRef.current : voucherRef.current;
//     if (!ref) return alert('Content not ready yet');
  
//     html2canvas(ref, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
  
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
  
//       const aspectRatio = canvas.width / canvas.height;
//       let imgWidth = pageWidth;
//       let imgHeight = pageWidth / aspectRatio;
  
//       if (imgHeight > pageHeight) {
//         imgHeight = pageHeight;
//         imgWidth = pageHeight * aspectRatio;
//       }
  
//       const x = (pageWidth - imgWidth) / 2;
//       const y = 0; // Align to top
  
//       pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
  
//       // Save PDF and create a Blob URL for the file
//       const blob = pdf.output('blob');
//       const file = new File([blob], 'voucher.pdf', { type: 'application/pdf' });
//       const pdfUrl = URL.createObjectURL(file);
  
//       // Assuming public URL after uploading to server (use the actual URL)
//       const publicUrl = pdfUrl;  // In a real implementation, upload to your server to get this URL
  
//       const phoneNumber = '01100588939'; // <- You can make this dynamic if needed
//       const message = `Here is your ${view}: ${publicUrl}`;
  
//       // Open WhatsApp with the generated PDF link
//       window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
//     }).catch((err) => {
//       console.error('WhatsApp PDF generation failed:', err);
//       alert('Failed to generate PDF for WhatsApp');
//     });
//   };
  

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['invoice', 'voucher'].map((view) => (
//           <button
//             key={view}
//             onClick={() => setActiveView(view)}
//             className={`px-4 py-2 rounded ${
//               activeView === view ? 'bg-indigo-600 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {view.charAt(0).toUpperCase() + view.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Actions */}
//       <div className="flex space-x-4 mb-6">
//         <button
//           onClick={() => handleWhatsApp(activeView)}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//         >
//           Send via WhatsApp
//         </button>
//         <button
//           onClick={() => handleDownload(activeView)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Download {activeView}
//         </button>
//       </div>

//       {/* Preview */}
//       <div className="border rounded-lg p-4 bg-white shadow">
//         {activeView === 'invoice' ? (
//           <div ref={invoiceRef}>
//             <Invoice bookingData={bookingData} />
//           </div>
//         ) : (
//           <div ref={voucherRef}>
//             <Voucher bookingData={bookingData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from 'react';
import Invoice from './InvoicePdf';
import Voucher from './VoucherPage';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';  // For making API calls
import { usePost } from '../../Hooks/usePostJson';

export default function AutoPDFGenerator({ bookingData }) {
  const [activeView, setActiveView] = useState('invoice');
  const [pdfLinks, setPdfLinks] = useState({ invoice: null, voucher: null });
  const [whatsappLink, setWhatsappLink] = useState(null);  // For WhatsApp button URL
  const { postData, loading: posting, response } = usePost({ url: 'https://travelta.online/agent/manual_booking/pdf' });

  const phone = bookingData?.client?.phone;
  const invoiceRef = useRef();
  const voucherRef = useRef();

  useEffect(() => {
    if (!posting && response) {
      console.log('Server response:', response.data);
      // After successful upload, set the WhatsApp link
      if (response.data?.pdfUrl) {
        setWhatsappLink(`https://wa.me/${phone}?text=${encodeURIComponent('Here is your ' + activeView + ': ' + response.data.pdfUrl)}`);
      }
    }
  }, [posting, response, phone, activeView]);

  // Function to generate the PDF and upload it to the server
  const uploadPDFToServer = async (pdfBlob, view) => {
    const formData = new FormData();
    const file = new File([pdfBlob], `${view}.pdf`, { type: 'application/pdf' });
    formData.append(view, file);
    formData.append('manual_id', bookingData.cart_id);

    postData(formData);  // Upload the file
  };


  const handleDownload = (view) => {
    const ref = view === 'invoice' ? invoiceRef.current : voucherRef.current;
    if (!ref) return alert('Content not ready yet');
  
    html2canvas(ref, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const aspectRatio = canvas.width / canvas.height;
      let imgWidth = pageWidth;
      let imgHeight = pageWidth / aspectRatio;
  
      if (imgHeight > pageHeight) {
        imgHeight = pageHeight;
        imgWidth = pageHeight * aspectRatio;
      }
  
      const x = (pageWidth - imgWidth) / 2;
      const y = 0; // Align to top
  
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save(`${view}.pdf`);
    }).catch((error) => {
      console.error('Download failed:', error);
      alert('Failed to generate PDF. Please try again.');
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto p-2">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['invoice', 'voucher'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 rounded ${activeView === view ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mb-6">
        {whatsappLink && (
          <button
            onClick={() => window.open(whatsappLink, '_blank')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Send via WhatsApp
          </button>
        )}
        <button
          onClick={() => handleDownload(activeView)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download {activeView}
        </button>
      </div>

      {/* Preview */}
      <div className="border rounded-lg p-4 bg-white shadow">
        {activeView === 'invoice' ? (
          <div ref={invoiceRef}>
            <Invoice bookingData={bookingData} />
          </div>
        ) : (
          <div ref={voucherRef}>
            <Voucher bookingData={bookingData} />
          </div>
        )}
      </div>
    </div>
  );
}
