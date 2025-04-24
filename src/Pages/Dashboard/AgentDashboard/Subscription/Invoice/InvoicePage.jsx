import React, { useEffect, useState } from "react";
import { useGet } from "../../../../../Hooks/useGet";
import { format, parseISO, isAfter } from "date-fns";
import { Link } from "react-router-dom";
import { 
  FiCreditCard, 
  FiDownload, 
  FiAlertTriangle, 
  FiCheckCircle,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiPercent,
  FiTag,
  FiInfo
} from "react-icons/fi";
import { 
  FaRegMoneyBillAlt,
  FaExclamationCircle
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

const InvoicePage = ({ update }) => {
  const { refetch: refetchInvoice, loading: loadingInvoice, data: DataInvoice } = useGet({ url: 'https://www.travelta.online/agent/invoice' });
  
  const [invoiceData, setInvoiceData] = useState(null);
  const [isOverdue, setIsOverdue] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    originalPrice: 0,
    fineAmount: 0,
    subtotal: 0,
    discountAmount: 0,
    totalDue: 0
  });

  useEffect(() => {
    refetchInvoice();
  }, [refetchInvoice, update]);

  useEffect(() => {
    if (DataInvoice) {
      setInvoiceData(DataInvoice);
      
      const today = new Date();
      const allowDate = parseISO(DataInvoice.allow_date);
      const datePassed = isAfter(today, allowDate);
      setIsOverdue(datePassed);

      // Calculate payment details
      const originalPrice = parseFloat(DataInvoice.plan.price) || 0;
      const fineAmount = datePassed ? parseFloat(DataInvoice.fine) || 0 : 0;
      const subtotal = originalPrice + fineAmount;

      // Calculate discount (applied after fine)
      let discountAmount = 0;
      if (DataInvoice.plan.discount_type === "percentage") {
        discountAmount = subtotal * (parseFloat(DataInvoice.plan.discount_value) / 100);
      } else {
        discountAmount = parseFloat(DataInvoice.plan.discount_value) || 0;
      }

      const totalDue = subtotal - discountAmount;

      setPaymentDetails({
        originalPrice,
        fineAmount,
        subtotal,
        discountAmount,
        totalDue
      });
    }
  }, [DataInvoice]);

  if (loadingInvoice) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!invoiceData) return (
    <div className="text-center py-10">
      <p className="text-gray-500">No invoice data available</p>
    </div>
  );

  return (
    <div className="w-full px-4">
      {/* Invoice Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-4 md:px-6 py-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-xl md:text-3xl font-bold flex items-center">
                <FaRegMoneyBillAlt className="mr-3" />
                Subscription Invoice
              </h1>
              <p className="text-blue-100 mt-1 text-sm md:text-base">Plan renewal details and payment summary</p>
            </div>
            <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full text-sm font-medium ${isOverdue ? 'bg-red-500/20 text-red-100' : 'bg-green-500/20 text-green-100'}`}>
              <div className="flex items-center">
                {isOverdue ? (
                  <>
                    <IoIosWarning className="mr-2 text-lg" />
                    <span>Payment Overdue</span>
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="mr-2" />
                    <span>Active Subscription</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Plan Details */}
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiInfo className="mr-2 text-blue-600" />
                Plan Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiTag className="mr-2" />
                    Plan:
                  </span>
                  <span className="font-medium text-gray-800">{invoiceData.plan.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiCalendar className="mr-2" />
                    Period:
                  </span>
                  <span className="font-medium text-gray-800">{invoiceData.plan.period_in_days} days</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiCalendar className="mr-2" />
                    Start Date:
                  </span>
                  <span className="font-medium text-gray-800">{format(parseISO(invoiceData.start_date), 'PP')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiCalendar className="mr-2" />
                    End Date:
                  </span>
                  <span className="font-medium text-gray-800">{format(parseISO(invoiceData.end_date), 'PP')}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FiClock className="mr-2 text-blue-600" />
                Payment Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiCalendar className="mr-2" />
                    Due Date:
                  </span>
                  <span className={`font-medium ${isOverdue ? 'text-red-500' : 'text-gray-800'}`}>
                    {format(parseISO(invoiceData.allow_date), 'PP')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 flex items-center">
                    <FiClock className="mr-2" />
                    Days {isOverdue ? 'Overdue' : 'Remaining'}:
                  </span>
                  <span className={`font-medium ${isOverdue ? 'text-red-500' : 'text-green-600'}`}>
                    {Math.abs(Math.floor((new Date() - parseISO(invoiceData.allow_date)) / (1000 * 60 * 60 * 24)))} days
                  </span>
                </div>
                {isOverdue && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 flex items-center">
                      <FiAlertTriangle className="mr-2 text-yellow-500" />
                      Late Fee:
                    </span>
                    <span className="font-medium text-red-500">{invoiceData.fine} {invoiceData.plan.currancy.currancy_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="p-4 md:p-6">
          <div className="bg-white border border-gray-200 rounded-lg p-2 md:p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
              <FiDollarSign className="mr-2 text-blue-600" />
              Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">{paymentDetails.originalPrice.toFixed(2)} {invoiceData.plan.currancy.currancy_name}</span>
              </div>

              {isOverdue && (
                <div className="flex justify-between items-center py-3 px-4 bg-red-50 rounded">
                  <span className="text-gray-600">Late Fee:</span>
                  <span className="font-medium text-red-500">+{paymentDetails.fineAmount.toFixed(2)} {invoiceData.plan.currancy.currancy_name}</span>
                </div>
              )}

              <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{paymentDetails.subtotal.toFixed(2)} {invoiceData.plan.currancy.currancy_name}</span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded">
                <span className="text-gray-600 flex items-center">
                  {invoiceData.plan.discount_type === "percentage" ? (
                    <FiPercent className="mr-1" />
                  ) : (
                    <FiDollarSign className="mr-1" />
                  )}
                  Discount ({invoiceData.plan.discount_type}):
                </span>
                <span className="font-medium text-green-600">
                  - {paymentDetails.discountAmount.toFixed(2)} {invoiceData.plan.currancy.currancy_name}
                  {invoiceData.plan.discount_type === "percentage" && ` (${invoiceData.plan.discount_value}%)`}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded">
                  <span className="text-gray-800 font-semibold">Total Amount Due:</span>
                  <span className={`text-xl font-bold ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                    {paymentDetails.totalDue.toFixed(2)} {invoiceData.plan.currancy.currancy_name}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <Link
                to="/dashboard/checkout"
                state={{
                  plan: invoiceData.plan,
                  totalPrice: paymentDetails.subtotal,
                  totalDiscountPrice: paymentDetails.totalDue
                }}
                className="flex-1 w-1/2 text-center px-4 md:p-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow hover:shadow-lg transition-all flex items-center justify-center hover:from-blue-700 hover:to-blue-800"
              >
                <FiCreditCard className="w-5 h-5 mr-2" />
                {isOverdue ? 'Pay Now with Late Fee' : 'Renew Subscription'}
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        {isOverdue && (
          <div className="bg-red-50 px-8 py-4 border-t border-red-100">
            <div className="flex items-start">
              <FaExclamationCircle className="text-red-400 mt-1 mr-3 text-xl flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-600">
                  Your subscription has expired. Immediate payment is required to avoid service interruption.
                </p>
                <p className="text-sm text-red-500 mt-1">
                  A late fee of {invoiceData.fine} {invoiceData.plan.currancy.currancy_name} has been applied to your total amount due.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;