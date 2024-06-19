import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderAddForm from '../../../components/Forms/OrderAddForm';
import { OrderModel } from '../../../models/orderModel';

test('renders OrderAddForm', () => {
  const order = new OrderModel();
  const onSave = jest.fn();
  const onCancel = jest.fn();

  const { getByText } = render(
    <OrderAddForm order={order} onSave={onSave} onCancel={onCancel} />
  );

  // Simulate clicking the save button
  fireEvent.click(getByText('Save'));
  expect(onSave).toHaveBeenCalled();

  // Simulate clicking the cancel button
  fireEvent.click(getByText('Cancel'));
  expect(onCancel).toHaveBeenCalled();
});