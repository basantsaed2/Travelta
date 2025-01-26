import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../../Hooks/useGet';
import Agancy from './Agency/Agancy';
import Supplier from './Supplier/Supplier';
import Freelancer from './Freelancer/Freelancer';
import Affilate from './Affilate/Affilate';
import StaticLoader from '../../../Components/StaticLoader';

const AgentProfile = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

    // State to manage active tab
    const [activeTab, setActiveTab] = useState('affiliate');

    // Functions to handle tab changes
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

  const { refetch: refetchAgent, loading: loadingAgent, data: DataAgent } = useGet({
    url: 'https://www.travelta.online/api/super/agents'
  });

  useEffect(() => {
    refetchAgent();
  }, [refetchAgent]);

  useEffect(() => {
    if (DataAgent) {
      setAgents(DataAgent.agents);
    }
    console.log('data Agent ', DataAgent);
    console.log('data agent agents ', DataAgent?.agents);
  }, [DataAgent]);

  
  

  const handleUpdate = (agentId) => {
    navigate(`/super_admin/agent_profile/update/${agentId}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      setAgents(agents.filter((agent) => agent.id !== id));
    }
  };

  return (
    <div className=" p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange('affiliate')}
          className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'affiliate' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Affiliate
        </button>
        <button
          onClick={() => handleTabChange('freelancer')}
          className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'freelancer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Freelancer
        </button>
        <button
          onClick={() => handleTabChange('agency')}
          className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'agency' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Agency
        </button>
        <button
          onClick={() => handleTabChange('supplier')}
          className={`px-6 py-2 text-sm font-medium rounded-md ${activeTab === 'supplier' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Supplier
        </button>
      </div>

      {/* Tab Content */}

      <div className="w-full overflow-x-scroll scrollSection">
    {loadingAgent?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :
     ( <div className="tab-content">
        {activeTab === 'affiliate' && (
          <div className="p-6 bg-gray-50 rounded shadow-md">
           
            {/* Add affiliate-related content here */}
            <Affilate/>
          </div>
        )}
        {activeTab === 'freelancer' && (
          <div className="p-6 bg-gray-50 rounded shadow-md">
            
            {/* Add freelancer-related content here */}
            <Freelancer/>
          </div>
        )}
        {activeTab === 'agency' && (
          <div className="w-full bg-gray-50 rounded shadow-md">
           
            {/* Add agency-related content here */}
            <Agancy/>
          </div>
        )}
        {activeTab === 'supplier' && (
          <div className="p-6 bg-gray-50 rounded shadow-md">
            {/* Add supplier-related content here */}
            <Supplier/>
          </div>
        )}
      </div>) }
      </div>
    </div>
  );
}

export default AgentProfile;
