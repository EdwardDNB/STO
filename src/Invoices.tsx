// src/App.tsx
import React, { useEffect, useState } from 'react';
import { InvoicesGrid } from './InvoicesGrid';
import { EditInvoiceDialog } from './EditInvoiceDialog';
import {
    fetchInvoices,
        updateInvoiceAsync,
    setPaymentDoneAsync,
    Invoice,
} from './state/invoicesSlice';
import {selectInvoices, useAppDispatch, useAppSelector,selectLoading,selectError} from "./state/store";


export const Invoices: React.FC = () => {
    const dispatch = useAppDispatch();
    const invoices = useAppSelector(selectInvoices);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        dispatch(fetchInvoices());
    }, [dispatch]);

    const handleEditInvoice = (invoice: Invoice) => {
        dispatch(updateInvoiceAsync(invoice));
        setCurrentInvoice(null);
    };

    const handleEditClick = (invoice: Invoice) => {
        setCurrentInvoice(invoice);
    };

    const handleCloseDialog = () => {
        setCurrentInvoice(null);
    };

    const handleTogglePaymentDone = (invoice: Invoice) => {
        dispatch(setPaymentDoneAsync(invoice.id, !invoice.paymentDone));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <div>
            <InvoicesGrid
                invoices={invoices}
                onEditInvoice={handleEditClick}
                onTogglePaymentDone={handleTogglePaymentDone}
            />
            {currentInvoice && (
                <EditInvoiceDialog
                    open={Boolean(currentInvoice)}
                    onClose={handleCloseDialog}
                    invoice={currentInvoice}
                    onEdit={handleEditInvoice}
                />
            )}
        </div>
    );
};


