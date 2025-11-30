// src/components/InvoicesGrid.tsx
import React from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { InvoiceCard } from './InvoiceCard';
import { Invoice } from './state/invoicesSlice';

// === Фон у стилі About + затемнення ===
const BackgroundWrapper = styled(Box)(() => ({
    minHeight: "100vh",
    width: "100%",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundImage:
        `url("https://images.unsplash.com/photo-1603360931894-cd7bda512f90?q=80&w=2070")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",

    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1,
    }
}));

// === Контейнер для контенту ===
const ContentBox = styled(Box)(() => ({
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: 1400,
}));

interface InvoicesGridProps {
    invoices: Invoice[];
    onEditInvoice: (invoice: Invoice) => void;
    onTogglePaymentDone: (invoice: Invoice) => void;
    handleDelete: (id: string) => void;
}

export const InvoicesGrid: React.FC<InvoicesGridProps> = ({
                                                              invoices,
                                                              onEditInvoice,
                                                              onTogglePaymentDone,
                                                              handleDelete
                                                          }) => {
    return (
        <BackgroundWrapper>
            <ContentBox>
                <Grid container spacing={4}>
                    {invoices.map((invoice) => (
                        <Grid item key={invoice.id} xs={12} sm={6} md={4}>
                            <InvoiceCard
                                invoice={invoice}
                                onEdit={() => onEditInvoice(invoice)}
                                onTogglePaymentDone={() => onTogglePaymentDone(invoice)}
                                handleDelete={() => handleDelete(invoice.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </ContentBox>
        </BackgroundWrapper>
    );
};
