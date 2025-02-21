import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useGet } from "../../../Hooks/useGet";
import axios from "axios";
import { useAuth } from "../../../Context/Auth";

const ActionUpcoming = ({ id, item }) => {
  const { refetch: refetchDetails, data: dataDetails } = useGet({
    url: `https://travelta.online/agent/booking/details/${id}`,
  });

  const [status, setStatus] = useState(item?.status || "pending");
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState("");
  const [deposits, setDeposits] = useState([{ deposit: "", date: "" }]);
  const [confirmationNum, setConfirmationNum] = useState("");
  const [cancelationReason, setCancelationReason] = useState("");
  const auth = useAuth();

  useEffect(() => {
    refetchDetails();
  }, [refetchDetails]);

  useEffect(() => {
    if (item?.status) {
      setStatus(item.status);
    }
  }, [item?.status]);

  const handleAction = (newStatus) => {
    setActionType(newStatus);
    setShowConfirm(true);
  };

  const confirmAction = async () => {
    let requestData = {};
    let apiUrl = "";

    if (actionType === "confirmed") {
      apiUrl = `https://travelta.online/agent/booking/confirmed/${id}`;
      requestData = { comfirmed: true, deposits };
    } else if (actionType === "vouchered") {
      apiUrl = `https://travelta.online/agent/booking/vouchered/${id}`;
      requestData = {
        totally_paid: true,
        confirmation_num: confirmationNum,
        name: dataDetails.agent_data?.name,
        phone: dataDetails.agent_data?.phone,
        email: dataDetails.agent_data?.email,
      };
    } else if (actionType === "canceled") {
      apiUrl = `https://travelta.online/agent/booking/canceled/${id}`;
      requestData = { cancelation_reason: cancelationReason };
    }

    try {
      await axios.put(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user?.token || ""}`,
        },
      });
      auth.toastSuccess(`Booking ${actionType} successfully!`);
      setStatus(actionType);
      setShowConfirm(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Step Indicator Stages
  const steps = ["pending", "confirmed", "vouchered", "canceled"];
  const stepIndex = steps.indexOf(status);

  return (
    <div className="p-6  rounded-2xl  flex flex-col gap-4 w-full  ">

      {/* Step Indicator */}
 {/* Step Indicator */}
 <div className="relative flex items-center justify-between w-full mt-4">
  {steps.map((step, index) => (
    <div key={step} className="relative flex flex-col items-center w-full">
      {/* Progress Line (Behind Circles) */}
      {index > 0 && (
        <div
          className={`absolute top-1/2 left-[-50%] w-full h-1 transition-all duration-300 ${
            index <= stepIndex
              ? step === "pending"
                ? "bg-yellow-500"
                : step === "confirmed"
                ? "bg-green-500"
                : step === "vouchered"
                ? "bg-blue-500"
                : "bg-red-500"
              : "bg-gray-300"
          }`}
          style={{ transform: "translateY(-50%)", width: "100%" }}
        ></div>
      )}

      {/* Step Circle */}
      <div
        className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-white font-bold shadow-md transition-all duration-300 ${
          step === "pending"
            ? "bg-yellow-500"
            : step === "confirmed"
            ? "bg-green-500"
            : step === "vouchered"
            ? "bg-blue-500"
            : "bg-red-500"
        } ${index > stepIndex ? "opacity-50" : ""} hover:scale-110 cursor-pointer`}
      >
        {index <= stepIndex ? "✔" : index + 1}
      </div>

      {/* Step Label */}
      <p
        className={`text-xs mt-2 font-medium transition-colors duration-300 ${
          index <= stepIndex
            ? step === "pending"
              ? "text-yellow-600"
              : step === "confirmed"
              ? "text-green-600"
              : step === "vouchered"
              ? "text-blue-600"
              : "text-red-600"
            : "text-gray-400"
        }`}
      >
        {step}
      </p>
    </div>
  ))}
</div>




      {/* Status Badge */}
      {/* <p
        className="font-medium px-3 py-1 rounded-full w-fit text-sm"
        style={{
          backgroundColor:
            status === "pending"
              ? "#facc15"
              : status === "confirmed"
              ? "#34d399"
              : status === "vouchered"
              ? "#38bdf8"
              : "#f87171",
          color: "#fff",
        }}
      >
        {status}
      </p> */}

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        {status === "pending" && (
          <>
            <button onClick={() => handleAction("confirmed")} className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Confirm
            </button>
            <button onClick={() => handleAction("canceled")} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Cancel
            </button>
          </>
        )}
        {status === "confirmed" && (
          <>
            <button onClick={() => handleAction("vouchered")} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Voucher
            </button>
            <button onClick={() => handleAction("canceled")} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Cancel
            </button>
          </>
        )}
        {status === "vouchered" && (
          <>
            <button onClick={() => handleAction("canceled")} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Popup Modal */}
      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
            <Dialog.Title className="text-lg font-semibold">Confirm Action</Dialog.Title>
            <Dialog.Description className="text-gray-700 mt-2">
              Are you sure you want to change the status to <span className="font-semibold">{actionType}</span>?
            </Dialog.Description>

            {actionType === "confirmed" && (
              <div>
                {deposits.map((dep, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <input type="number" min="0" placeholder="Deposit" value={dep.deposit} onChange={(e) => setDeposits((prev) => prev.map((d, i) => (i === index ? { ...d, deposit: e.target.value } : d)))} className="border p-1 w-full" />
                    <input type="date" value={dep.date} onChange={(e) => setDeposits((prev) => prev.map((d, i) => (i === index ? { ...d, date: e.target.value } : d)))} className="border p-1 w-full" />
                  </div>
                ))}
                <button onClick={() => setDeposits([...deposits, { deposit: "", date: "" }])} className="text-blue-500 mt-2">
                  + Add Deposit
                </button>
              </div>
            )}
            {actionType === "vouchered" && (
              <input type="text" placeholder="Confirmation Number" value={confirmationNum} onChange={(e) => setConfirmationNum(e.target.value)} className="border p-1 w-full mt-2" />
            )}
            {actionType === "canceled" && (
              <input type="text" placeholder="Cancelation Reason" value={cancelationReason} onChange={(e) => setCancelationReason(e.target.value)} className="border p-1 w-full mt-2" />
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setShowConfirm(false)} className="px-3 py-1 text-gray-600 border rounded">
                No
              </button>
              <button onClick={confirmAction} className="px-3 py-1 bg-indigo-500 text-white rounded">
                Yes
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ActionUpcoming;
