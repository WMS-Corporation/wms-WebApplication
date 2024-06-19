import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from './OrderList';
import { OrderModel } from '../../models/orderModel';

describe('OrderList', () => {
    test('renders order list correctly', () => {
        const testOrders = [
            new OrderModel({ _id: '1', _date: '2022-01-01', _status: 'Pending' }),
            new OrderModel({ _id: '2', _date: '2022-01-02', _status: 'Shipped' }),
        ];

        render(<OrderList orders={testOrders} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} onSave={() => {}} onView={() => {}} onError={() => {}} />);

        expect(screen.getByText('Order List')).toBeInTheDocument();
        expect(screen.getByText('Add Order')).toBeInTheDocument();
        testOrders.forEach(order => {
            expect(screen.getByText(order._id)).toBeInTheDocument();
            expect(screen.getByText(order._date)).toBeInTheDocument();
            expect(screen.getByText(order._status)).toBeInTheDocument();
        });
    });

    test('calls onAdd when Add Order button is clicked', () => {
        const onAdd = jest.fn();

        render(<OrderList orders={[]} onAdd={onAdd} onEdit={() => {}} onDelete={() => {}} onSave={() => {}} onView={() => {}} onError={() => {}} />);

        fireEvent.click(screen.getByText('Add Order'));

        expect(onAdd).toHaveBeenCalled();
    });
});