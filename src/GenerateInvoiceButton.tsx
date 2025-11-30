import React, { useState, useEffect } from 'react';
import {
    Button,
    CircularProgress,
    Typography,
    Box,
    Card,
    CardContent
} from '@mui/material';
import { styled } from '@mui/system';
import { addInvoiceAsync } from './state/invoicesSlice';
import {
    selectError,
    selectLoading,
    useAppSelector,
    useAppDispatch
} from "./state/store";

// === Glass стилі у стилі About ===
const GlassCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    padding: theme.spacing(2),
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.10)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    mt: 2,
    py: 10,
    fontWeight: 700,
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#ff3333',
    '&:hover': {
        backgroundColor: '#cc0000'
    },
}));

export const GenerateInvoiceButton: React.FC<{ orderId: string }> = ({ orderId }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const [invoiceCreated, setInvoiceCreated] = useState(false);
    const [requestStarted, setRequestStarted] = useState(false);

    const handleGenerateInvoice = () => {
        setRequestStarted(true);
        setInvoiceCreated(false);
        dispatch(addInvoiceAsync(orderId));
    };

    useEffect(() => {
        if (requestStarted && !loading) {
            if (!error) {
                setInvoiceCreated(true);
            } else {
                setInvoiceCreated(false);
            }
        }
    }, [requestStarted, loading, error]);

    return (
        <Box width="100%" mt={2}>
            <GlassCard>
                <CardContent>

                    <StyledButton
                        variant="contained"
                        fullWidth
                        onClick={handleGenerateInvoice}
                        disabled={loading || invoiceCreated}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: '#fff' }} />
                        ) : invoiceCreated ? (
                            "INVOICE GENERATED"
                        ) : (
                            "GENERATE INVOICE"
                        )}
                    </StyledButton>

                    {error && !loading && (
                        <Typography
                            variant="body2"
                            color="#ffb3b3"
                            sx={{ mt: 2 }}
                        >
                            {error}
                        </Typography>
                    )}
                </CardContent>
            </GlassCard>
        </Box>
    );
};
