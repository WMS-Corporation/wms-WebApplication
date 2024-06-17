import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import ProductModel from "../../../models/productModel";
import ProductEditForm from "../../../components/Forms/ProductEditForm";

describe('Component Product Edit Form', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            product: new ProductModel({_name: 'Sample Product',
                _category: 'Sample Category',
                _expirationDate: new Date().toISOString().split('T')[0],
                _type: 'Refrigerated'}),
            ...overrideProps,
        };

        return render(<ProductEditForm {...props} />);
    };

    test('renders product edit form with all elements', () => {
        renderComponent();

        expect(screen.getByRole('heading', { name: /Edit Product/i })).toBeInTheDocument();
        expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
        expect(screen.getAllByRole('textbox')[1]).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    });

    test('renders create button', () => {
        renderComponent();

        const createButton = screen.getByRole('button', { name: /Save/i });
        expect(createButton).toBeInTheDocument();
        expect(createButton).not.toBeDisabled();
    });

    test('renders cancel button', () => {
        renderComponent();

        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).not.toBeDisabled();
    });
});