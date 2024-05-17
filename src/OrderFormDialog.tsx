import React, { ChangeEvent, useState, useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { Order } from "./state/ordersSlice";

interface OrderFormProps {
    onSubmit: (order: Order) => void;
    initialOrder?: Order;
    title: string;
    open: boolean;
    onClose: () => void;
}

export const OrderFormDialog: React.FC<OrderFormProps> = ({ onSubmit, initialOrder, title, open, onClose }) => {
    const initialFormState = initialOrder ? initialOrder : {
        id: '',
        carBrand: '',
        carModel: '',
        licensePlate: '',
        serviceType: '',
        desiredDate: '',
        desiredTime: '',
        comments: '',
        phoneNumber: ''
    }
    const [order, setOrder] = useState<Order>(initialFormState);

    useEffect(() => {
        if (initialOrder) {
            setOrder(initialOrder);
        }
    }, [initialOrder]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        onSubmit(order);
        setOrder({
            id: '',
            carBrand: '',
            carModel: '',
            licensePlate: '',
            serviceType: '',
            desiredDate: '',
            desiredTime: '',
            comments: '',
            phoneNumber: ''
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="carBrand"
                    label="Car Brand"
                    fullWidth
                    value={order.carBrand}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="carModel"
                    label="Car Model"
                    fullWidth
                    value={order.carModel}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="licensePlate"
                    label="License Plate"
                    fullWidth
                    value={order.licensePlate}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="serviceType"
                    label="Service Type"
                    fullWidth
                    value={order.serviceType}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="desiredDate"
                    label="Desired Date"
                    type="date"
                    fullWidth
                    value={order.desiredDate}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    name="desiredTime"
                    label="Desired Time"
                    type="time"
                    fullWidth
                    value={order.desiredTime}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    margin="dense"
                    name="comments"
                    label="Comments"
                    fullWidth
                    multiline
                    rows={4}
                    value={order.comments}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    value={order.phoneNumber}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};
