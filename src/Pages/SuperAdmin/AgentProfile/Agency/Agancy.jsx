import React, { useEffect, useState } from 'react';
import { useGet } from '../../../../Hooks/useGet';
import { useDelete } from '../../../../Hooks/useDelete';
import { FaTrashAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Add icons
import StaticLoader from '../../../../Components/StaticLoader';

const Agancy = () => {
  const { refetch: refetchAgent, loading: loadingAgent, data: DataAgent } = useGet({
    url: 'https://www.travelta.online/api/super/agents',
  });

  const { deleteData, loadingDelete, responseDelete } = useDelete();

  const [agents, setAgents] = useState([]);
  const [expandedAgentId, setExpandedAgentId] = useState(null); // Track expanded agent

  useEffect(() => {
    refetchAgent();
  }, [refetchAgent]);

  useEffect(() => {
    if (DataAgent && DataAgent.agents) {
      setAgents(DataAgent.agents); // Set agent data
    }
    console.log('data agent ', DataAgent?.agents);
  }, [DataAgent]);

  const toggleAgentDetails = (agentId) => {
    setExpandedAgentId((prevId) => (prevId === agentId ? null : agentId));
  };

  // Handle delete
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://www.travelta.online/api/super/agent/delete/${id}`, `${name} Deleted Success.`);
    if (success) setAgents(agents.filter((agent) => agent.id !== id));
    refetchAgent()
  };

  if (loadingAgent) {
    return    <div className="w-full h-56 flex justify-center items-center">
    <StaticLoader />
</div>;
  }

  return (

    <div className="w-full overflow-x-scroll scrollSection">
    {loadingAgent?  (
        <div className="w-full h-56 flex justify-center items-center">
            <StaticLoader />
        </div>
) :
 (   <div className="max-w-6xl mx-auto p-6  rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Agent Details</h2>

      {/* Loop through each agent */}
      {agents && agents.length > 0 ? (
        agents.map((a, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 hover:shadow-xl transition duration-300 ease-in-out">
            {/* Header Section with Delete Icon */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <h3
                  className="text-2xl font-bold text-gray-800 cursor-pointer"
                  onClick={() => toggleAgentDetails(a.agent_id)}
                >
                  {a.agent_name}
                </h3>
                <p className="text-sm text-gray-500">{a.city_name}, {a.country_name}</p>
              </div>
              {/* Delete Icon */}
              <button
                className="text-red-600 hover:text-red-800 transition duration-300"
                onClick={() => handleDelete(a.agent_id,a.agent_name)}
                disabled={loadingDelete}
              >
                <FaTrashAlt size={20} />
              </button>
            </div>

            {/* Toggle Collapse/Expand Icon */}
            <div
              className="cursor-pointer text-gray-600"
              onClick={() => toggleAgentDetails(a.id)}
            >
              {expandedAgentId === a.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </div>

            {/* Conditional rendering of agent details */}
            {expandedAgentId === a.id && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                {/* Agent Information */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Agent Information</h4>
                  <ul className="space-y-3 mt-4 text-gray-600">
                    <li><strong>Email:</strong> {a.agent_email}</li>
                    <li><strong>Phone:</strong> {a.agent_phone}</li>
                    <li><strong>Address:</strong> {a.agent_address}</li>
                  </ul>
                </div>

                {/* Owner Information */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Owner Information</h4>
                  <ul className="space-y-3 mt-4 text-gray-600">
                    <li><strong>Name:</strong> {a.owner_name}</li>
                    <li><strong>Email:</strong> {a.owner_email}</li>
                    <li><strong>Phone:</strong> {a.owner_phone}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Conditional rendering of legal papers */}
            {expandedAgentId === a.id && a.legal_papers && a.legal_papers.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Legal Papers</h4>
                <div className="space-y-4 mt-4">
                  {a.legal_papers.map((paper, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <span className="font-medium text-gray-600">{paper.image_type}:</span>
                      <img
                        src={paper.image}
                        alt={paper.image_type}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conditional rendering of plan details */}
            {expandedAgentId === a.id && a.plans && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Plan Details</h4>
                <ul className="space-y-3 mt-4 text-gray-600">
                  <li><strong>Plan Name:</strong> {a.plans.plan_name}</li>
                  <li><strong>Plan Price (after discount):</strong> ${a.plans.plan_price_after_discount}</li>
                  <li><strong>Discount Type:</strong> {a.plans.discount_type}</li>
                  <li><strong>Discount Value:</strong> ${a.plans.discount_value}</li>
                  <li><strong>Branch Cost:</strong> ${a.plans.branch_cost}</li>
                  <li><strong>User Limit:</strong> {a.plans.user_limit}</li>
                  <li><strong>Period (Days):</strong> {a.plans.period_in_days}</li>
                </ul>
              </div>
            )}

            {/* Conditional rendering of status and total commission */}
            {expandedAgentId === a.id && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Status & Total Commission</h4>
                <ul className="space-y-3 mt-4 text-gray-600">
                  <li><strong>Status:</strong> {a.status}</li>
                  <li><strong>Total Bookings:</strong> {a.total_bookking}</li>
                  <li><strong>Total Commission:</strong> ${a.total_commision}</li>
                  <li><strong>Zone Name:</strong> {a.zone_name}</li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No agent data available</p>
      )}
    </div>)}
    </div>
  );
};

export default Agancy;
