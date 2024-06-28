import {render, fireEvent, screen} from '@testing-library/react';
import {CorridorModel, ZoneModel} from "../../../models/logisticModel";
import React from "react";
import ZoneItem from "../../../components/Forms/ZoneItem";

const mockZone = new ZoneModel('20', 'Active', '10', ['000123', '000234'], '000543');
const mockOnEdit = jest.fn();
const mockOnView = jest.fn();
const mockOnDelete = jest.fn();
describe('Component Zone item', () => {
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

    test('renders zone details correctly', () => {
        renderComponent()

        expect(screen.getByText(mockZone._codZone)).toBeInTheDocument();
        expect(screen.getByText(mockZone._temperature)).toBeInTheDocument();
        expect(screen.getByText(mockZone._coolingSystemStatus)).toBeInTheDocument();
        expect(screen.getByText(mockZone._humidityLevel)).toBeInTheDocument();
        expect(screen.getByText(mockZone._corridorCodeList.length)).toBeInTheDocument();
    });

    // test('calls onEdit when the edit icon is clicked', () => {
    //     const { container } = renderComponent();
    //
    //     const editIcon = container.querySelector('.edit-icon');
    //     fireEvent.click(editIcon);
    //     expect(mockOnEdit).toHaveBeenCalledWith(mockZone);
    // });
    //
    // test('calls onView when the view icon is clicked', () => {
    //     const { container } = renderComponent();
    //
    //     const viewIcon = container.querySelector('.view-icon');
    //     fireEvent.click(viewIcon);
    //     expect(mockOnView).toHaveBeenCalledWith(null, mockZone._codZone);
    // });
    //
    // test('calls onDelete when the delete icon is clicked', () => {
    //     const { container } = renderComponent();
    //
    //     const deleteIcon = container.querySelector('.delete-icon');
    //     fireEvent.click(deleteIcon);
    //     expect(mockOnDelete).toHaveBeenCalledWith(mockZone._codZone);
    // });

});