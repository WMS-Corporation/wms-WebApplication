import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderEditForm from '../../../components/Forms/OrderEditForm';
import { OrderModel } from '../../../models/orderModel';

describe('OrderEditForm', () => {
    test('calls onSave when form is submitted', () => {
        const onSave = jest.fn();
        const testOrder = new OrderModel({ _id: '1', _date: new Date().toISOString(), _status: 'Pending', _productList: [] });

        render(<OrderEditForm order={testOrder} onSave={onSave} />);

        fireEvent.submit(screen.getByTestId('order-edit-form'));

        expect(onSave).toHaveBeenCalledWith(testOrder);
    });
});