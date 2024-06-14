import {render, screen} from '@testing-library/react';
import Home from '../../components/Home'
import React from "react";

describe('Component Home', () => {
    const renderHome = () => {
        return render(
            <Home/>
        );
    };

    test('should render home', () => {
        const { container } = renderHome();
        const homeElement = container.querySelector('.home');
        expect(homeElement).toBeInTheDocument();
    });

});