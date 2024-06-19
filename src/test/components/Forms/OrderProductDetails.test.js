import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderProductDetails from '../../../components/Forms/OrderProductDetails';
import { ProductOrderModel } from '../../../models/orderModel';

describe('OrderProductDetails', () => {
    test('renders product details correctly', () => {
        const testProduct = new ProductOrderModel();
        testProduct._codProduct = '123';
        testProduct._quantity = '10';

        render(<OrderProductDetails product={testProduct} />);

        expect(screen.getByText('123')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });
});