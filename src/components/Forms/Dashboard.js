import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import { getOrders } from '../../controllers/OrderController';

const Dashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        loadOrders();
    }, []);

    // Funzione per generare il grafico degli ordini
    const generateOrderChart = () => {
        const ctx = document.getElementById('orderChart').getContext('2d');
        const statusCounts = orders.reduce((acc, order) => {
            acc[order._status] = (acc[order._status] || 0) + 1;
            return acc;
        }, {});

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['yellow', 'green', 'red', 'blue', 'purple', 'orange', 'pink'],
                }],
            },
        });
    };

    useEffect(() => {
        if (orders.length > 0) {
            generateOrderChart();
        }
    }, [orders]);

    return (
        <div>
            <h1>Benvenuto nella tua applicazione WMS</h1>
            <h2>Dashboard</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ flex: 1 }}>
                    <canvas id="orderChart"></canvas>
                </div>
                <div style={{ flex: 1 }}>
                    <canvas id="orderChart"></canvas>
                </div>
                <div style={{ flex: 1 }}>
                    <canvas id="orderChart"></canvas>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;