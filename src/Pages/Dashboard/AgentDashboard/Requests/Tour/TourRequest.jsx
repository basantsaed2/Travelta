import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { CircularProgress, MenuItem, TextField, Button, Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete, MdSearch } from 'react-icons/md';
import { FaEdit, FaCalendarAlt } from 'react-icons/fa';
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

const TourTable = ({ data = [], loading, refetch, priorityOptions = [], stageOptions = [], isHistory = false }) => {
  const { refetch: refetchLists, loading: loadingLists, data: lists } = useGet({
    url: "https://travelta.online/agent/request/lists",
  });

  // State management
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [rowsToDisplay, setRowsToDisplay] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const paginatedData = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Date filter states
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Other existing states...
  const [formData, setFormData] = useState({ action: '', priority: '', follow_up_date: '', result: '' });
  const [message, setMessage] = useState('');
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedToStage, setSelectedToStage] = useState('');
  const [wonCode, setWonCode] = useState('');
  const [lostReason, setLostReason] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [wonPopupOpen, setWonPopupOpen] = useState(false);
  const [lostPopupOpen, setLostPopupOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(null);
  const [notePopupOpen, setNotePopupOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const { changeState } = useChangeState();
  const { deleteData } = useDelete();

  useEffect(() => {
    if (lists && lists.admins_agent && lists.priority) {
      setAdminList(lists.admins_agent);
    }
  }, [lists]);

  useEffect(() => {
    setRows(data);
    setFiltered(data);
  }, [data]);

  // Apply all filters (search and date range)
  useEffect(() => {
    let result = [...data];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(r =>
        Object.values(r).some(
          v => v && v.toString().toLowerCase().includes(searchLower)
      ));
    }

    // Apply date range filter using tour_hotels.check_in
    if (startDate || endDate) {
      result = result.filter(r => {
        const hotelCheckIn = r.tour_hotels?.[0]?.check_in;
        if (!hotelCheckIn) return false;
        
        const checkInDate = new Date(hotelCheckIn);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        // Normalize dates by setting time to midnight for accurate comparison
        checkInDate.setHours(0, 0, 0, 0);
        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        const afterStart = !start || checkInDate >= start;
        const beforeEnd = !end || checkInDate <= end;
        
        return afterStart && beforeEnd;
      });
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, search, startDate, endDate]);

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const clearDateFilters = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleChangeNote = (id, note) => {
    setCurrentNote(note);
    setCurrentNoteId(id);
    setNotePopupOpen(true);
  };

  const handleSaveNote = async () => {
    const response = await changeState(
      `https://travelta.online/agent/request/notes/${currentNoteId}`,
      `Note updated.`,
      { notes: currentNote }
    );

    if (response) {
      setRows(prevRows =>
        prevRows.map(cur => cur.id === currentNoteId ? { ...cur, notes: currentNote } : cur)
      );
      setNotePopupOpen(false);
      refetch();
    }
  };

  const handleChangePriority = async (row, id, name, newPriority) => {
    if (newPriority === row.priority) return;

    const response = await changeState(
      `https://travelta.online/agent/request/priority/${id}`,
      `${name} Changed Status.`,
      { priority: newPriority }
    );

    if (response) {
      setRows(prevRows =>
        prevRows.map(cur => cur.id === id ? { ...cur, priority: newPriority } : cur)
      );
      refetch();
    }
  };

  const handleStageSelect = (item, next) => {
    const validNextStages = isHistory ? historyProgression[item.stages] : progression[item.stages];
    if (!validNextStages?.includes(next)) return;
    setSelectedItem(item);
    setSelectedToStage(next);

    if (next === 'Won') setWonPopupOpen(true);
    else if (next === 'Lost') setLostPopupOpen(true);
    else if ((item.stages === 'Pending' && next === 'Price quotation') ||
      (item.stages === 'Price quotation' && next === 'Negotiation')) {
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
      refetch();
    }
  };

  const handleSubmit = async e => {
    if (e) e.preventDefault();
    if (!selectedItem) return;

    let payload = {
      stages: selectedToStage
    };

    if (wonPopupOpen) {
      payload = {
        stages: 'Won',
        code: wonCode
      };
    } else if (lostPopupOpen) {
      payload = {
        stages: 'Lost',
        lost_reason: lostReason
      };
    } else {
      payload = {
        ...payload,
        action: formData.action,
        follow_up_date: formData.follow_up_date,
        result: formData.result
      };

      if (formData.action === "message") {
        payload.send_by = message;
      } else if (formData.action === "assign_request") {
        payload.admin_agent_id = selectedAdmin;
      }
    }

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
      setWonCode('');
      setLostReason('');
      refetch();
    }
  };

  // Pagination Logic - Fixed to use filtered data
  const itemsPerPage = rowsToDisplay;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <StaticLoader />;

  return (
    <div className="w-full">
      {/* Search & Filter Section */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-6 shadow-lg rounded-xl mb-6 border border-gray-200">
        {/* Search Input */}
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg w-full md:w-[280px] border border-gray-300">
          <MdSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={handleSearch}
            className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Date Range Inputs */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              className="bg-transparent outline-none"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Check-in from"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-300">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              className="bg-transparent outline-none"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="Check-in to"
            />
          </div>
          {(startDate || endDate) && (
            <button
              onClick={clearDateFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Rows per Page */}
      <div className="flex items-center space-x-2 mb-5">
        <label className="text-gray-700 font-medium">Rows per page:</label>
        <div className="w-full md:w-[120px]">
          <select
            onChange={e => {
              setRowsToDisplay(+e.target.value);
              setCurrentPage(1);
            }}
            value={rowsToDisplay}
            className="w-full bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 outline-none cursor-pointer"
          >
            <option value="5">5 rows</option>
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="30">30 rows</option>
            <option value="50">50 rows</option>
          </select>
        </div>
      </div>

      {/* Tours Table */}
      <div className="w-full sm:min-w-0 block overflow-x-scroll scrollSection border-collapse">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-t-2 border-b-2">
              <th className="w-[50px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg p-2 border-b-2">
                SL
              </th>
              {["Client Name", "Client Phone", "Agent", "Revenue", "Check In", "Check Out", "Tour Name", "Priority", "Stage", "Notes", "Actions"].map((name, index) => (
                <th
                  key={index}
                  className="min-w-[120px] text-mainColor bg-mainBgColor text-center font-medium sm:text-sm lg:text-base xl:text-lg py-3 border-b-2"
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center text-xl text-gray-500 py-4">
                  No Tours Found
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} transition hover:bg-gray-100`}
                >
                  <td className="text-center py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="text-center py-2 text-gray-600">{row.to_name}</td>
                  <td className="text-center py-2 text-gray-600">{row.to_phone}</td>
                  <td className="text-center py-2 text-gray-600">{row.agent}</td>
                  <td className="text-center py-2 text-gray-600">{row.revenue} {row.currecy}</td>
                  <td className="text-center py-2 text-gray-600">{row.tour_hotels?.[0]?.check_in || "-"}</td>
                  <td className="text-center py-2 text-gray-600">{row.tour_hotels?.[0]?.check_out || "-"}</td>
                  <td className="text-center py-2 text-gray-600">{row.tour_name || "-"}</td>
                  <td className="text-center py-2">
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={row.priority}
                      onChange={(e) => handleChangePriority(row, row.id, row.agent, e.target.value)}
                    >
                      {priorityOptions.map((pri, index) => (
                        <MenuItem key={index} value={pri}>{pri}</MenuItem>
                      ))}
                    </TextField>
                  </td>
                  <td className="text-center py-2">
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      className="w-full"
                      value={row.stages}
                      onChange={(e) => handleStageSelect(row, e.target.value)}
                    >
                      <MenuItem value={row.stages} disabled>
                        {row.stages}
                      </MenuItem>
                      {(isHistory
                        ? (historyProgression[row.stages] || [])
                        : (progression[row.stages] || [])
                      ).map((s) => (
                        <MenuItem key={s} value={s}>
                          {s}
                        </MenuItem>
                      ))}
                    </TextField>
                  </td>
                  <td className="text-center py-2">
                    <button
                      onClick={() => handleChangeNote(row.id, row.notes || '')}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {row.notes ? 'View Note' : 'Add Note'}
                    </button>
                  </td>
                  <td className="text-center py-2">
                    <div className="flex items-center justify-center gap-2">
                      <Link to={`edit_request/${row.id}`}>
                        <FaEdit color='#4CAF50' size="20" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenDelete(row.id)}
                      >
                        <MdDelete color='#D01025' size="20" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages || 1}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {openDelete && (
        <Dialog
          open={true}
          onClose={() => setOpenDelete(null)}
          className="relative z-10"
        >
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center py-2 sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <PiWarningCircle color='#0D47A1' size="60" />
                  <div className="mt-2 text-center">
                    You will delete row {data.find(r => r.id === openDelete)?.to_name || "-"}
                  </div>
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                    onClick={() => {
                      handleDelete(openDelete);
                      setOpenDelete(null);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpenDelete(null)}
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

      {/* Enhanced Note Modal */}
      <Dialog
        open={notePopupOpen}
        onClose={() => setNotePopupOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-2xl bg-white shadow-xl transition-all">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {currentNote ? 'Edit Note' : 'Add New Note'}
                </DialogTitle>
                <button
                  onClick={() => setNotePopupOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                    Note Content
                  </label>
                  <textarea
                    id="note"
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Enter your notes here..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setNotePopupOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Enhanced Scrollable Stage Transition Modal */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-2xl bg-white shadow-xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 pb-0 sticky top-0 bg-white z-10 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedToStage === 'Price quotation' ? 'Price Quotation Details' : 'Negotiation Details'}
                </DialogTitle>
                <button
                  onClick={() => setPopupOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">
                      Action Type
                    </label>
                    <select
                      id="action"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.action}
                      onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                    >
                      <option value="">Select an action</option>
                      <option value="message">Message</option>
                      <option value="assign_request">Assign Request</option>
                      <option value="call">Call</option>
                    </select>
                  </div>

                  {formData.action === 'message' && (
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message Content
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here..."
                      />
                    </div>
                  )}

                  {formData.action === 'assign_request' && (
                    <div>
                      <label htmlFor="assign-to" className="block text-sm font-medium text-gray-700 mb-1">
                        Assign To
                      </label>
                      <select
                        id="assign-to"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedAdmin}
                        onChange={(e) => setSelectedAdmin(e.target.value)}
                      >
                        <option value="">Select an admin</option>
                        {adminList.map((admin) => (
                          <option key={admin.id} value={admin.id}>
                            {admin.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="follow-up-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Follow Up Date
                    </label>
                    <input
                      type="date"
                      id="follow-up-date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.follow_up_date}
                      onChange={(e) => setFormData({ ...formData, follow_up_date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="result" className="block text-sm font-medium text-gray-700 mb-1">
                      Result
                    </label>
                    <textarea
                      id="result"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.result}
                      onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                      placeholder="Enter the result here..."
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Sticky Footer */}
            <div className="p-6 pt-4 sticky bottom-0 bg-white border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Confirm Transition
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Enhanced Won Modal */}
      <Dialog
        open={wonPopupOpen}
        onClose={() => setWonPopupOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Mark as Won
                </DialogTitle>
                <button
                  onClick={() => setWonPopupOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-6">
                <div>
                  <label htmlFor="won-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmation Code
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="won-code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={wonCode}
                    onChange={(e) => setWonCode(e.target.value)}
                    placeholder="Enter confirmation code"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Please enter the booking confirmation code</p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setWonPopupOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Confirm as Won
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Enhanced Lost Modal */}
      <Dialog
        open={lostPopupOpen}
        onClose={() => setLostPopupOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Mark as Lost
                </DialogTitle>
                <button
                  onClick={() => setLostPopupOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 space-y-6">
                <div>
                  <label htmlFor="lost-reason" className="block text-sm font-medium text-gray-700 mb-1">
                    Reason for Loss
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="lost-reason"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={lostReason}
                    onChange={(e) => setLostReason(e.target.value)}
                    placeholder="Explain why this booking was lost..."
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Please provide details to help improve future conversions</p>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setLostPopupOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Confirm as Lost
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

const TourRequest = () => {
  const { refetch: refetchTour, loading: loadingTour, data: Tour } = useGet({ url: 'https://travelta.online/agent/request' });
  const { refetch: refetchList, loading: loadingList, data: paymentList } = useGet({ url: 'https://travelta.online/agent/request/lists' });
  const [tab, setTab] = useState('Current');

  const loading = loadingTour || loadingList;
  const currentData = (Tour?.current?.tours && Array.isArray(Tour.current.tours)) ? Tour.current.tours : [];
  const historyData = (Tour?.history?.tours && Array.isArray(Tour.history.tours)) ? Tour.history.tours : [];
  const priority = paymentList?.priority || [];
  const stages = paymentList?.stages || [];

  if (loading) return <StaticLoader />;

  return (
    <div className="w-full">
      {/* Main Tabs */}
      <div className="flex space-x-4 mb-4">
        {["Current", "History"].map((tabItem) => (
          <button
            key={tabItem}
            onClick={() => setTab(tabItem)}
            className={`py-2 px-4 rounded-t ${tab === tabItem
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-100 text-gray-600 hover:text-blue-600"
              }`}
          >
            {tabItem}
          </button>
        ))}
      </div>

      <TourTable
        data={tab === 'Current' ? currentData : historyData}
        loading={loading}
        refetch={refetchTour}
        priorityOptions={priority}
        stageOptions={stages}
        isHistory={tab === 'History'}
      />
    </div>
  );
};

export default TourRequest;