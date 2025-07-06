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
    return    <div className="flex items-center justify-center w-full h-56">
    <StaticLoader />
</div>;
  }

  return (

    <div className="w-full overflow-x-scroll scrollSection">
    {loadingAgent?  (
        <div className="flex items-center justify-center w-full h-56">
            <StaticLoader />
        </div>
) :
 (   <div className="max-w-6xl p-6 mx-auto rounded-lg shadow-lg">
      <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Agent Details</h2>

      {/* Loop through each agent */}
      {agents && agents.length > 0 ? (
        agents.map((a, index) => (
          <div key={index} className="p-6 mb-8 transition duration-300 ease-in-out rounded-lg shadow-md bg-gray-50 hover:shadow-xl">
            {/* Header Section with Delete Icon */}
            <div className="flex items-center justify-between mb-6">
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
                className="text-red-600 transition duration-300 hover:text-red-800"
                onClick={() => handleDelete(a.agent_id,a.agent_name)}
                disabled={loadingDelete}
              >
                <FaTrashAlt size={20} />
              </button>
            </div>

            {/* Toggle Collapse/Expand Icon */}
            <div
              className="text-gray-600 cursor-pointer"
              onClick={() => toggleAgentDetails(a.agent_id)}
            >
              {expandedAgentId === a.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </div>

            {/* Conditional rendering of agent details */}
            {expandedAgentId === a.agent_id && (
              <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-2">
                {/* Agent Information */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Agent Information</h4>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li><strong>Email:</strong> {a.agent_email}</li>
                    <li><strong>Phone:</strong> {a.agent_phone}</li>
                    <li><strong>Address:</strong> {a.agent_address}</li>
                  </ul>
                </div>

                {/* Owner Information */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-700">Owner Information</h4>
                  <ul className="mt-4 space-y-3 text-gray-600">
                    <li><strong>Name:</strong> {a.owner_name}</li>
                    <li><strong>Email:</strong> {a.owner_email}</li>
                    <li><strong>Phone:</strong> {a.owner_phone}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Conditional rendering of legal papers */}
            {expandedAgentId === a.agent_id && a.legal_papers && a.legal_papers.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Legal Papers</h4>
                <div className="mt-4 space-y-4">
                  {a.legal_papers.map((paper, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <span className="font-medium text-gray-600">{paper.image_type}:</span>
                      <img
                        src={paper.image}
                        alt={paper.image_type}
                        className="object-cover w-32 h-32 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conditional rendering of plan details */}
            {expandedAgentId === a.agent_id && a.plans && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Plan Details</h4>
                <ul className="mt-4 space-y-3 text-gray-600">
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
            {expandedAgentId === a.agent_id && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-700">Status & Total Commission</h4>
                <ul className="mt-4 space-y-3 text-gray-600">
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
