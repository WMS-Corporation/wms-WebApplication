import {render, screen} from "@testing-library/react";
import React from "react";
import ProductAddForm from "../../../components/Forms/ProductAddForm";
import ProductModel from "../../../models/productModel";

describe('Component Product Add Form', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            product: new ProductModel(),
            error: 'Please ensure all required fields are included',
            ...overrideProps,
        };

        return render(<ProductAddForm {...props} />);
    };

    test('renders product add form with all elements', () => {
        renderComponent();

        expect(screen.getByRole('heading', { name: /Add Product/i })).toBeInTheDocument();
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

    test('displays error message when errors prop is provided', async () => {
        renderComponent();
        expect(screen.getByText(/Please ensure all required fields are included/i)).toBeInTheDocument();
    });
});