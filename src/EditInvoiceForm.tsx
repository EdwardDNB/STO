// src/components/EditInvoiceForm.tsx
import React, { ChangeEvent } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Invoice, Task } from './state/invoicesSlice';
import { EditTaskForm } from './EditTaskForm';

interface EditInvoiceFormProps {
    invoice: Invoice;
    onChange: (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
    onTaskChange: (taskId: string, e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}

export const EditInvoiceForm: React.FC<EditInvoiceFormProps> = ({ invoice, onChange, onTaskChange, onSave }) => {
    return (
        <form>
            <Typography variant="h6">Invoice Details</Typography>
            <TextField
                label="Work Cost"
                name="workCost"
                type="number"
                value={invoice.workCost}
                onChange={onChange}
                fullWidth
                margin="dense"
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>Tasks</Typography>
            {invoice.tasks.map((task: Task) => (
                <EditTaskForm
                    key={task.id}
                    task={task}
                    onChange={(e) => onTaskChange(task.id, e)}
                />
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={onSave}
                sx={{ marginTop: 2 }}
            >
                Save
            </Button>
        </form>
    );
};
