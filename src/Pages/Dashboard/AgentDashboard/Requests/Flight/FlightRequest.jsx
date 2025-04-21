import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { CircularProgress, MenuItem, TextField, Button, Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { PiWarningCircle } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const progression = {
  Pending: ['Price quotation'],
  'Price quotation': ['Negotiation'],
  Negotiation: ['Won', 'Lost'],
  Won: ['Won Canceled'],
  Lost: ['Won'],
};

const historyProgression = {
  Won: ['Won Canceled'],
  Lost: ['Won']
};

const FlightTable = ({ data = [], loading, refetch, priorityOptions = [], stageOptions = [], isHistory = false }) => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [rowsToDisplay, setRowsToDisplay] = useState(10);
  const { changeState } = useChangeState();
  const [formData, setFormData] = useState({ action: '', priority: '', follow_up_date: '', result: '' });
  const [message, setMessage] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const adminList = [];
  const { deleteData } = useDelete();

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedToStage, setSelectedToStage] = useState('');
  const [wonCode, setWonCode] = useState('');
  const [lostReason, setLostReason] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [wonPopupOpen, setWonPopupOpen] = useState(false);
  const [lostPopupOpen, setLostPopupOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(null);

  useEffect(() => {
    setRows(data);
    setFiltered(data);
  }, [data]);

  const handleSearch = e => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(rows.filter(r => Object.values(r).some(v => v && v.toString().toLowerCase().includes(val))));
  };

  const handleChangePriority = async (row, id, name, newPriority) => {
    // Only proceed if the newPriority is different from the current priority
    if (newPriority === row.priority) return;
  
    const response = await changeState(
      `https://travelta.online/agent/request/priority/${id}`,
      `${name} Changed Status.`,
      { priority: newPriority } // Pass the new priority value
    );
  
    if (response) {
      // Update the row priority in the state after the successful update
      setRows(prevRows =>
        prevRows.map(cur => cur.id === id ? { ...cur, priority: newPriority } : cur)
      );
  
      // Refetch the data after the priority is updated
      refetch();
    } else {
      console.error("Priority update failed:", response);
    }
  };  

  const handleStageSelect = (item, next) => {
    const validNextStages = isHistory ? historyProgression[item.stages] : progression[item.stages];
    if (!validNextStages?.includes(next)) return;
    setSelectedItem(item);
    setSelectedToStage(next);

    if (next === 'Won') setWonPopupOpen(true);
    else if (next === 'Lost') setLostPopupOpen(true);
    else if ((item.stages === 'Pending' && next === 'Price quotation') || (item.stages === 'Price quotation' && next === 'Negotiation')) {
      setPopupOpen(true);
    } else {
      handleSubmit();
    }
  };

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };
  const handleDelete = async id => {
    const ok = await deleteData(`https://travelta.online/agent/request/delete/${id}`, 'Deleted successfully');
    if (ok) {
      // Update the row priority in the state after the successful update
      setRows(prevRows =>
        prevRows.map(cur => cur.id === id ? { ...cur, priority: newPriority } : cur)
      );
  
      // Refetch the data after the priority is updated
      refetch();
    } 
  };

  const handleSubmit = async e => {
    if (e) e.preventDefault();
    if (!selectedItem) return;
    let payload = { stages: selectedToStage };
    if (wonPopupOpen) payload.code = wonCode;
    else if (lostPopupOpen) payload.lost_reason = lostReason;
    else payload = { ...payload, ...formData, message, assign_to: selectedAdmin };

    const res = await changeState(
      `https://travelta.online/agent/request/stages/${selectedItem.id}`,
      `Stage changed to ${selectedToStage}`,
      payload
    );
    if (res) {
      setPopupOpen(false);
      setWonPopupOpen(false);
      setLostPopupOpen(false);
      setFormData({ action: '', priority: '', follow_up_date: '', result: '' });
      setMessage('');
      setSelectedAdmin('');
      refetch();
    }
  };

  if (loading) return <StaticLoader />;

  return (
    <div>
      <div className="w-full flex flex-col md:justify-between md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="w-full md:w-1/3 p-3 rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={rowsToDisplay}
          onChange={e => setRowsToDisplay(+e.target.value)}
          className="w-full md:w-1/6 p-3 border rounded-md"
        >
          {[5, 10, 15, 20, 100].map(n => <option key={n} value={n}>{n} Rows</option>)}
        </select>
      </div>

      <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md bg-white p-2">
        <table className="w-full sm:min-w-0">
          <thead>
          <tr className="border-b-2">
            {["SL", "Client Name", "Client Phone", "Agent", "Revenue", "Arrival", "Departure","ref_pnr","Ticket No", "Airline", "Direction.", "Type", "From → To", "Adults", "Children","Infants", "Priority", "Service", "Stages", "Notes", "Action"].map(h => (
              <th
                key={h}
                className={`text-mainColor text-center font-semibold text-base pb-3 cursor-pointer ${
                  h === "SL" ? "min-w-[80px]" : "min-w-[120px]"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {Array.isArray(filtered) && filtered.length > 0 ? (
            filtered.slice(0, rowsToDisplay).map((row, index) => (
              <tr key={row.id} className="even:bg-gray-100 hover:bg-gray-200 text-base">
                <td className="text-center py-2">{index + 1}</td>
                <td className="text-center py-2">{row.to_name}</td>
                <td className="text-center py-2">{row.to_phone}</td>
                <td className="text-center py-2">{row.agent}</td>
                <td className="text-center py-2">{row.revenue} {row.currecy}</td>
                <td className="text-center py-2">{row.arrival || "-"}</td>
                <td className="text-center py-2">{row.depature || "-"}</td>
                <td className="text-center py-2">{row.ref_pnr || "-"}</td>
                <td className="text-center py-2">{row.ticket_no || "-"}</td>
                <td className="text-center py-2">{row.airline}</td>
                <td className="text-center py-2">{row.flight_direction}</td>
                <td className="text-center py-2">{row.flight_type}</td>
                <td className="text-center py-2 whitespace-nowrap">
                {(() => {
                  try {
                    const routes = JSON.parse(row.from_to);
                    if (!Array.isArray(routes)) return "N/A";
                    return routes.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        {item.from} <span className="text-mainColor font-semibold">→</span> {item.to}
                      </div>
                    ));
                  } catch (err) {
                    return "Invalid route data";
                  }
                })()}
              </td>
         <td className="text-center py-2">{row.adults_no}</td>
                <td className="text-center py-2">{row.children_no}</td>
                <td className="text-center py-2">{row.infants_no}</td>
                <td className="text-center py-2">
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={row.priority}
                    onChange={(e) => handleChangePriority(
                      row,  // Pass the row object here
                      row.id,
                      row.agent,
                      e.target.value  // New priority value
                    )}
                    label="Priority"
                    className="shadow-lg border-gray-300"
                  >
                    {priorityOptions.map((pri, index) => (
                        <MenuItem key={index} value={pri}>
                          {pri}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </td>
                <td className="text-center py-2">{row.service}</td>
                <td className="text-center py-2">
                  <TextField
                    select
                    variant="outlined"
                    className="w-full"
                    value={row.stages}
                    onChange={(e) => handleStageSelect(row, e.target.value)}
                  >
                    {/* Show current stage as disabled */}
                    <MenuItem value={row.stages} disabled>
                      {row.stages}
                    </MenuItem>

                    {/* Show only the valid next stages */}
                    {(
                      (isHistory
                        ? historyProgression[row.stages]
                        : progression[row.stages]) || []
                    ).map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}

                  </TextField>
                </td>
                <td className="text-center py-2 cursor-pointer text-blue-700 underline" onClick={() => {}}>
                  {row.notes || 'Add Note'}
                </td>
                <td className="text-center py-2 py-2">
                  <div className="flex items-center justify-center gap-1">
                  <Link to={`edit_request/${row.id}`}  ><FaEdit color='#4CAF50' size="24"/></Link>
                    <button
                      type="button"
                      onClick={() => handleOpenDelete(row.id)}
                    >
                      <MdDelete color='#D01025' size="24"/>
                    </button>
      
                    {openDelete === row.id && (
                      <Dialog
                        open={true}
                        onClose={handleCloseDelete}
                        className="relative z-10"
                      >
                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center py-2 sm:items-center sm:p-0">
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="flex  flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <PiWarningCircle color='#0D47A1'
                                size="60"
                                />
                                <div className="flex items-center">
                                  <div className="mt-2 text-center">
                                    You will delete row {row?.to_name || "-"}
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto" onClick={() => handleDelete(row.id, row?.to_name)}>
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
          ) : (
              <tr>
                <td colSpan="20" className="text-center py-4 text-gray-500 text-base">No data exist.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


const FlightRequest = () => {
  const { refetch: refetchFlight, loading: loadingFlight, data: Flight } = useGet({ url: 'https://travelta.online/agent/request' });
  const { refetch: refetchList, loading: loadingList, data: paymentList } = useGet({ url: 'https://travelta.online/agent/request/lists' });
  const [tab, setTab] = useState('Current');

  const loading = loadingFlight || loadingList;
  const currentData = (Flight?.current?.flights && Array.isArray(Flight.current.flights)) ? Flight.current.flights : [];
  const historyData = (Flight?.history?.flights && Array.isArray(Flight.history.flights)) ? Flight.history.flights : [];  
  const priority = paymentList?.priority || [];
  const stages = paymentList?.stages || [];

  if (loading) return <StaticLoader />; // Show loader while fetching data

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        {["Current","History"].map(label => (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`py-4 px-4 rounded-lg w-[40%] text-center transition-all duration-300 ${tab === label ? 'bg-mainColor text-white' : 'bg-gray-200 text-gray-700'}`}
          >{label}</button>
        ))}
      </div>
      <FlightTable
        data={tab === 'Current' ? currentData : historyData}
        loading={loading}
        refetch={refetchFlight}
        priorityOptions={priority}
        stageOptions={stages}
        isHistory={tab === 'History'}
      />
    </div>
  );
};

export default FlightRequest;
