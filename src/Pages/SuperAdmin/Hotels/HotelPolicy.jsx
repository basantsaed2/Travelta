import React, { useEffect, useState } from 'react';
import { useGet } from '../../../Hooks/useGet';

const HotelPolicy = ({policies,setPolicies}) => {
    
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
   
    // const { refetch: refetchPloicy, loading: loadingPloicy, data: DataPloicy } = useGet({url:'https://www.travelta.online/api/super/hOtelPolicIes/34'});

    useEffect(() => {
    if(policies.length !==0){
        console.log("data polices " , policies)
    }
    }, [policies])

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleSavePolicy = () => {
        // Add the new policy to the list
        setPolicies([...policies, { title, description }]);
        // Reset the input fields
        setTitle('');
        setDescription('');
        setIsAdding(false);
    };

    const handleAddNewPolicy = () => {
        setIsAdding(true);
    };

    const handleDeletePolicy = (index) => {
        const updatedPolicies = policies.filter((_, idx) => idx !== index);
        setPolicies(updatedPolicies);
    };

  return (
    <div className="p-6 bg-white mt-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hotel Policy</h2>

        {/* Label and Add Button */}
        <div className="flex justify-between items-center mb-6">
            <label className="text-lg text-gray-700">Enter Hotel Policy:</label>
            {!isAdding && (
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600"
                >
                    Add Policy
                </button>
            )}
        </div>

        {/* Display Policy Input Fields */}
        {isAdding && (
            <div className="flex flex-col gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Enter Policy Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Enter Policy Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                ></textarea>
                <button
                    onClick={handleSavePolicy}
                    className="bg-mainColor text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600"
                >
                    Save Policy
                </button>
            </div>
        )}

        {/* Display Saved Policies */}
        {policies.length > 0 && (
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Saved Policies:</h3>
                {policies.map((policy, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 p-4 rounded-md mb-4 shadow-sm bg-gray-50 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-bold text-gray-800">Title: {policy.title || 'N/A'}</h4>
                            <p className="text-gray-700">Description: {policy.description || 'N/A'}</p>
                        </div>
                        <button
                            onClick={() => handleDeletePolicy(index)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddNewPolicy}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
                >
                    Add New Policy
                </button>
            </div>
        )}
    </div>
  )
}

export default HotelPolicy;
