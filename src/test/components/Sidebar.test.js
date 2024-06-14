import {render, screen} from '@testing-library/react';
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

    test('should Dashboard link', () => {
        const { getByText } = renderSidebar(true);
        const linkElement = getByText(/Dashboard/i);
        expect(linkElement).toBeInTheDocument();
    });

});