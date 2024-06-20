import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {TaskModel} from "../../../models/taskModel";
import TaskList from "../../../components/Forms/TaskList";

describe('TaskList Component', () => {
    const tasks = [
        new TaskModel('Operator1', '2024-06-15', 'Type1', 'Status1', [], '_codTask1' ),
        new TaskModel( 'Operator2', '2024-06-16', 'Type2', 'Status2', [], '_codTask2')
    ];

    const viewProductDetailTask = new TaskModel('Operator3', '2024-06-17', 'Type3', 'Status3', [
        { _codProduct: 'Product1', from: 'Location1', to: 'Location2', quantity: 10 },
        { _codProduct: 'Product2', from: 'Location3', to: 'Location4', quantity: 20 }
    ], '_codTask3');

    const mockOnAdd = jest.fn();
    const mockOnEdit = jest.fn();
    const mockOnDelete = jest.fn();
    const mockOnSave = jest.fn();
    const mockOnView = jest.fn();
    const mockOnError = jest.fn();

    const renderTaskList = (viewProductDetailTask) => {
        return render(
            <TaskList
                tasks={tasks}
                onAdd={mockOnAdd}
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                onSave={mockOnSave}
                onView={mockOnView}
                viewProductDetailTask={viewProductDetailTask}
                onError={mockOnError}
            />
        );
    };

    test('renders Task List header', () => {
        renderTaskList(null);
        const headerElement = screen.getByText(/Task List/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders Add Task button', () => {
        renderTaskList(null);
        const addButton = screen.getByText(/Add Task/i);
        expect(addButton).toBeInTheDocument();
    });

    test('renders task table when no viewProductDetailTask', () => {
        renderTaskList(null);
        const operatorCodeHeader = screen.getByText(/Operator Code/i);
        expect(operatorCodeHeader).toBeInTheDocument();
        const taskItems = screen.getAllByText(/Operator/i);
        expect(taskItems.length).toBeGreaterThan(0);
    });

    test('renders product details table when viewProductDetailTask is provided', () => {
        renderTaskList(viewProductDetailTask);
        const productCodeHeader = screen.getByText(/Product Code/i);
        expect(productCodeHeader).toBeInTheDocument();
        const productItems = screen.getAllByText(/Product/i);
        expect(productItems.length).toBeGreaterThan(0);
    });

    test('calls onAdd when Add Task button is clicked', () => {
        renderTaskList(null);
        const addButton = screen.getByText(/Add Task/i);
        fireEvent.click(addButton);
        expect(mockOnAdd).toHaveBeenCalled();
    });

});