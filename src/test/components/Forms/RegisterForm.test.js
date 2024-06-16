import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import RegisterForm from "../../../components/Forms/RegisterForm";

describe('Component Register Form', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            onRegister: jest.fn().mockRejectedValue({ message: 'Invalid field data' }),
            setIsRegistering: jest.fn(),
            ...overrideProps,
        };

        return render(<RegisterForm {...props} />);
    };

    test('renders register form with all elements', () => {
        renderComponent();

        expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Surname')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
        expect(screen.getByText(/back to/i)).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('renders input fields for username and password', () => {
        renderComponent();

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Surname')).toBeInTheDocument();
    });

    test('renders register button', () => {
        renderComponent();

        const registerButton = screen.getByRole('button', { name: /register/i });
        expect(registerButton).toBeInTheDocument();
        expect(registerButton).not.toBeDisabled();
    });

    test('renders login link', () => {
        renderComponent();

        const loginLink = screen.getByText(/login/i);
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute('tabIndex', '0');
    });

    test('login link can be focused and activated with Enter key', () => {
        renderComponent();

        const loginLink = screen.getByText(/login/i);
        loginLink.focus();
        expect(loginLink).toHaveFocus();

        fireEvent.keyPress(loginLink, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText(/login/i)).toHaveFocus();
    });

    test('displays error message when errors prop is provided', async () => {
        renderComponent();

        fireEvent.click(screen.getByRole('button', {name: /register/i}));

        await screen.findByText(/Invalid field data/i);
        expect(screen.getByText(/Invalid field data/i)).toBeInTheDocument();
    });
});