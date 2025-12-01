// src/tests/EditInvoiceForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditInvoiceForm } from '../EditInvoiceForm';
import { Invoice } from '../state/invoicesSlice';

// Мокаємо invoice — без axios, API, запитів
const mockInvoice: Invoice = {
    id: '1',
    orderId: '101',
    firstName: 'John',
    lastName: 'Doe',
    carBrand: 'BMW',
    carModel: 'X5',
    licensePlate: 'AA1234BB',
    serviceType: 'Engine Repair',
    desiredDate: '2024-12-12',
    desiredTime: '14:00',
    comments: '',
    phoneNumber: '+380991234567',
    workCost: 500,
    totalCost: 700,
    paymentDone: false,
    tasks: [
        {
            id: 't1',
            title: 'Oil Change',
            supplies: 'Oil 5W30',
            suppliesCost: 200,
        }
    ]
};

describe('EditInvoiceForm', () => {

    test('renders invoice fields', () => {
        render(
            <EditInvoiceForm
                invoice={mockInvoice}
                onChange={jest.fn()}
                onTaskChange={jest.fn()}
                onSave={jest.fn()}
            />
        );

        // Заголовки
        expect(screen.getByText(/Invoice Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Tasks/i)).toBeInTheDocument();

        // WorkCost інпут має значення
        expect(screen.getByLabelText(/Work Cost/i)).toHaveValue(500);

        // Назва таска — текст, не інпут
        expect(screen.getByText('Oil Change')).toBeInTheDocument();

        // Таск suppliesCost (editable)
        expect(screen.getByDisplayValue('200')).toBeInTheDocument();
    });

    test('calls onChange when Work Cost is changed', () => {
        const handleChange = jest.fn();

        render(
            <EditInvoiceForm
                invoice={mockInvoice}
                onChange={handleChange}
                onTaskChange={jest.fn()}
                onSave={jest.fn()}
            />
        );

        const input = screen.getByLabelText(/Work Cost/i);

        fireEvent.change(input, { target: { value: '999' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('calls onTaskChange when Supplies Cost is edited', () => {
        const handleTaskChange = jest.fn();

        render(
            <EditInvoiceForm
                invoice={mockInvoice}
                onChange={jest.fn()}
                onTaskChange={handleTaskChange}
                onSave={jest.fn()}
            />
        );

        // editable Supplies Cost
        const input = screen.getByDisplayValue('200');

        fireEvent.change(input, { target: { value: '250' } });

        expect(handleTaskChange).toHaveBeenCalledTimes(1);
        expect(handleTaskChange).toHaveBeenCalledWith(
            't1',
            expect.any(Object)
        );
    });

    test('calls onSave when Save button is clicked', () => {
        const handleSave = jest.fn();

        render(
            <EditInvoiceForm
                invoice={mockInvoice}
                onChange={jest.fn()}
                onTaskChange={jest.fn()}
                onSave={handleSave}
            />
        );

        fireEvent.click(screen.getByText(/Save/i));

        expect(handleSave).toHaveBeenCalledTimes(1);
    });
});
