import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Layout from "../../components/Layout";

jest.mock('../../components/Header', () => ({ toggleSidebar }) => (
    <div data-testid="header">
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
));

jest.mock('../../components/Sidebar', () => ({isOpen}) => (
    <div data-testid="sidebar">Sidebar is {isOpen ? 'open' : 'closed'}</div>
));
describe('Component Layout', () => {
    const toggleSidebar = jest.fn();
    const renderComponent = () => {
        return render(
            <Layout toggleSidebar={toggleSidebar}><div data-testid="content">Content</div></Layout>
        );
    };

    test('renders Header and Sidebar', () => {
        renderComponent()
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();

        expect(screen.getByTestId('content')).toBeInTheDocument();
    });

    test('applies correct class to main when isOpen is true', () => {
        renderComponent()
        const toggleButton = screen.getByText('Toggle Sidebar');
        fireEvent.click(toggleButton);
        expect(screen.getByRole('main')).toHaveClass('content-open');
    });

    test('applies correct class to main when isOpen is false', () => {
        renderComponent()
        expect(screen.getByRole('main')).toHaveClass('content');
    });

});
