// import {render, fireEvent, screen} from '@testing-library/react';
// import OrderItem from '../../../components/Forms/OrderItem'; // Aggiusta il percorso se necessario
// import {CorridorModel} from "../../../models/logisticModel";
// import CorridorItem from "../../../components/Forms/CorridorItem";
// import React from "react";
//
// const mockCorridor = new CorridorModel('Corridor 2', ['000123', '000234'], '000045');
// const mockOnEdit = jest.fn();
// const mockOnView = jest.fn();
// const mockOnDelete = jest.fn();
// describe('Corridor item component', () => {
//     const renderComponent = (overrideProps = {}) => {
//         const props = {
//             corridor: mockCorridor,
//             onEdit: mockOnEdit,
//             onView: mockOnView,
//             onDelete: mockOnDelete,
//             type: "Admin",
//             ...overrideProps,
//         };
//
//         return render(<CorridorItem {...props} />);
//     };
//
//     test('renders corridor details correctly', () => {
//         renderComponent()
//
//         expect(screen.getByText('000045')).toBeInTheDocument();
//         expect(screen.getByText('Corridor 2')).toBeInTheDocument();
//     });
//
//     test('calls onEdit when the edit icon is clicked', () => {
//         const { container } = renderComponent();
//
//         const editIcon = container.querySelector('.edit-icon');
//         fireEvent.click(editIcon);
//         expect(mockOnEdit).toHaveBeenCalledWith(mockCorridor);
//     });
//
//     test('calls onView when the view icon is clicked', () => {
//         const { container } = renderComponent();
//
//         const viewIcon = container.querySelector('.view-icon');
//         fireEvent.click(viewIcon);
//         expect(mockOnView).toHaveBeenCalledWith(null, mockCorridor._codCorridor);
//     });
//
//     test('calls onDelete when the delete icon is clicked', () => {
//         const { container } = renderComponent();
//
//         const deleteIcon = container.querySelector('.delete-icon');
//         fireEvent.click(deleteIcon);
//         expect(mockOnDelete).toHaveBeenCalledWith(mockCorridor._codCorridor);
//     });
//
// });