import React, { useEffect, useState, useRef } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import { getOrders } from '../../controllers/OrderController';
import { getTasks } from '../../controllers/TaskController'; 

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const orderChartRef = useRef(null);
    const ctxOrderRef = useRef(null);
    
    const [tasks, setTasks] = useState([]);
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

        loadOrders();
        fetchTasksData();
    }, []);

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
                        backgroundColor: ['yellow', 'green', 'red', 'blue', 'purple', 'orange', 'pink'],
                    }],
                },
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
                        backgroundColor: ['yellow', 'green', 'red', 'blue', 'purple', 'orange', 'pink'],
                    }],
                },
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
        <div>
            <h1>Benvenuto nella tua applicazione WMS</h1>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ flex: 1 }}>
                    <canvas ref={ctxOrderRef}></canvas>
                </div>
                <div style={{ flex: 1 }}>
                    <canvas ref={ctxTaskRef}></canvas>
                </div>
                <div style={{ flex: 1 }}>
                    <canvas id="orderChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;