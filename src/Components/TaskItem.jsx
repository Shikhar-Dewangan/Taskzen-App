import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from '../Store/taskSlice';


const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.taskText);
    const [isUpdating, setIsUpdating] = useState(false);

    // Toggle complete status
    const handleToggleComplete = async () => {
        try {
            dispatch(editTask({
                taskId: task.$id,
                updatedData: { status: !task.status }
            }));
        } catch (error) {
            console.error('Toggle error:', error);
        }
    };

    // Start editing
    const handleEditClick = () => {
        setIsEditing(true);
        setEditText(task.taskText);
    };

    // Save edited task
    const handleEditSave = async () => {
        if (!editText.trim()) {
            alert('Task cannot be empty!');
            return;
        }

        setIsUpdating(true);
        try {
            dispatch(editTask({
                taskId: task.$id,
                updatedData: { taskText: editText.trim() }
            }));
            setIsEditing(false);
        } catch (error) {
            console.error('Edit error:', error);
            alert('Update failed!');
        } finally {
            setIsUpdating(false);
        }
    };

    // Cancel editing
    const handleEditCancel = () => {
        setIsEditing(false);
        setEditText(task.taskText);
    };

    // Delete task
    const handleDelete = async () => {
        if (window.confirm('Delete this task?')) {
            try {
                dispatch(deleteTask(task.$id));
            } catch (error) {
                console.error('Delete error:', error);
                alert('Delete failed!');
            }
        }
    };

    return (
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm hover:shadow-md transition">

            {/* Toggle */}
            <input
                type="checkbox"
                checked={task.status}
                onChange={handleToggleComplete}
                className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer shrink-0"
            />

            {/* TEXT / EDIT (SAME PLACE) */}
            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    disabled={isUpdating}
                    autoFocus
                    className="flex-1 bg-transparent border-b border-blue-400 focus:outline-none text-sm sm:text-base min-w-0"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditSave();
                        if (e.key === "Escape") handleEditCancel();
                    }}
                />
            ) : (
                <span
                    className={`flex-1 text-sm sm:text-base truncate ${task.status ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                >
                    {task.taskText}
                </span>
            )}

            {/* RIGHT SIDE BUTTONS */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleEditSave}
                            disabled={isUpdating}
                            className="px-2 py-1 text-[10px] sm:text-xs bg-green-600 text-white rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleEditCancel}
                            disabled={isUpdating}
                           className="px-2 py-1 text-[10px] sm:text-xs bg-gray-500 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleEditClick}
                           className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={handleDelete}
                          className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                            🗑️
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};

export default TaskItem;