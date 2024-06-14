import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';

describe('Componente Header', () => {
    const mockToggleSidebar = jest.fn();
    const mockLogout = jest.fn();

    const renderHeader = () => {
        return render(
            <AuthContext.Provider value={{ logout: mockLogout }}>
                <Header toggleSidebar={mockToggleSidebar} />
            </AuthContext.Provider>
        );
    };

    test('dovrebbe rendere il logo e il logo della sidebar', () => {
        const { getByAltText, getByText } = renderHeader();

        expect(getByAltText('WMS Logo')).toBeInTheDocument();
        expect(getByText('WMS')).toBeInTheDocument();
    });

    test('dovrebbe chiamare toggleSidebar quando si clicca su FaBars', () => {
        const { container } = renderHeader();
        const sidebarToggle = container.querySelector('.sidebar-toggle');
        fireEvent.click(sidebarToggle);
        expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    });

    test('dovrebbe chiamare logout quando si clicca su IoMdPower', () => {
        const { container } = renderHeader();
        const powerOff = container.querySelector('.power-off');
        fireEvent.click(powerOff);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
