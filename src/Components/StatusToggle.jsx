const StatusToggle = ({ status, onChange }) => {
    const statusOptions = ["active", "inactive", "suspend"];
    const statusColors = {
      active: "bg-green-500",
      inactive: "bg-yellow-500",
      suspend: "bg-red-500",
    };
  
    return (
      <div className="inline-flex items-center gap-1">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
              option === status
                ? `${statusColors[option]} text-white font-semibold`
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    );
  };
  
  
export default StatusToggle;