import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Setting from '../../components/Setting';

describe('Setting Component', () => {

    const mockSaveUser = jest.fn();
    const mockToggleTheme = jest.fn();

    const renderComponent = () => {
        return render(
            <Setting saveUser={mockSaveUser} toggleTheme={mockToggleTheme} />
        );
    };

    test('renders the settings page with general and account settings', () => {
        renderComponent()

        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('General Settings')).toBeInTheDocument();
        expect(screen.getByText('Account Settings')).toBeInTheDocument();

        expect(screen.getByText('Theme')).toBeInTheDocument();
        expect(screen.getByText('Light')).toBeInTheDocument();
        expect(screen.getByText('Dark')).toBeInTheDocument();

        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter a new username')).toBeInTheDocument();

        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter a new password')).toBeInTheDocument();

        expect(screen.getByText('Save')).toBeInTheDocument();
    });

    test('allows user to input username and password', () => {
        renderComponent()

        const usernameInput = screen.getByPlaceholderText('Enter a new username');
        fireEvent.change(usernameInput, { target: { value: 'newusername' } });
        expect(usernameInput.value).toBe('newusername');

        const passwordInput = screen.getByPlaceholderText('Enter a new password');
        fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
        expect(passwordInput.value).toBe('newpassword');
    });

});
