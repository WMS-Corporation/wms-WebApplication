import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import UserItem from "../../../components/Forms/UserItem";
import UserModel from "../../../models/userModel";

const mockUser = new UserModel("000001", "username1", "", "Martin", "Marcolini", "Operational")

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
describe('Component User item', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            user: mockUser,
            onEdit: mockOnEdit,
            onDelete: mockOnDelete,
            ...overrideProps,
        };

        return render(<UserItem {...props} />);
    };

    test('renders user details correctly', () => {
        renderComponent()

        expect(screen.getByText(mockUser._username)).toBeInTheDocument();
        expect(screen.getByText(mockUser._name)).toBeInTheDocument();
        expect(screen.getByText(mockUser._surname)).toBeInTheDocument();
        expect(screen.getByText(mockUser._type)).toBeInTheDocument();
    });

    test('calls onEdit when the edit icon is clicked', () => {
        const { container } = renderComponent();

        const editIcon = container.querySelector('.edit-icon');
        fireEvent.click(editIcon);
        expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
    });

    test('calls onDelete when the delete icon is clicked', () => {
        const { container } = renderComponent();

        const deleteIcon = container.querySelector('.delete-icon');
        fireEvent.click(deleteIcon);
        expect(mockOnDelete).toHaveBeenCalledWith(mockUser);
    });
});