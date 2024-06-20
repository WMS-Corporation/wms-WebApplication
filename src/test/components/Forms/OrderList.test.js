import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from "../../../components/Forms/OrderList";
import {OrderModel} from "../../../models/orderModel";

describe('OrderList', () => {
    test('renders order list correctly', () => {
        const testOrders = [
            new OrderModel( '2022-01-01', 'Pending', [], '1'),
            new OrderModel('2022-01-02', 'Shipped', [], '2')
        ];

        render(<OrderList orders={testOrders} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} onSave={() => {}} onView={() => {}} onError={() => {}} />);

        expect(screen.getByText('Order List')).toBeInTheDocument();
        expect(screen.getByText('Add Order')).toBeInTheDocument();
        testOrders.forEach(order => {
            expect(screen.getByText(order._codOrder)).toBeInTheDocument();
            expect(screen.getByText(order._date.toISOString().split('T')[0])).toBeInTheDocument();
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