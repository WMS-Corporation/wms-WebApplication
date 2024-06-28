import React, { useEffect, useState, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import { getOrders } from '../../controllers/OrderController';
import { getTasks } from '../../controllers/TaskController';
import '../styles/Dashboard.css'
import {FaClipboardList, FaPeopleCarry, FaTasks} from "react-icons/fa";
import {getAllUsers} from "../../controllers/UserController";
import {getStorages} from "../../controllers/LogisticController";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const orderChartRef = useRef(null);
    const ctxOrderRef = useRef(null);
    
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [avainableStorages, setAvainableStorage] = useState([]);
    const [storage, setStorage] = useState({_codStorage: ''});
    const taskChartRef = useRef(null);
    const ctxTaskRef = useRef(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        const fetchTasksData = async () => {
            try {
                const fetchedTasks = await getTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        };

        const fetchUsersData = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        const fetchStorages = async () => {
            try {
                const fetchedStorages = await getStorages();
                setAvainableStorage(fetchedStorages);
            } catch (error) {
                console.error('Failed to fetch storages:', error);
            }
        };

        fetchStorages()
        loadOrders();
        fetchTasksData();
        fetchUsersData()
    }, []);

    const handleChange = (event) => {
        setStorage({
            ...storage,
            [event.target.name]: event.target.value,
        });
    };

    const generateOrderChart = () => {
        if (ctxOrderRef.current) { // Check if the ref is not null
            const ctx = ctxOrderRef.current.getContext('2d');

            if (taskChartRef.current) {
                taskChartRef.current.destroy();
            }

            const statusCounts = orders.reduce((acc, order) => {
                acc[order._status] = (acc[order._status] || 0) + 1;
                return acc;
            }, {});

            taskChartRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        data: Object.values(statusCounts),
                        backgroundColor: ['#1E90FF', '#4682B4', '#87CEFA', '#B0C4DE', '#708090'],
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    }
                }
            });
        }
    };
    
    const generateTaskChart = () => {
        if (ctxTaskRef.current) { // Check if the ref is not null
            const ctx = ctxTaskRef.current.getContext('2d');

            if (orderChartRef.current) {
                orderChartRef.current.destroy();
            }

            const statusCounts = tasks.reduce((acc, order) => {
                acc[order._status] = (acc[order._status] || 0) + 1;
                return acc;
            }, {});

            orderChartRef.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(statusCounts),
                    datasets: [{
                        data: Object.values(statusCounts),
                        backgroundColor: ['#1E90FF', '#4682B4', '#87CEFA', '#B0C4DE', '#708090'],
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    }
                }
            });
        }
    };

    useEffect(() => {
        if (orders.length > 0) {
            generateOrderChart();
        }
    }, [orders]);

    useEffect(() => {
        if (tasks.length > 0) {
            generateTaskChart();
        }
    }, [tasks]);

    return (
        <div className="Container">
            <div className="col-lg-4 border-none">
                <div className="card card-transparent card-block card-stretch card-height border-none">
                    <div className="card-body p-0 mt-lg-2 mt-0">
                        <h1>Welcome to Warehouse Master System</h1>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <div className="card card-block card-stretch card-height">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4 card-total-sale">
                                    <div className="icon iq-icon-box-2 bg-info-light">
                                        <FaTasks />
                                    </div>
                                    <div>
                                        <p className="mb-2">Tasks</p>
                                        <h4>{tasks.filter(task => task._status !== "Completed").length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="card card-block card-stretch card-height">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4 card-total-sale">
                                    <div className="icon iq-icon-box-2 bg-info-light">
                                        <FaClipboardList />
                                    </div>
                                    <div>
                                        <p className="mb-2">Orders</p>
                                        <h4>{orders.filter(order => order._status !== "Completed").length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="card card-block card-stretch card-height">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4 card-total-sale">
                                    <div className="icon iq-icon-box-2 bg-info-light">
                                        <FaPeopleCarry />
                                    </div>
                                    <div>
                                        <p className="mb-2">Operational</p>
                                        <h4>{users.filter(user => user._type === "Operational").length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart-container">
                <div className="chart-item">
                    <h4>Task Overview</h4>
                    <canvas ref={ctxTaskRef}></canvas>
                </div>
                <div className="chart-item">
                    <h4>Order Overview</h4>
                    <canvas ref={ctxOrderRef}></canvas>
                </div>
                <div className="chart-item zone">
                    <h4>Zone Temperature Overview</h4>
                    <div className="form-group dashboard">
                        <label>Storage</label>
                        <select className="form-control" name="_codStorage" value={storage._codStorage}
                                onChange={handleChange}>
                            {avainableStorages.map(storage => (
                                <option key={storage._codStorage}
                                        value={storage._codStorage}>{storage._codStorage}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Dashboard;