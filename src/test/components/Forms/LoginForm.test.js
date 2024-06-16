import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import LoginForm from "../../../components/Forms/LoginForm";

describe('Component Login Form', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            onLogin: jest.fn().mockRejectedValue({ message: 'Invalid credentials' }),
            setIsRegistering: jest.fn(),
            ...overrideProps,
        };

        return render(<LoginForm {...props} />);
    };

    test('renders login form with all elements', () => {
        renderComponent();

        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
        expect(screen.getByText(/don't have an account?/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('renders input fields for username and password', () => {
        renderComponent();

        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    test('renders login button', () => {
        renderComponent();

        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
        expect(loginButton).not.toBeDisabled();
    });

    test('renders register link', () => {
        renderComponent();

        const registerLink = screen.getByText(/register/i);
        expect(registerLink).toBeInTheDocument();
        expect(registerLink).toHaveAttribute('tabIndex', '0');
    });

    test('register link can be focused and activated with Enter key', () => {
        renderComponent();

        const registerLink = screen.getByText(/register/i);
        registerLink.focus();
        expect(registerLink).toHaveFocus();

        fireEvent.keyPress(registerLink, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText(/register/i)).toHaveFocus();
    });

    test('displays error message when errors prop is provided', async () => {
        renderComponent();

        fireEvent.click(screen.getByRole('button', {name: /login/i}));

        await screen.findByText(/invalid credentials/i);
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
});