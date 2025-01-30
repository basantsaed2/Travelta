import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';

const CurrenctBus = ({ data, loading }) => {
  const [dataCurrent, setDataCurrent] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(5); // Default number of rows to show
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

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

  if (loading) {
    return <StaticLoader />;
  }

  return (
    <div className="w-full p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Rows to Display Dropdown */}
      <select
        value={rowsToDisplay}
        onChange={handleRowsToDisplayChange}
        className="p-2 mb-4 border border-gray-300 rounded-md"
      >
        {[5, 10, 15, 20, 100].map((num) => (
          <option key={num} value={num}>
            {num} Rows
          </option>
        ))}
      </select>

      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full border-collapse border border-gray-200 min-w-[800px] sm:min-w-full">
          {/* Table Head */}
          <thead>
  <tr className="bg-mainColor text-white text-sm sm:text-base">
    {[
      "Agent", "Arrival", "Departure", "Currency", "Bus Name", "Adults", 
      "Children", "Priority", "Revenue", "Service", "Stages", "To Name", 
      "To Phone", "Driver Phone", "From", "To"
    ].map((heading) => (
      <th
        key={heading}
        className="p-3 border border-gray-300 text-left whitespace-nowrap cursor-pointer"
        onClick={() => handleSort(heading.toLowerCase().replace(/\s+/g, '_'))}
      >
        {heading}
        {sortedColumn === heading.toLowerCase().replace(/\s+/g, '_') && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
      </th>
    ))}
  </tr>
</thead>

          {/* Table Body */}
          <tbody>
  {filteredData.length > 0 ? (
    filteredData.slice(0, rowsToDisplay).map((row, index) => (
      <tr key={index} className="even:bg-gray-100 text-sm sm:text-base">
        <td className="p-2 border border-gray-300">{row.agent}</td>
        <td className="p-2 border border-gray-300">{row.arrival || "N/A"}</td>
        <td className="p-2 border border-gray-300">{row.depature || "N/A"}</td>
        <td className="p-3 border border-gray-300">{row.currecy}</td>
        <td className="p-3 border border-gray-300">{row.bus_name || "N/A"}</td>
        <td className="p-3 border border-gray-300">{row.no_adults}</td>
        <td className="p-3 border border-gray-300">{row.no_children}</td>
        <td className="p-3 border border-gray-300">{row.priority}</td>
        <td className="p-3 border border-gray-300">{row.revenue}</td>
        <td className="p-3 border border-gray-300">{row.service}</td>
        <td className="p-3 border border-gray-300">{row.stages}</td>
        <td className="p-3 border border-gray-300">{row.to_name}</td>
        <td className="p-3 border border-gray-300">{row.to_phone}</td>
        <td className="p-3 border border-gray-300">{row.driver_phone}</td>
        <td className="p-3 border border-gray-300">{row.from}</td>
        <td className="p-3 border border-gray-300">{row.to}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="15" className="p-4 text-center text-gray-500">
        No data found.
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
