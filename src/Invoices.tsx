import React, { useEffect, useState } from 'react';
import { InvoicesGrid } from './InvoicesGrid';
import { EditInvoiceDialog } from './EditInvoiceDialog';
import {
    fetchInvoices,
    updateInvoiceAsync,
    setPaymentDoneAsync,
    Invoice,
    deleteInvoiceAsync,
} from './state/invoicesSlice';

import {
    selectInvoices,
    selectLoading,
    selectError,
    useAppDispatch,
    useAppSelector
} from "./state/store";

import { styled } from "@mui/system";
import { CircularProgress, Typography, Box } from "@mui/material";

// === Glass Wrapper like About Page ===
const GlassWrapper = styled(Box)(() => ({
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    textAlign: "center",
    padding: 40,
    backgroundImage: `url("https://images.unsplash.com/photo-1603360931894-cd7bda512f90?q=80&w=2070")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",

    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)"
    }
}));

const GlassCard = styled(Box)(() => ({
    position: "relative",
    zIndex: 2,
    padding: "30px 40px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.25)",
}));


export const Invoices: React.FC = () => {
    const dispatch = useAppDispatch();

    const invoices = useAppSelector(selectInvoices);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

    const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchInvoices());
        }
    }, [dispatch, isAuthenticated]);

    const handleEditInvoice = async (invoice: Invoice) => {
        await dispatch(updateInvoiceAsync(invoice));
        setCurrentInvoice(null);
    };

    const handleEditClick = (invoice: Invoice) => {
        setCurrentInvoice(invoice);
    };

    const handleTogglePaymentDone = (invoice: Invoice) => {
        dispatch(setPaymentDoneAsync(invoice.id, !invoice.paymentDone));
    };

    const handleDelete = (id: string) => {
        dispatch(deleteInvoiceAsync(id));
    };

    // --- LOADING ---
    if (loading) {
        return (
            <GlassWrapper>
                <GlassCard>
                    <CircularProgress size={50} sx={{ color: "#ff4444" }} />
                    <Typography sx={{ mt: 2 }}>Loading invoices…</Typography>
                </GlassCard>
            </GlassWrapper>
        );
    }

    // --- ERROR ---
    if (error) {
        return (
            <GlassWrapper>
                <GlassCard>
                    <Typography variant="h5" sx={{ mb: 2, color: "#ff7777" }}>
                        Error loading invoices
                    </Typography>
                    <Typography>{error}</Typography>
                </GlassCard>
            </GlassWrapper>
        );
    }

    return (
        <div>
            <InvoicesGrid
                invoices={invoices}
                onEditInvoice={handleEditClick}
                onTogglePaymentDone={handleTogglePaymentDone}
                handleDelete={handleDelete}
            />

            {currentInvoice && (
                <EditInvoiceDialog
                    open={Boolean(currentInvoice)}
                    onClose={() => setCurrentInvoice(null)}
                    invoice={currentInvoice}
                    onEdit={handleEditInvoice}
                />
            )}
        </div>
    );
};
