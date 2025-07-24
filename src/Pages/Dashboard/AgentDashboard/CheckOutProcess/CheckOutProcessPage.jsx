import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGet } from '../../../../Hooks/useGet';
import { usePost } from '../../../../Hooks/usePostJson';
import StaticLoader from '../../../../Components/StaticLoader';
import AutoPDFGenerator from '../../../../Components/Agent Components/AutoPDFGenerator';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiPlus, FiX, FiCheckCircle } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';

export default function CheckOutProcessPage() {
  const { state } = useLocation();
  const cartId = state?.cartData?.cart_id;

  const { refetch: loadCart, loading: cartLoading, data: cartRes } = useGet({
    url: `https://travelta.online/agent/manual_booking/cart_data/${cartId}`
  });
  const { refetch: loadAccounts, loading: accountsLoading, data: accountsRes } = useGet({
    url: 'https://travelta.online/agent/manual_booking/lists'
  });
  const { postData, loading: posting, response } = usePost({ url: 'https://travelta.online/agent/manual_booking' });

  const [cartDetails, setCartDetails] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [paymentType, setPaymentType] = useState(null);
  const [fullSplits, setFullSplits] = useState([]);
  const [initialSplits, setInitialSplits] = useState([]);
  const [scheduleSplits, setScheduleSplits] = useState([]);

  const paymentOptions = [
    { value: 'full', label: 'Full Payment' },
    { value: 'partial', label: 'Partial Payment' },
    { value: 'later', label: 'Pay Later' }
  ];

  useEffect(() => {
    if (!paymentType) return;
    const today = new Date();
    if (paymentType.value === 'full') {
      setFullSplits([{ account: null, amount: '' }]);
      setInitialSplits([]);
      setScheduleSplits([]);
    } else if (paymentType.value === 'partial') {
      setInitialSplits([{ account: null, amount: '' }]);
      setScheduleSplits([{ date: null, amount: '', account: null }]);
      setFullSplits([]);
    } else {
      setScheduleSplits([{ date: null, amount: '', account: null }]);
      setFullSplits([]);
      setInitialSplits([]);
    }
  }, [paymentType]);

  useEffect(() => {
    if (cartId) {
      loadCart();
      loadAccounts();
    }
  }, [cartId]);

  useEffect(() => {
    if (cartRes?.data) setCartDetails(cartRes.data);
    if (accountsRes?.financial_accounting) setAccounts(accountsRes.financial_accounting);
  }, [cartRes, accountsRes]);

  const totalPrice = parseFloat(cartDetails?.total_price || 0);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayDate = new Date();

  const updateList = (list, setter, idx, field, val) => {
    const copy = [...list];
    copy[idx][field] = val;
    setter(copy);
  };
  const addToList = (setter, template) => setter(prev => [...prev, template]);
  const removeFromList = (list, setter, idx) => setter(list.filter((_, i) => i !== idx));

  const sumSplits = list => list.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
  const fullValid = () => sumSplits(fullSplits) === totalPrice && fullSplits.every(s => s.account && s.amount);
  const partialValid = () => {
    const initSum = sumSplits(initialSplits);
    const rem = totalPrice - initSum;
    const schedSum = sumSplits(scheduleSplits);
    return initSum > 0 && schedSum === rem && initialSplits.every(s => s.account && s.amount);
  };
  const laterValid = () => sumSplits(scheduleSplits) === totalPrice;

  const canSubmit = paymentType
    ? paymentType.value === 'full' ? fullValid()
      : paymentType.value === 'partial' ? partialValid()
      : laterValid()
    : false;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const totalScheduled =
      paymentType?.value === 'full'
        ? sumSplits(fullSplits)
        : paymentType?.value === 'partial'
        ? sumSplits(initialSplits) + sumSplits(scheduleSplits)
        : sumSplits(scheduleSplits);
  
    const remainingAmount = totalPrice - totalScheduled;
  
    if (remainingAmount !== 0) {
      alert("Please complete the payment before proceeding.");
      return;
    }
  
    const formData = new FormData();
    formData.append('cart_id', cartId);
    formData.append('total_cart', totalPrice);
    formData.append('payment_type', paymentType?.value);
  
    if (paymentType?.value === "full") {
      formData.append("payment_methods", JSON.stringify(fullSplits.map((s) => ({
        payment_method_id: s.account.value,
        amount: s.amount
      }))));
    } else if (paymentType?.value === "partial") {
      const payments = scheduleSplits.map((s) => ({
        date: s.date?.toISOString().split("T")[0],
        amount: Number(s.amount)
      }));
    
      const paymentMethods = initialSplits
        .filter(s => s.account?.value && s.amount) // Optional: filter out incomplete
        .map((s) => ({
          payment_method_id: s.account.value,
          amount: Number(s.amount)
        }));
    
      formData.append("payments", JSON.stringify(payments));
      formData.append("payment_methods", JSON.stringify(paymentMethods));    
    } else if (paymentType?.value === "later") {
      const payments = scheduleSplits.map((s) => ({
        date: s.date?.toISOString().split("T")[0],
        amount: Number(s.amount)
      }));
      formData.append("payments", JSON.stringify(payments));
    }
  
    postData(formData, "Booking Checkout Added Successfully");
  };  

  if (cartLoading || accountsLoading) return <StaticLoader className="h-56" />;
  if (response && !posting) return <AutoPDFGenerator bookingData={response?.data} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-5 font-sans">
      <div className="w-full bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-sky-500 text-white p-4">
          <h1 className="text-2xl font-semibold flex items-center gap-3">
            <MdPayment className="text-2xl" /> Booking Checkout
          </h1>
          <p className="mt-3 text-xl font-medium">Total: {totalPrice.toFixed(2)} EGP</p>
        </div>

        <div className="p-4 md:p-8 space-y-5">
          <div>
            <label className="block text-gray-700 text-xl font-semibold mb-3">Payment Option</label>
            <Select options={paymentOptions} value={paymentType} onChange={setPaymentType} placeholder="Select option" className="text-lg" />
          </div>

          {(paymentType?.value === 'full' || paymentType?.value === 'partial' || paymentType?.value === 'later') && (
            <div className="space-y-4">
              {paymentType.value === 'full' && renderSplits(fullSplits, setFullSplits, 'Full Payment - Split Across Accounts')}
              {paymentType.value === 'partial' && (
                <>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Partial Payment</h2>
                    <p className="text-lg text-gray-600 mb-5">Initial Payment (Today)</p>
                    {renderSplits(initialSplits, setInitialSplits)}
                    {/* <button onClick={() => addToList(setInitialSplits, { account: null, amount: '' })} className="text-lg text-blue-600 hover:underline mt-3">
                      <FiPlus className="inline-block mr-2" /> Add Initial Split
                    </button> */}
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-5">Schedule Remaining Amount</p>
                    {renderScheduleSplits(scheduleSplits, setScheduleSplits)}
                  </div>
                </>
              )}
              {paymentType.value === 'later' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Pay Later - Schedule Payments</h2>
                  {renderScheduleSplits(scheduleSplits, setScheduleSplits)}
                </div>
              )}
            </div>
          )}

          <div className="pt-8 border-t border-gray-300">
            <p className="text-lg font-semibold">Total Scheduled:
              <span className="text-indigo-600 ml-2">{(
                paymentType?.value === 'full' ? sumSplits(fullSplits)
                : paymentType?.value === 'partial' ? sumSplits(initialSplits) + sumSplits(scheduleSplits)
                : sumSplits(scheduleSplits)
              ).toFixed(2)} EGP</span>
            </p>
            <p className="text-base text-gray-600">Sum must equal {totalPrice.toFixed(2)} EGP to proceed.</p>
            <button onClick={handleSubmit} disabled={!canSubmit} className="mt-8 w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-xl disabled:opacity-50 hover:bg-green-700 transition duration-300">
              <FiCheckCircle className="inline-block mr-3" /> Confirm & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function renderSplits(list, setter, title = '') {
    return (
      <div>
        {title && <h2 className="text-md md:text-xl font-semibold text-gray-700 mb-2">{title}</h2>}
        {list.map((s, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
            <Select options={accounts.map(a => ({ value: a.id, label: a.name }))} value={s.account} onChange={opt => updateList(list, setter, i, 'account', opt)} className="flex-1 text-lg" />
            <input type="number" min="0" placeholder="Amount" value={s.amount} onChange={e => updateList(list, setter, i, 'amount', e.target.value)} className="w-full md:w-1/4 p-2 border rounded-lg shadow-md text-lg" />
            {list.length > 1 && (
              <button onClick={() => removeFromList(list, setter, i)} className="text-red-600 text-2xl"><FiX /></button>
            )}
          </div>
        ))}
        <button onClick={() => addToList(setter, { account: null, amount: '' })} className="text-lg text-blue-600 hover:underline">
          <FiPlus className="inline-block mr-2" /> Add Account Split
        </button>
      </div>
    );
  }

  function renderScheduleSplits(list, setter) {
    return (
      <>
        {list.map((s, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
            <DatePicker 
              selected={s.date} 
              onChange={d => updateList(list, setter, i, 'date', d)} 
              placeholderText="Select date" 
              className="w-full p-3 border rounded-lg md:w-48 text-lg" 
              minDate={todayDate}
            />
            <input type="number" min="0" placeholder="Amount" value={s.amount} onChange={e => updateList(list, setter, i, 'amount', e.target.value)} className="w-full md:w-48 p-3 border rounded-lg shadow-md text-lg" />
            {list.length > 1 && (
              <button onClick={() => removeFromList(list, setter, i)} className="text-red-600 text-2xl"><FiX /></button>
            )}
          </div>
        ))}
        <button onClick={() => addToList(setter, { date: null, amount: '', account: null })} className="text-lg text-blue-600 hover:underline">
          <FiPlus className="inline-block mr-2" /> Add Installment
        </button>
      </>
    );
  }
}
