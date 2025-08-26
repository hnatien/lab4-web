import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const Dashboard = () => {
    const { user } = useAuth();
    const [taskStats, setTaskStats] = useState({
        total: 0,
        completed: 0,
        pending: 0
    });
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/tasks`);
                const tasks = response.data.data;
                
                const completed = tasks.filter(task => task.completed).length;
                const pending = tasks.length - completed;
                
                setTaskStats({
                    total: tasks.length,
                    completed,
                    pending
                });
                
                const recent = tasks
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5);
                
                setRecentTasks(recent);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                color: '#666'
            }}>
                Loading dashboard...
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        }}>
            <div style={{
                marginBottom: '30px'
            }}>
                <h1 style={{
                    color: 'black',
                    marginBottom: '10px'
                }}>
                    Welcome back, {user?.username}!
                </h1>
                <p style={{
                    color: '#666',
                    fontSize: '16px',
                    margin: 0
                }}>
                    Here's an overview of your tasks.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
                        {taskStats.total}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Total Tasks</p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
                        {taskStats.completed}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Completed</p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid black',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
                        {taskStats.pending}
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px' }}>Pending</p>
                </div>
            </div>

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
                    Quick Actions
                </h2>
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}>
                    <Link to="/tasks" style={{
                        padding: '12px 24px',
                        backgroundColor: 'black',
                        color: 'white',
                        textDecoration: 'none',
                        border: '1px solid black'
                    }}>
                        View All Tasks
                    </Link>
                    <Link to="/profile" style={{
                        padding: '12px 24px',
                        backgroundColor: 'white',
                        color: 'black',
                        textDecoration: 'none',
                        border: '1px solid black'
                    }}>
                        View Profile
                    </Link>
                </div>
            </div>

            <div style={{
                backgroundColor: 'white',
                border: '1px solid black',
                padding: '25px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{
                        color: 'black',
                        margin: 0
                    }}>
                        Recent Tasks
                    </h2>
                    <Link to="/tasks" style={{
                        color: 'black',
                        textDecoration: 'none',
                        fontSize: '14px'
                    }}>
                        View all →
                    </Link>
                </div>

                {recentTasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: '#666'
                    }}>
                        <p>No tasks yet. Create your first task to get started!</p>
                        <Link to="/tasks" style={{
                            padding: '10px 20px',
                            backgroundColor: 'black',
                            color: 'white',
                            textDecoration: 'none',
                            border: '1px solid black',
                            display: 'inline-block',
                            marginTop: '10px'
                        }}>
                            Create Task
                        </Link>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px'
                    }}>
                        {recentTasks.map(task => (
                            <div key={task._id} style={{
                                padding: '15px',
                                border: '1px solid #ccc',
                                backgroundColor: task.completed ? '#f8f8f8' : 'white'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            margin: '0 0 5px 0',
                                            fontSize: '16px',
                                            textDecoration: task.completed ? 'line-through' : 'none',
                                            color: task.completed ? '#666' : 'black'
                                        }}>
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p style={{
                                                margin: '0 0 10px 0',
                                                color: '#666',
                                                fontSize: '14px'
                                            }}>
                                                {task.description}
                                            </p>
                                        )}
                                        <small style={{ color: '#999' }}>
                                            Created: {new Date(task.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <div style={{
                                        padding: '4px 8px',
                                        backgroundColor: task.completed ? '#666' : 'black',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {task.completed ? 'Completed' : 'Pending'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
