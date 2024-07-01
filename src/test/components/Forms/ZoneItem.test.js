
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from "react";
import ZoneItem from "../../../components/Forms/ZoneItem";
import { getCorridors } from '../../../controllers/LogisticController';

const mockZone = {
    _codZone: 'Z001',
    _temperature: '5°C',
    _coolingSystemStatus: 'Active',
    _humidityLevel: '45%',
    _corridorCodeList: ['C001', 'C002'],
};

const mockOnEdit = jest.fn();
const mockOnView = jest.fn();
const mockOnDelete = jest.fn();

jest.mock('../../../controllers/LogisticController', () => ({
    getCorridors: jest.fn(),
}));

describe('Zone item component', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            zone: mockZone,
            onEdit: mockOnEdit,
            onView: mockOnView,
            onDelete: mockOnDelete,
            type: "Admin",
            ...overrideProps,
        };

        return render(<ZoneItem {...props} />);
    };

    beforeEach(() => {
        getCorridors.mockResolvedValue([]);
    });

    test('renders zone details correctly', () => {
        renderComponent()

        expect(screen.getByText(mockZone._codZone)).toBeInTheDocument();
        expect(screen.getByText(mockZone._temperature)).toBeInTheDocument();
        expect(screen.getByText(mockZone._coolingSystemStatus)).toBeInTheDocument();
        expect(screen.getByText(mockZone._humidityLevel)).toBeInTheDocument();
        expect(screen.getByText(mockZone._corridorCodeList.length)).toBeInTheDocument();
    });

});