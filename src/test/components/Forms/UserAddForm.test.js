import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserModel from "../../../models/userModel";
import UserAddForm from "../../../components/Forms/UserAddForm";

test('renders UserAddForm', () => {
    const user = new UserModel();
    const onSave = jest.fn();
    const onCancel = jest.fn();

    const { getByText } = render(
        <UserAddForm user={user} onSave={onSave} onCancel={onCancel} />
    );

    // Simulate clicking the save button
    fireEvent.click(getByText('Save'));
    expect(onSave).toHaveBeenCalled();

    // Simulate clicking the cancel button
    fireEvent.click(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
});