import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../../Hooks/useGet';
import StaticLoader from '../../../../../Components/StaticLoader';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useDelete } from '../../../../../Hooks/useDelete';
import { useAuth } from '../../../../../Context/Auth';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const Group = () => {
  const { refetch: refetchGroup, loading: loadingGroup, data: Group } = useGet({
    url: `https://travelta.online/agent/settings/group`,
  });

  const [group, setGroup] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNationalities, setNewNationalities] = useState([]);
  const [nationalitiesIds, setNationalitiesIds] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const { deleteData } = useDelete();
  const auth = useAuth();

  useEffect(() => {
    refetchGroup();
  }, [refetchGroup]);

  useEffect(() => {
    if (Group?.groups) {
      setGroup(Group.groups);
      if (Group && Array.isArray(Group.nationalities)) {
        setNationalities(Group.nationalities);
      }
    }
  }, [Group]);

  const toggleNationalities = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = async (id, name) => {
    const success = await deleteData(
      `https://travelta.online/agent/settings/group/delete/${id}`,
      `${name} Deleted Successfully.`
    );
    if (success) {
      setGroup(group.filter((group) => group.id !== id));
    }
  };

  const handleUpdate = (group) => {
    setSelectedGroup(group);
    setNewName(group.name || '');
    setNationalitiesIds(group.nationalities.map((nat) => nat.id)); // set the IDs of the nationalities
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedGroup(null);
    setNewName('');
    setNationalitiesIds([]); // reset selected nationalities
  };

  const handleUpdateSubmit = async () => {
    if (!newName || !nationalitiesIds) return;

    try {
      const response = await fetch(
        `https://travelta.online/agent/settings/group/update/${selectedGroup.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${auth.user?.token || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newName,
            nationalities: JSON.stringify(nationalitiesIds), // sending only IDs here
          }),
        }
      );

      if (response.ok) {
        const updatedGroup = await response.json();
        setGroup((prevGroups) =>
          prevGroups.map((g) =>
            g.id === selectedGroup.id
              ? { ...g, name: newName, nationalities: JSON.stringify(nationalitiesIds) }
              : g
          )
         
        );

        setShowPopup(false);
        setSelectedGroup(null);
        setNewName('');
        setNationalitiesIds([]);
        auth.toastSuccess("Updated Successful")
        refetchGroup();
      } else {
        console.error('Update failed.');
      }
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  if (loadingGroup) {
    return <StaticLoader />;
  }

  return (
    <div>
      <table className="w-full sm:min-w-0">
        <thead className="w-full">
          <tr className="w-full border-b-2">
            <th className="min-w-[80px] sm:w-[8%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              #
            </th>
            <th className="min-w-[150px] sm:w-[25%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Name
            </th>
            <th className="min-w-[150px] sm:w-[25%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Nationalities
            </th>
            <th className="min-w-[150px] sm:w-[25%] text-mainColor text-center font-TextFontLight sm:text-sm lg:text-base xl:text-lg pb-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {group.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-xl text-mainColor font-TextFontMedium">
                No Groups Found
              </td>
            </tr>
          ) : (
            group.map((group, index) => {
              const firstNationality = group.nationalities?.[0]?.name || '-';
              const hasMore = group.nationalities?.length > 1;
              const displayText =
                expandedIndex === index
                  ? group.nationalities?.map((nat) => nat.name).join(', ')
                  : hasMore
                  ? `${firstNationality}...`
                  : firstNationality;

              return (
                <tr className="w-full border-b-2" key={index}>
                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                    {index + 1}
                  </td>
                  <td className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl">
                    {group.name || '-'}
                  </td>
                  <td
                    className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl cursor-pointer"
                    onClick={() => toggleNationalities(index)}
                  >
                    {displayText}
                  </td>
                  <td className="py-2 flex justify-center gap-3">
                    <button type="button" onClick={() => handleUpdate(group)}>
                      <FaEdit color="#4CAF50" size="24" />
                    </button>
                    <button type="button" onClick={() => handleDelete(group.id, group.name)}>
                      <MdDelete color="#D01025" size="24" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Update Group Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Update Group</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter group name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <FormControl fullWidth variant="outlined" className="mb-4">
                <InputLabel>Select Nationalities</InputLabel>
                <Select
                  multiple
                  value={nationalitiesIds}
                  onChange={(e) => setNationalitiesIds(e.target.value)}
                  renderValue={(selected) =>
                    selected
                      .map((id) => nationalities.find((nat) => nat.id === id)?.name)
                      .join(', ')
                  }
                >
                  {nationalities.map((nat) => (
                    <MenuItem key={nat.id} value={nat.id}>
                      <Checkbox checked={nationalitiesIds.includes(nat.id)} />
                      <ListItemText primary={nat.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleUpdateSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
              <button
                onClick={handlePopupClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
