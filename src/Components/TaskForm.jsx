import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchTask,addTask} from '../Store/taskSlice'
import { authService, taskService } from './Index';

function TaskForm() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskText, setTaskText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskText.trim()) {
      alert('Please enter a task!');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("📝 Submitting task:", taskText);
      
      // ✅ Task add karo
      const result = dispatch(addTask({
        userId: user.$id,
        taskText: taskText.trim()
      }));
      
      console.log("📝 Dispatch result:", result);
      
      // ✅ Task add hone ke baad force refresh tasks
      if (result) {
        console.log("📝 Task added, refreshing tasks...");
        await dispatch(fetchTask(user.$id));
      }
      
      setTaskText('');
      console.log("📝 Task added and refreshed successfully!");
    } catch (error) {
      console.error('Task add error:', error);
      alert('Task add nahi hua!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Write your task here..."
        disabled={isSubmitting}
       className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
      />
      <button
        type="submit"
        disabled={isSubmitting}
       className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 text-sm sm:text-base"
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;