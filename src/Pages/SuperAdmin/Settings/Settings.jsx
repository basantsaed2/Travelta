import React, { useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
const Settings = ({ children }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">


      {children ? (
        children
      ) : (
        <p className="text-gray-500">Select a tab to view settings.</p>
      )}
    </div>
  );
};

export default Settings