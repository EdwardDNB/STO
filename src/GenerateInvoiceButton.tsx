// src/components/GenerateInvoiceButton.tsx
import React, {useState} from 'react';
import {Button, CircularProgress, Typography, Box, Card, CardContent} from '@mui/material';
import {addInvoiceAsync} from './state/invoicesSlice';
import {selectError, selectLoading, useAppSelector, useAppDispatch} from "./state/store";


interface GenerateInvoiceButtonProps {
    orderId: string;
}

export const GenerateInvoiceButton: React.FC<GenerateInvoiceButtonProps> = ({orderId}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);
    const [invoiceCreated, setInvoiceCreated] = useState(false);


    function handleGenerateInvoice() {
        dispatch(addInvoiceAsync(orderId));
        if (!error) {
            setInvoiceCreated(true);
        }
    }

    return (
        <Box width="100%" textAlign="center">
            <Card sx={{position: 'relative'}}>
                <CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateInvoice}
                        disabled={loading || invoiceCreated}
                        fullWidth
                    >
                        {loading ?
                            <CircularProgress size={24}/> : invoiceCreated ? "Invoice Created" : "Generate Invoice"}
                    </Button>
                    {error && !loading && (
                        <Typography variant="body2" color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                </CardContent>
            </Card>

        </Box>
    );
};
