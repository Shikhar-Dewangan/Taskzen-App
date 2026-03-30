import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {

  const state = useSelector((state) => state.tasks)

  console.log("TASK STATE:", state)

  const tasksList = Array.isArray(state.tasks) ? state.tasks : [];

  const { status, error } = state;

  if (status === 'loading') {
    return (
      <div className="text-center py-10">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (tasksList.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No tasks yet! Add your first task above.
      </div>
    );
  }

  return (
  <div className="mt-6 space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Your Tasks ({tasksList.length})
      </h3>

      {tasksList.map((task) => (
        <TaskItem key={task.$id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;