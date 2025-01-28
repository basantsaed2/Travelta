import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl, TextField } from '@mui/material';

const Current = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priority, setPriority] = useState('');
  const [stage, setStage] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Sample data
  const data = [
    { id: 1, lead: 'John Doe', whatsapp: '+1234567890', agent: 'Agent A', service: 'Service X', revenue: 5000, priority: 'High', stage: 'Stage 1', date: '2025-01-28' },
    { id: 2, lead: 'Jane Smith', whatsapp: '+0987654321', agent: 'Agent B', service: 'Service Y', revenue: 6000, priority: 'Medium', stage: 'Stage 2', date: '2025-01-27' },
    { id: 3, lead: 'Mike Johnson', whatsapp: '+1112233445', agent: 'Agent A', service: 'Service Z', revenue: 7000, priority: 'Low', stage: 'Stage 3', date: '2025-01-29' },
  ];

  const filteredData = data.filter(item =>
    item.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredByPriorityAndStage = filteredData.filter(item => {
    const priorityMatch = priority ? item.priority === priority : true;
    const stageMatch = stage ? item.stage === stage : true;
    return priorityMatch && stageMatch;
  });

  const sortedData = [...filteredByPriorityAndStage].sort((a, b) => {
    if (sortColumn) {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (typeof valueA === 'string') {
        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Row for "Select from 10 entries" and search input */}
      <div className="flex justify-between mb-4">
        <div className="text-lg text-gray-700">Select from {filteredByPriorityAndStage.length} entries</div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          className="w-1/3"
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            '& .MuiInputBase-root': {
              height: 40,
            },
          }}
        />
      </div>

      {/* Row for Priority and Stage Filters */}
      <div className="flex gap-4 mb-4">
        <FormControl size="small" className="w-32">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            displayEmpty
         
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" className="w-32">
          <InputLabel>Stage</InputLabel>
          <Select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            displayEmpty
         
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Stage 1">Stage 1</MenuItem>
            <MenuItem value="Stage 2">Stage 2</MenuItem>
            <MenuItem value="Stage 3">Stage 3</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Table */}
      <table className="min-w-full border-collapse table-auto text-sm">
        <thead className="bg-mainColor text-white">
          <tr>
            {['ID', 'Lead', 'WhatsApp', 'Agent', 'Service', 'Revenue', 'Priority', 'Stage', 'Date'].map((column) => (
              <th
                key={column}
                className="px-4 py-2 cursor-pointer hover:bg-blue-600"
                onClick={() => handleSort(column.toLowerCase())}
              >
                {column}
                {sortColumn === column.toLowerCase() && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sortedData.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-100 transition-all duration-200">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.lead}</td>
              <td className="px-4 py-2">{item.whatsapp}</td>
              <td className="px-4 py-2">{item.agent}</td>
              <td className="px-4 py-2">{item.service}</td>
              <td className="px-4 py-2">{item.revenue}</td>
              <td className="px-4 py-2">{item.priority}</td>
              <td className="px-4 py-2">{item.stage}</td>
              <td className="px-4 py-2">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Current;
