import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from '../../../../../Context/Auth';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { PiWarningCircle } from "react-icons/pi";

const CurrenctBus = ({ data, loading ,refetch}) => {
  const [dataCurrent, setDataCurrent] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(5); // Default number of rows to show
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const [priority, setPriority] = useState([]); // Handling priority
  const [stages, setStages] = useState([]); // Handling stages
  const [request, setRequest] = useState([]); // Handling request
  const { changeState, loadingChange, responseChange } = useChangeState();
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [openDelete, setOpenDelete] = useState(null);
  const [isNotePopupOpen, setIsNotePopupOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const auth = useAuth();

  const {
    refetch: refetchList,
    loading: loadingList,
    data: paymentList,
  } = useGet({ url: "https://travelta.online/agent/request/lists" });

  useEffect(() => {
    refetchList();
  }, [refetchList]);

  useEffect(() => {
    if (paymentList) {
      setPriority(paymentList.priority);
      setStages(paymentList.stages);
    }
  }, [paymentList]);

  useEffect(() => {
    if (data) {
      setDataCurrent(data);
      setFilteredData(data);
    }
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const filtered = dataCurrent.filter((row) =>
      Object.values(row).some(
        (field) => field && field.toString().toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  };

  const handleOpenDelete = (item) => {
    setOpenDelete(item);
  };
  const handleCloseDelete = () => {
    setOpenDelete(null);
  };

  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://travelta.online/agent/request/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
        // Update Discounts only if changeState succeeded
        setDataCurrent(
          dataCurrent.filter((request) =>
            request.id !== id
                )
        );
    }
  };

  const handleRowsToDisplayChange = (e) => {
    setRowsToDisplay(Number(e.target.value));
  };

  const handleSort = (column) => {
    const order = sortedColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortedColumn(column);
    setSortOrder(order);

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleChangeNote = (id, note) => {
    setCurrentNote(note);
    setCurrentNoteId(id);
    setIsNotePopupOpen(true);
  };
  const handleSaveNote = async () => {
    const response = await changeState(
      `https://travelta.online/agent/request/notes/${currentNoteId}`,
      `Note updated.`,
      { notes: currentNote }
    );
  
    if (response) {
      setDataCurrent(prevData =>
        prevData.map(cur =>
          cur.id === currentNoteId ? { ...cur, notes: currentNote } : cur
        )
      );
      refetch()
    } else {
      console.error("Note update failed:", response);
    }
    
    setIsNotePopupOpen(false);
  };
const handleChangePriority = async (id, name, newPriority) => {
  const response = await changeState(
    `https://travelta.online/agent/request/priority/${id}`,
    `${name} Changed Status.`,
    { priority: newPriority }  // Pass the new priority value
  );
  if (response) {
    // Update data only if changeState succeeded and the response is correct
    setDataCurrent(prevData =>
      prevData.map(cur =>
        cur.id === id ? { ...cur, priority: newPriority } : cur
      )
    );
    refetch()
  } else {
    console.error("Priority update failed:", response);
  }
};

const handleStageChange = async (id, name, newstages) => {
  const response = await changeState(
    `https://travelta.online/agent/request/stages/${id}`,
    `${name} Changed Status.`,
    { stages: newstages }  // Pass the new priority value
  );
  if (response) {
    // Update data only if changeState succeeded and the response is correct
    setDataCurrent(prevData =>
      prevData.map(cur =>
        cur.id === id ? { ...cur, stages: newstages } : cur
      )
    );
    refetch()
  } else {
    console.error("Stage update failed:", response);
  }
};


  if (loading) {
    return <StaticLoader />;
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Rows to Display Dropdown */}
      <select
        value={rowsToDisplay}
        onChange={handleRowsToDisplayChange}
        className="p-3 mb-4 border-2 border-gray-300 rounded-md"
      >
        {[5, 10, 15, 20, 100].map((num) => (
          <option key={num} value={num}>
            {num} Rows
          </option>
        ))}
      </select>

      {/* Table Container */}
      <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md bg-white p-2">
      <table className="w-full sm:min-w-0">
  <thead className="w-full">
    <tr className="w-full border-b-2">
      {[
        "Agent", "Arrival", "Departure", "Bus Name", "Bus No.", "Currency", 
        "Driver Phone", "From","To", "Adults", "Children", "Priority", "Revenue", 
        "Service", "Stages", "To Name", "To Phone","Notes","Action"
      ].map((heading) => (
        <th
          key={heading}
          className="min-w-[120px] sm:w-[8%] lg:w-[6%] xl:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3 cursor-pointer"
          onClick={() => handleSort(heading.toLowerCase().replace(/\s+/g, '_'))}
        >
          {heading}
          {sortedColumn === heading.toLowerCase().replace(/\s+/g, '_') && 
            (sortOrder === 'asc' ? ' ↑' : ' ↓')}
        </th>
      ))}
    </tr>
  </thead>

  {/* Table Body */}
  <tbody>
    {filteredData.length > 0 ? (
      filteredData.slice(0, rowsToDisplay).map((row, index) => (
        <tr key={index} className={`even:bg-gray-100 text-sm sm:text-base hover:bg-gray-200`}>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.agent}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.arrival || "N/A"}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.depature || "N/A"}</td>
          
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.bus_name || "N/A"}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.bus_no || "N/A"}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.currecy}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.driver_phone}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.from}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.to}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.no_adults}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.no_children}</td>
         

          {/* Priority Column with select input */}
          <td className="min-w-[150px] sm:w-1/12 py-2 text-center text-thirdColor">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={row.priority}
              onChange={(e) => handleChangePriority(
                row.id, 
                row.agent,
                row.priority === e.target.value ? null : e.target.value
              )}
              label="Priority"
              className="shadow-lg border-gray-300"
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                priority.map((pri, index) => (
                  <MenuItem key={index} value={pri}>
                    {pri}
                  </MenuItem>
                ))
              )}
            </TextField>
          </td>

          {/* Revenue Column */}
          <td className="min-w-[150px] sm:w-1/12 py-2 text-center text-thirdColor">{row.revenue}</td>
          <td className="min-w-[150px] sm:w-1/12 py-2 text-center text-thirdColor">{row.service}</td>

          {/* Stages Column with select input */}
          <td className="min-w-[150px] sm:w-1/12 py-2 text-center text-thirdColor">
            <TextField
              select
              fullWidth
              variant="outlined"
              value={row.stages}
              onChange={(e) => handleStageChange(row.id, row.agent,row.stages === e.target.value ? null : e.target.value)}
              label="Stage"
              className="shadow-lg border-gray-300"
            >
              {loadingList ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                stages.map((sta, index) => (
                  <MenuItem key={index} value={sta}>
                    {sta}
                  </MenuItem>
                ))
              )}
            </TextField>
          </td>
          
          
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.to_name}</td>
          <td className="min-w-[80px] sm:w-1/12 py-2 text-center text-thirdColor">{row.to_phone}</td>
          <td 
            className="cursor-pointer min-w-[150px] sm:min-w-[100px] py-2 text-center text-thirdColor hover:underline"
            onClick={() => handleChangeNote(row.id, row.notes)}
          >
            {row.notes || "Add Note"}
          </td>
          {isNotePopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Edit Note</h2>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button 
                    className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                    onClick={() => setIsNotePopupOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleSaveNote}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          <td className="text-center py-2">
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
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
        <td colSpan="17" className="text-center py-4">
          No records found.
        </td>
      </tr>
    )}
  </tbody>
</table>



      </div>
    </div>
  );
};

export default CurrenctBus;
