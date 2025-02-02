import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { useAuth } from '../../../../../Context/Auth';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { useChangeState } from '../../../../../Hooks/useChangeState';
import { useDelete } from '../../../../../Hooks/useDelete';

const CurrentFlight = ({ data, loading,refetch }) => {
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

  
      // Delete Customer
      const handleDelete = async (id, name) => {
        const success = await deleteData(`https://travelta.online/agent/request/delete/${id}`, `${name} Deleted Success.`);
    
        if (success) {
            setDataCurrent(
            dataCurrent.filter((request) =>
              request.id !== id
            )
          );
          refetch()
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

const handleStageChange = async (id, name, newStages) => {
  // If the stage is 'Won', prompt for a code
  if (newStages === 'Won') {
    const code = prompt("Please enter the code for the 'Won' stage:");
   
    if (code) {
      const response = await changeState(
        `https://travelta.online/agent/request/stages/${id}`,
        `${name} Changed Status.`,
        { stages: newStages, code: code }  // Include the code in the request
      );
      if (response) {
        setDataCurrent(prevData =>
          prevData.map(cur =>
            cur.id === id ? { ...cur, stages: newStages, code: code } : cur
          )
        );
        refetch();  // Refetch data if necessary
      } else {
        console.error("Stage update failed:", response);
      }
    }
  } else if (newStages === 'Lost') {
    const lostReason = prompt("Please enter the reason for the 'Lost' stage:");
    if (lostReason) {
      const response = await changeState(
        `https://travelta.online/agent/request/stages/${id}`,
        `${name} Changed Status.`,
        { stages: newStages, lost_reason: lostReason }  // Include the lost reason in the request
      );
      if (response) {
        setDataCurrent(prevData =>
          prevData.map(cur =>
            cur.id === id ? { ...cur, stages: newStages, lostReason: lostReason } : cur
          )
        );
        refetch();
      } else {
        console.error("Stage update failed:", response);
      }
    }
  } else {
    // Update the stage without additional information
    const response = await changeState(
      `https://travelta.online/agent/request/stages/${id}`,
      `${name} Changed Status.`,
      { stages: newStages }
    );
    if (response) {
      setDataCurrent(prevData =>
        prevData.map(cur =>
          cur.id === id ? { ...cur, stages: newStages } : cur
        )
      );
      refetch();
    } else {
      console.error("Stage update failed:", response);
    }
  }
};

  if (loading) {
    return <StaticLoader />;
  }

  return (
    <div className="w-full p-4 bg-gray-50">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 mb-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      <div className="w-full custom-scrollbar overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full sm:min-w-0">
      <thead className="w-full">
  <tr className="w-full border-b-2">
    {[
      "Agent", "Arrival", "Departure", "Currency", "Flight Class",
      "Adults", "Children", "Infants", "Priority", "Revenue",
      "Service", "Stages", "To Name", "To Phone","Notes","Action"
    ].map((heading) => (
      <th
        key={heading}
        className="min-w-[120px] sm:w-[8%] lg:w-[5%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3"
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
      <tr 
        key={index} 
        className={`even:bg-gray-100 text-sm sm:text-base hover:bg-gray-200`}
      >
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.agent}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.arrival}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.depature}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.currecy}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.flight_class}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.adults_no}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.children_no}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.infants_no}</td>
        {/* Priority Column with select input */}
        <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
          <TextField
            select
            fullWidth
            variant="outlined"
            value={row.priority}
            onChange={(e) => handleChangePriority(
              row.id, 
              row.agent,
              row.priority === e.target.value ? null : e.target.value  // condition to toggle value
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
        <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.revenue}</td>
        <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.service}</td>

        {/* Stages Column with select input */}
        <td className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
      <TextField
        select
        fullWidth
        variant="outlined"
        value={row.stages}
        onChange={(e) =>
          handleStageChange(row.id, row.agent, row.stages === e.target.value ? null : e.target.value)  // Pass selected value as stageId
        }
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

        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.to_name}</td>
        <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">{row.to_phone}</td>
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

<td>
  <button 
    onClick={() => handleDelete(row.id,row.agent)} 
    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
  >
    Delete
  </button>
</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="13" className="text-center py-4">
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

export default CurrentFlight;
