import { render, fireEvent } from '@testing-library/react';
import OrderItem from '../../../components/Forms/OrderItem'; // Aggiusta il percorso se necessario
import { OrderModel, ProductOrderModel } from '../../../models/orderModel';

describe('OrderItem', () => {
  const mockOrder = new OrderModel('2022-01-01', 'In Progress', [new ProductOrderModel('1', 2)], '123');
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnView = jest.fn();

  it('renders without crashing', () => {
    render(<OrderItem order={mockOrder} onEdit={mockOnEdit} onDelete={mockOnDelete} onView={mockOnView} />);
  });

  it('calls the correct function when the view icon is clicked', () => {
    const { getByTestId } = render(<OrderItem order={mockOrder} onEdit={mockOnEdit} onDelete={mockOnDelete} onView={mockOnView} />);
    fireEvent.click(getByTestId('view-icon'));
    expect(mockOnView).toHaveBeenCalledWith(mockOrder);
  });
});