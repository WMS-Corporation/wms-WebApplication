import {fireEvent, render, screen} from "@testing-library/react";
import TaskItem from "../../../components/Forms/TaskItem";
import React from "react";

const mockTask = {
    _codTask: '000001',
    _codOperator: '000012',
    _status: 'Completed',
    _date: new Date(),
    _type: 'loading',
};

const mockOnEdit = jest.fn();
const mockOnView = jest.fn();
describe('Component Task item', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            task: mockTask,
            onEdit: mockOnEdit,
            onView: mockOnView,
            admin: true,
            ...overrideProps,
        };

        return render(<TaskItem {...props} />);
    };

    test('renders task details correctly', () => {
        renderComponent()

        expect(screen.getByText('000012')).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getByText(mockTask._date.toISOString().substring(0, 10))).toBeInTheDocument();
        expect(screen.getByText('loading')).toBeInTheDocument();
    });

    test('calls onEdit when the edit icon is clicked', () => {
        const { container } = renderComponent();

        const editIcon = container.querySelector('.edit-icon');
        fireEvent.click(editIcon);
        expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
    });

    test('calls onView when the view icon is clicked', () => {
        const { container } = renderComponent();

        const viewIcon = container.querySelector('.view-icon');
        fireEvent.click(viewIcon);
        expect(mockOnView).toHaveBeenCalledWith(mockTask);
    });
});