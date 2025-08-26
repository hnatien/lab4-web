import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [isCreating, setIsCreating] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/tasks`);
            setTasks(response.data.data);
            setError('');
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        try {
            setIsCreating(true);
            await axios.post(`${API_BASE_URL}/tasks`, newTask);
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Failed to create task');
        } finally {
            setIsCreating(false);
        }
    };

    const handleToggleTask = async (taskId, completed) => {
        try {
            await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { completed: !completed });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Failed to delete task');
        }
    };

    const handleEditTask = async (taskId, updatedData) => {
        try {
            await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedData);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
            setError('Failed to update task');
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                color: '#666'
            }}>
                Loading tasks...
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <h1 style={{
                color: 'black',
                marginBottom: '30px'
            }}>
                My Tasks
            </h1>

            {error && (
                <div style={{
                    padding: '10px',
                    marginBottom: '20px',
                    backgroundColor: '#f8f8f8',
                    color: 'black',
                    border: '1px solid black',
                    fontSize: '14px'
                }}>
                    {error}
                </div>
            )}

            <div style={{
                backgroundColor: 'white',
                border: '1px solid black',
                padding: '25px',
                marginBottom: '30px'
            }}>
                <h2 style={{
                    color: 'black',
                    marginBottom: '20px'
                }}>
                    Create New Task
                </h2>
                <form onSubmit={handleCreateTask}>
                    <div style={{ marginBottom: '15px' }}>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <textarea
                            placeholder="Task description (optional)"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                fontSize: '16px',
                                minHeight: '100px',
                                resize: 'vertical',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isCreating}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: '1px solid black',
                            fontSize: '16px',
                            cursor: isCreating ? 'not-allowed' : 'pointer',
                            opacity: isCreating ? 0.7 : 1
                        }}
                    >
                        {isCreating ? 'Creating...' : 'Create Task'}
                    </button>
                </form>
            </div>

            <div style={{
                backgroundColor: 'white',
                border: '1px solid black',
                padding: '25px'
            }}>
                <h2 style={{
                    color: 'black',
                    marginBottom: '20px'
                }}>
                    All Tasks ({tasks.length})
                </h2>

                {tasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: '#666'
                    }}>
                        <p>No tasks yet. Create your first task above!</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        {tasks.map(task => (
                            <div key={task._id} style={{
                                padding: '20px',
                                border: '1px solid #ccc',
                                backgroundColor: task.completed ? '#f8f8f8' : 'white'
                            }}>
                                {editingTask === task._id ? (
                                    <TaskEditForm
                                        task={task}
                                        onSave={handleEditTask}
                                        onCancel={() => setEditingTask(null)}
                                    />
                                ) : (
                                    <TaskItem
                                        task={task}
                                        onToggle={handleToggleTask}
                                        onDelete={handleDeleteTask}
                                        onEdit={() => setEditingTask(task._id)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    }}>
        <div style={{ flex: 1 }}>
            <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '18px',
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#666' : 'black'
            }}>
                {task.title}
            </h3>
            {task.description && (
                <p style={{
                    margin: '0 0 10px 0',
                    color: '#666',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}>
                    {task.description}
                </p>
            )}
            <small style={{ color: '#999' }}>
                Created: {new Date(task.createdAt).toLocaleDateString()}
            </small>
        </div>
        <div style={{
            display: 'flex',
            gap: '8px',
            flexDirection: 'column'
        }}>
            <button
                onClick={() => onToggle(task._id, task.completed)}
                style={{
                    padding: '6px 12px',
                    backgroundColor: task.completed ? '#666' : 'black',
                    color: 'white',
                    border: '1px solid black',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button
                onClick={onEdit}
                style={{
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Edit
            </button>
            <button
                onClick={() => onDelete(task._id)}
                style={{
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: '1px solid black',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Delete
            </button>
        </div>
    </div>
);

const TaskEditForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onSave(task._id, formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                    required
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        minHeight: '80px',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                gap: '10px'
            }}>
                <button
                    type="submit"
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid black',
                        cursor: 'pointer'
                    }}
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'white',
                        color: 'black',
                        border: '1px solid black',
                        cursor: 'pointer'
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Tasks;
