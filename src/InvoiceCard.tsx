// srcInvoiceCard.tsx
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Fab,
    CardActions,
    Paper,
    Checkbox,
    FormControlLabel,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Invoice, Task} from './state/invoicesSlice';
import DeleteIcon from "@mui/icons-material/Delete";

interface InvoiceCardProps {
    invoice: Invoice;
    onEdit: () => void;
    onTogglePaymentDone: () => void;
    handleDelete: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({invoice, onEdit, onTogglePaymentDone,handleDelete}) => {


    return (
        <Card sx={{maxWidth: 345, margin: 2, position: 'relative', opacity: invoice.paymentDone ? 0.5 : 1}}>
            <CardContent sx={{backgroundColor: 'blue', color: 'white'}}>
                <Typography variant="h6" gutterBottom>
                    {invoice.firstName}{' '}{invoice.lastName}
                </Typography>
                <Typography variant="body1">
                    {invoice.carBrand} {invoice.carModel}
                </Typography>
                <Typography variant="body2">
                    License Plate: {invoice.licensePlate}
                </Typography>
                <Typography variant="body2">
                    Phone Number: {invoice.phoneNumber}
                </Typography>
            </CardContent>
            <CardContent>
                {invoice.tasks.map((task: Task) => (
                    <Paper key={task.id} sx={{padding: 1, marginBottom: 1,wordBreak: 'break-word'}} >
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Typography variant="body2">Supplies: {task.supplies}</Typography>
                        <Typography variant="body2">Supplies Cost: ${task.suppliesCost}</Typography>
                    </Paper>
                ))}
                <Typography variant="body1">Work Cost: ${invoice.workCost}</Typography>
                <Typography variant="h6">Total Cost: ${invoice.totalCost}</Typography>
                <FormControlLabel
                    control={<Checkbox checked={invoice.paymentDone} onChange={onTogglePaymentDone}/>}
                    label="Payment Done"
                />
            </CardContent>
            <CardActions>
                <IconButton
                    onClick={handleDelete}
                    sx={{float: 'right', color: 'rgba(0, 0, 0, 0.54)'}}
                >
                    <DeleteIcon/>
                </IconButton>
                <Fab
                    color="primary"
                    aria-label="edit"
                    size="small"
                    onClick={onEdit}
                    sx={{position: 'absolute', top: 8, right: 8}}
                >
                    <EditIcon/>
                </Fab>
            </CardActions>
        </Card>
    );
};
