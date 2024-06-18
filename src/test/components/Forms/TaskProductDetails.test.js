import { render, screen} from "@testing-library/react";
import React from "react";
import TaskProductDetails from "../../../components/Forms/TaskProductDetails";

const mockProductInTask = {
    _codProduct: '000001',
    _from: null,
    _to: '000013',
    _quantity: 20
};

describe('Component Task Product details item', () => {

    const renderComponent = (overrideProps = {}) => {
        const props = {
            product: mockProductInTask,
            ...overrideProps,
        };

        return render(<TaskProductDetails {...props} />);
    };

    test('renders task product details correctly', () => {
        renderComponent()

        expect(screen.getByText('000001')).toBeInTheDocument();
        expect(screen.getByText('Outside')).toBeInTheDocument();
        expect(screen.getByText(20)).toBeInTheDocument();
    });

});