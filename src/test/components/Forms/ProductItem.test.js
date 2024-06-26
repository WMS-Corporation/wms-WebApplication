
import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import ProductItem from "../../../components/Forms/ProductItem";

const mockProduct = {
    _codProduct: '1',
    _name: 'Sample Product',
    _category: 'Sample Category',
    _expirationDate: new Date(),
    _type: 'Refrigerated',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
describe('Component Product item', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            product: mockProduct,
            onEdit: mockOnEdit,
            onDelete: mockOnDelete,
            type: "Admin",
            ...overrideProps,
        };

        return render(<ProductItem {...props} />);
    };

    test('renders product details correctly', () => {
        renderComponent()

        expect(screen.getByText('Sample Product')).toBeInTheDocument();
        expect(screen.getByText('Sample Category')).toBeInTheDocument();
        expect(screen.getByText(mockProduct._expirationDate.toISOString().substring(0, 10))).toBeInTheDocument();
        expect(screen.getByText('Refrigerated')).toBeInTheDocument();
    });

    test('calls onEdit when the edit icon is clicked', () => {
        const { container } = renderComponent();

        const editIcon = container.querySelector('.edit-icon');
        fireEvent.click(editIcon);
        expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
    });

    test('calls onDelete when the delete icon is clicked', () => {
        const { container } = renderComponent();

        const deleteIcon = container.querySelector('.delete-icon');
        fireEvent.click(deleteIcon);
        expect(mockOnDelete).toHaveBeenCalledWith(mockProduct);
    });
});