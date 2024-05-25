// srcEditInvoiceDialog.tsx
import React, { ChangeEvent, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { Invoice} from './state/invoicesSlice';
import { EditInvoiceForm } from './EditInvoiceForm';

interface EditInvoiceDialogProps {
    open: boolean;
    onClose: () => void;
    invoice: Invoice;
    onEdit: (invoice: Invoice) => void;
}

export const EditInvoiceDialog: React.FC<EditInvoiceDialogProps> = ({ open, onClose, invoice, onEdit }) => {
    const [editedInvoice, setEditedInvoice] = useState<Invoice>(invoice);

    const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target;
        setEditedInvoice(prev => ({ ...prev, [name as string]: value }));
    };

    const handleTaskChange = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedInvoice(prev => ({
            ...prev,
            tasks: prev.tasks.map(task =>
                task.id === taskId ? { ...task, [name]: value } : task
            ),
        }));
    };

    const handleSave = () => {
        onEdit(editedInvoice);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Invoice</DialogTitle>
            <DialogContent>
                <EditInvoiceForm
                    invoice={editedInvoice}
                    onChange={handleChange}
                    onTaskChange={handleTaskChange}
                    onSave={handleSave}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};
