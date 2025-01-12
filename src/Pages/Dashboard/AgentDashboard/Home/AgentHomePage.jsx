import React from "react";
import LineChart from "./Carts/LineChart";
import PieChart from "./Carts/PieChart";
import BarChart from "./Carts/BarChart";
import CircularProgress from "./Carts/CircleProgress";

const AgentHomePage =()=>{
    return(
        <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-100 min-h-screen">
      {/* Top Cards */}
      <div className="card bg-white shadow-md p-4 rounded-lg text-center">
        <h4 className="text-sm text-gray-500">Conversion</h4>
        <h2 className="text-2xl font-bold text-gray-800">$38,566</h2>
      </div>
      <div className="card bg-white shadow-md p-4 rounded-lg text-center">
        <h4 className="text-sm text-gray-500">Income</h4>
        <h2 className="text-2xl font-bold text-gray-800">$53,659</h2>
      </div>
      <div className="card bg-white shadow-md p-4 rounded-lg col-span-2 text-center">
        <h4 className="text-sm text-gray-500">Referral</h4>
        <h2 className="text-2xl font-bold text-gray-800">$32,690</h2>
      </div>

      {/* Website Analytics */}
      <div className="card bg-white shadow-md p-6 rounded-lg col-span-2">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Website Analytics</h4>
        <LineChart />
      </div>

      {/* Pie Chart */}
      <div className="card bg-white shadow-md p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Impressions</h4>
        <PieChart />
      </div>

      {/* Bar Chart */}
      <div className="card bg-white shadow-md p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">Registration</h4>
        <BarChart />
      </div>

      {/* Circular Progress */}
      <div className="card bg-white shadow-md p-6 rounded-lg col-span-2">
        <CircularProgress percentage={62} label="Growth in 2024" />
      </div>
    </div>
    )
}

export default AgentHomePage;