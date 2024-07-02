import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import '../styles/Dashboard.css'
import { FaClipboardList, FaPeopleCarry, FaTasks, FaFileAlt } from "react-icons/fa";
import { getUsers, getStorages, getZones, getOrders, getTasks, generateAndDownloadReport  } from "../../controllers/DashboardController";
import { } from "../../controllers/LogisticController";
import { useAuth } from "../../contexts/AuthContext";
import TaskItem from "./TaskItem";

const Dashboard = () => {
    const { user } = useAuth() || {};
    const [orders, setOrders] = useState([]);
    const orderChartRef = useRef(null);
    const ctxOrderRef = useRef(null);

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [avainableStorages, setAvainableStorage] = useState([]);
    const [storage, setStorage] = useState({ _codStorage: '', _zoneCodeList: '' });
    const [zones, setZones] = useState([]);
    const taskChartRef = useRef(null);
    const ctxTaskRef = useRef(null);

    const tempChartRef = useRef(null);
    const ctxTempRef = useRef(null);

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
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        const fetchStorages = async () => {
            try {
                const fetchedStorages = await getStorages();
                setAvainableStorage(fetchedStorages);
                setStorage(fetchedStorages[0])
                await fetchZones(fetchedStorages[0]._codStorage)
            } catch (error) {
                console.error('Failed to fetch storages:', error);
            }
        };

        fetchStorages()
        loadOrders();
        fetchTasksData();
        fetchUsersData()
    }, []);

    const fetchZones = async (codStorage) => {
        console.error(codStorage)
        try {
            const fetchedZones = await getZones(codStorage);
            setZones(fetchedZones);
        } catch (error) {
            console.error('Failed to fetch zones:', error);
        }
    };

    const handleChange = (event) => {
        const updatedStorage = {
            ...storage,
            [event.target.name]: event.target.value,
        };
        setStorage(updatedStorage);
        fetchZones(updatedStorage._codStorage)
        generateTemperatureChart()
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
                            display: true,
                            position: 'right'
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
                            display: true,
                            position: 'right',
                            font: {
                                size: 10 // Imposta la dimensione del font della legenda
                            },
                            boxWidth: 10, // Imposta la dimensione del rettangolino
                            usePointStyle: true, // Utilizza il punto stile per le etichette
                            padding: 5 // Riduce il padding tra le etichette
                        }
                    }
                }
            });
        }
    };

    const generateTemperatureChart = () => {
        if (ctxTempRef.current) {
            const ctx = ctxTempRef.current.getContext('2d');

            if (tempChartRef.current) {
                tempChartRef.current.destroy();
            }

            const zoneTemperatures = zones.reduce((acc, zone) => {
                acc[zone._codZone] = zone._temperature;
                return acc;
            }, {});

            const thresholdRefrigerated = process.env.REACT_APP_TEMPERATURE_REFRIGERATED_VALID_RANGE;
            const thresholdNoRefrigerated = process.env.REACT_APP_TEMPERATURE_NOT_REFRIGERATED_VALID_RANGE;
            const colors = ['#1E90FF', '#4682B4', '#87CEFA', '#B0C4DE', '#708090'];

            const backgroundColors = Object.values(zones).map((zone, index) => {
                const temp = zone._temperature;
                const status = zone._coolingSystemStatus;

                if (
                    (status === 'Active' && (temp < thresholdRefrigerated[0] || temp > thresholdRefrigerated[1])) ||
                    (status !== 'Active' && (temp < thresholdNoRefrigerated[0] || temp > thresholdNoRefrigerated[1]))
                ) {
                    return 'red';
                } else {
                    return colors[index % colors.length];
                }
            });

            tempChartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(zoneTemperatures),
                    datasets: [{
                        label: 'Temperature',
                        data: Object.values(zoneTemperatures),
                        backgroundColor: backgroundColors,
                        borderColor: backgroundColors,
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                color: document.body.classList.contains('dark') ? 'white' : 'black',
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Temperature'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Zone Code'
                            }
                        }
                    }
                }
            });
        }
    }

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

    useEffect(() => {
        generateTemperatureChart()
    }, [zones]);

    return (
        <div >
            <div className="col-lg-4 border-none">
                <div className="header-and-cards">
                    <div className="welcome">
                        <h1>Welcome {user._username}</h1>
                    </div>
                    <div className="col-lg-8">
                        {user?._type === "Operational" ? (
                            <>
                                <div className="col-lg-4 col-md-4" style={{marginLeft: '56vw'}}>
                                    <div className="card card-block card-stretch card-height">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-4 card-total-sale">
                                                <div className="icon iq-icon-box-2 bg-info-light">
                                                    <FaTasks/>
                                                </div>
                                                <div>
                                                    <p className="mb-2">Tasks</p>
                                                    <h4>{tasks.filter(task => task._status !== "Completed").length}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : <>
                            <div className="col-lg-4 col-md-4">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4 card-total-sale">
                                            <div className="icon iq-icon-box-2 bg-info-light">
                                                <FaTasks/>
                                            </div>
                                            <div>
                                                <p className="mb-2">Tasks</p>
                                                <h4>{tasks.filter(task => task._status !== "Completed").length}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                        {user?._type === "Admin" ? (
                            <>
                                <div className="col-lg-4 col-md-4">
                                    <div className="card card-block card-stretch card-height">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-4 card-total-sale">
                                                <div className="icon iq-icon-box-2 bg-info-light">
                                                    <FaClipboardList/>
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
                                                    <FaPeopleCarry/>
                                                </div>
                                                <div>
                                                    <p className="mb-2">Operational</p>
                                                    <h4>{users.filter(user => user._type === "Operational").length}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : null}
                        {user?._type === "Admin" ? (
                            <div className="col-lg-10 col-md-10">
                                <div className="card card-block card-stretch card-height">
                                    <div className="card-body d-flex align-items-center justify-content-center">
                                        <button
                                            className="btn-Submit-task btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                                            onClick={generateAndDownloadReport}>
                                            <FaFileAlt className="me-2"/> Generate Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="Container">
                {user?._type === "Admin" ? (
                    <>
                        <div className="chart-container">
                            <div className="chart-item-pie">
                                <h4>Task Overview</h4>
                                <canvas className="pie-chart" ref={ctxTaskRef}></canvas>
                            </div>
                            <div className="chart-item-pie">
                                <h4>Order Overview</h4>
                                <canvas className="pie-chart" ref={ctxOrderRef}></canvas>
                            </div>
                            <div className="chart-item-zone">
                                <h4>Zone Temperature Overview</h4>
                                <div className="form-group-dashboard">
                                    <label>Storage</label>
                                    <select className="form-control-dashboard" name="_codStorage"
                                            value={storage._codStorage}
                                            onChange={handleChange}>
                                        {avainableStorages.map(storage => (
                                            <option key={storage._codStorage}
                                                    value={storage._codStorage}>{storage._codStorage}</option>
                                        ))}
                                    </select>
                                </div>
                                <canvas className="temp-chart" ref={ctxTempRef}></canvas>

                            </div>
                        </div>
                    </>
                ) : <>
                    <table style={{marginLeft: "2vw", marginRight: "4vw"}}>
                        <thead>
                        <tr>
                            <th>Task Code</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.filter(task => task._codOperator === user._codUser && task._status !== "Completed").map((task) => (
                            <TaskItem key={task._codTask} task={task} onEdit={null}
                                      onSave={null} onView={null} admin={false} dashboard={true}/>
                        ))}
                        </tbody>
                    </table>
                </>}
            </div>
        </div>
    )
        ;
};

export default Dashboard;