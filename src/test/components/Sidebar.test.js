import { render, screen} from '@testing-library/react';
import Sidebar from '../../components/Sidebar'
import { MemoryRouter } from 'react-router-dom';
import React from "react";

describe('Component Sidebar', () => {
    const renderSidebar = (isOpen) => {
        return render(
            <MemoryRouter>
                <Sidebar isOpen={isOpen} />
            </MemoryRouter>
        );
    };

    test('renders Products link', () => {
        renderSidebar(true);
        const linkElement = screen.getByText(/Products/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders Tasks link', () => {
        renderSidebar(true);
        const linkElement = screen.getByText(/Tasks/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders Logistic link', () => {
        renderSidebar(true);
        const linkElement = screen.getByText(/Logistic/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('renders Settings link', () => {
        renderSidebar(true);
        const linkElement = screen.getByText(/Settings/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('applies the correct class when sidebar is open', () => {
        const { container } = renderSidebar(true);
        expect(container.querySelector('.sidebar-menu')).toBeInTheDocument();
    });

    test('applies the correct class when sidebar is closed', () => {
        const { container } = renderSidebar(false);
        expect(container.querySelector('.nav-menu')).toBeInTheDocument();
    });

});