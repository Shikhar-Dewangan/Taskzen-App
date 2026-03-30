import React, { useEffect, useState } from 'react';

const ProgressChart = ({ completionRate }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Animate percentage on change
    setPercentage(completionRate || 0);
  }, [completionRate]);

  // ✅ Fix circle calculation
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Completion</h3>

      <div className="flex flex-col items-center justify-center">
        {/* Circular Progress - Fixed */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#3b82f6"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
              style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-800">{percentage}%</p>
              <p className="text-sm text-gray-500 mt-1">Completed</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{percentage}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-600 rounded-full h-3 transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Status Message */}
        {percentage === 100 && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            🎉 Congratulations! All tasks completed! 🎉
          </div>
        )}
        {percentage === 0 && (
          <div className="mt-4 p-3 bg-gray-100 text-gray-600 rounded-lg text-sm">
            📝 No tasks completed yet. Start checking off your tasks!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;