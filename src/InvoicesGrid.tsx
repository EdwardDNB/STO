// src/components/InvoicesGrid.tsx
import React from 'react';
import { Grid,Box } from '@mui/material';
import { InvoiceCard } from './InvoiceCard';
import { Invoice } from './state/invoicesSlice';

interface InvoicesGridProps {
    invoices: Invoice[];
    onEditInvoice: (invoice: Invoice) => void;
    onTogglePaymentDone: (invoice: Invoice) => void;
    handleDelete: (id:string) => void;
}

export const InvoicesGrid: React.FC<InvoicesGridProps> = ({ invoices, onEditInvoice, onTogglePaymentDone,handleDelete }) => {
    return (
        <Box
        sx={{
            backgroundImage: `url('https://source.unsplash.com/featured/1600x900/?background')`,
            backgroundSize: 'cover',
            minHeight: '100vh',
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}
    >
        <Grid container spacing={3}>
            {invoices?invoices.map((invoice) => (
                <Grid item key={invoice.id} xs={12} sm={6} md={4}>
                    <InvoiceCard
                        invoice={invoice}
                        onEdit={() => onEditInvoice(invoice)}
                        onTogglePaymentDone={() => onTogglePaymentDone(invoice)}
                        handleDelete={()=>handleDelete(invoice.id)}
                    />
                </Grid>
            )):<div></div>}
        </Grid>
        </Box>
    );
};
