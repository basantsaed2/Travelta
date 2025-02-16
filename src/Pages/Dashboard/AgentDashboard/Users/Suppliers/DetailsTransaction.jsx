import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const DetailsTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="p-6">
            
            <div className="text-lg font-semibold">Transaction ID: {id}</div>
        </div>
    );
};

export default DetailsTransaction;
