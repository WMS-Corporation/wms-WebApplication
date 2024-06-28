
import {fireEvent, render, screen} from "@testing-library/react";
import TaskItem from "../../../components/Forms/TaskItem";
import React from "react";
import CorridorItem from "../../../components/Forms/CorridorItem";

const mockCorridor = {
    _name: 'Corridor 1',
    _shelfCodeList: ['000001', '000012'],
    _codCorridor: '000001'
};

jest.mock('../../../controllers/LogisticController', () => ({
    getShelfs: jest.fn(),
}));
const mockOnEdit = jest.fn();
const mockOnView = jest.fn();
describe('Component Corridor item', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            corridor: mockCorridor,
            onEdit: mockOnEdit,
            onView: mockOnView,
            type: 'Admin',
            ...overrideProps,
        };

        return render(<CorridorItem {...props} />);
    };

    test('renders corridor details correctly', () => {
        renderComponent()

        expect(screen.getByText('000001')).toBeInTheDocument();
        expect(screen.getByText('Corridor 1')).toBeInTheDocument();
    });

    test('calls onEdit when the edit icon is clicked', () => {
        const { container } = renderComponent();

        const editIcon = container.querySelector('.edit-icon');
        fireEvent.click(editIcon);
        expect(mockOnEdit).toHaveBeenCalledWith(mockCorridor);
    });

    test('calls onView when the view icon is clicked', () => {
        const { container } = renderComponent();

        const viewIcon = container.querySelector('.view-icon');
        fireEvent.click(viewIcon);
        expect(mockOnView).toHaveBeenCalledWith(null, mockCorridor._codCorridor);
    });
});
