import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';

describe('Component Header', () => {
    const mockToggleSidebar = jest.fn();
    const mockLogout = jest.fn();

    const renderHeader = () => {
        return render(
            <AuthContext.Provider value={{ logout: mockLogout }}>
                <Header toggleSidebar={mockToggleSidebar} />
            </AuthContext.Provider>
        );
    };

    test('should render logo and sidebar logo', () => {
        const { getByAltText, getByText } = renderHeader();

        expect(getByAltText('WMS Logo')).toBeInTheDocument();
        expect(getByText('WMS')).toBeInTheDocument();
    });

    test('should call toggleSidebar when FaBars is clicked', () => {
        const { container } = renderHeader();
        const sidebarToggle = container.querySelector('.sidebar-toggle');
        fireEvent.click(sidebarToggle);
        expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    });

    test('should call logout when IoMdPower is clicked', () => {
        const { container } = renderHeader();
        const powerOff = container.querySelector('.power-off');
        fireEvent.click(powerOff);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
