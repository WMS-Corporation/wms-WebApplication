import {fireEvent, render, screen} from '@testing-library/react';
import Login from '../../components/Login'
import {MemoryRouter} from 'react-router-dom';
import React from "react";
import PropTypes from "prop-types";

const RegisterForm = ({ setIsRegistering }) => (
    <div data-testid="register-form">
        <button onClick={() => setIsRegistering(false)}>Login</button>
    </div>
);
RegisterForm.propTypes = {
    setIsRegistering: PropTypes.func.isRequired,
};
jest.mock('../../components/Forms/RegisterForm', () => RegisterForm);

const LoginForm = ({ setIsRegistering }) => (
    <div data-testid="login-form">
        <button onClick={() => setIsRegistering(true)}>Register</button>
    </div>
);
LoginForm.propTypes = {
    setIsRegistering: PropTypes.func.isRequired,
};
jest.mock('../../components/Forms/LoginForm', () => LoginForm);

describe('Login Component', () => {
    const renderComponent = () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );
    };

    test('should render LoginForm initially', () => {
        renderComponent();
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
        expect(screen.queryByTestId('register-form')).not.toBeInTheDocument();
    });

    test('should render register form when isRegistering is true', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Register'));

        expect(screen.getByTestId('register-form')).toBeInTheDocument();

        expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
    });

    test('should renders footer correctly', () => {
        renderComponent();

        const footerText = screen.getByText((content, element) => {
            return element.tagName.toLowerCase() === 'p' && /© 2024 - WMS Corporation -/.test(content);
        });
        expect(footerText).toBeInTheDocument();
        expect(screen.getByText(/Privacy/i).closest('a')).toHaveAttribute('href', '/privacy');
    });
});