import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserModel from "../../../models/userModel";
import UserList from "../../../components/Forms/UserList";

const mockUsers = [
    new UserModel("000001", "username1", "", "Martin", "Marcolini", "Operational"),
    new UserModel("000002", "username2", "", "Riccardo", "Paoli", "Admin")
]

const mockOnAdd = jest.fn()
describe('Component User list', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            users: mockUsers,
            onEdit: () => {},
            onDelete: () => {},
            onError: () => {},
            onAdd: mockOnAdd,
            ...overrideProps,
        };

        return render(<UserList {...props} />);
    };

    test('renders user list correctly', () => {
        renderComponent()

        expect(screen.getByText('User List')).toBeInTheDocument();
        expect(screen.getByText('Add User')).toBeInTheDocument();
        mockUsers.forEach(user => {
            expect(screen.getByText(user._name)).toBeInTheDocument();
            expect(screen.getByText(user._surname)).toBeInTheDocument();
            expect(screen.getByText(user._username)).toBeInTheDocument();
            expect(screen.getByText(user._type)).toBeInTheDocument();
        });
    });

    test('calls onAdd when Add User button is clicked', () => {
        renderComponent()
        fireEvent.click(screen.getByText('Add User'));

        expect(mockOnAdd).toHaveBeenCalled();
    });
});