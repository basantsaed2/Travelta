import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ percentage, label }) => {
  return (
    <div className="text-center">
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#3b82f6", // Tailwind Blue-500
            pathColor: "#3b82f6", // Tailwind Blue-500
            trailColor: "#e5e7eb", // Tailwind Gray-200
          })}
        />
      </div>
      <h4 className="mt-4 text-gray-700">{label}</h4>
    </div>
  );
};

export default CircularProgress;
