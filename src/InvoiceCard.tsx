// src/InvoiceCard.tsx
import React from "react";
import {
    Typography,
    Fab,
    Checkbox,
    FormControlLabel,
    IconButton,
    Paper,
    CardActions,
    Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Invoice, Task } from "./state/invoicesSlice";
import { styled } from "@mui/system";

// --- Тип для кастомного пропа ---
interface GlassCardProps {
    paid?: boolean;
}

// --- Стиль картки у скляному стилі з урахуванням оплати ---
const GlassCard = styled("div")<GlassCardProps>(({ theme, paid }) => ({
    padding: theme.spacing(3),
    borderRadius: 18,
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    minHeight: "100%",
    width: "100%",
    position: "relative",
    transition: "0.3s ease",
    opacity: paid ? 0.45 : 1,
    boxShadow: "0 8px 20px rgba(0,0,0,0.35)",

    "&:hover": {
        transform: "translateY(-6px)",
        borderColor: "rgba(255,255,255,0.4)",
    }
}));

// --- Заголовок картки ---
const HeaderBox = styled(Box)(() => ({
    background: "rgba(0,0,0,0.25)",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}));

export const InvoiceCard: React.FC<{
    invoice: Invoice;
    onEdit: () => void;
    onTogglePaymentDone: () => void;
    handleDelete: () => void;
}> = ({ invoice, onEdit, onTogglePaymentDone, handleDelete }) => {
    return (
        <GlassCard paid={invoice.paymentDone}>

            {/* Верхня панель */}
            <HeaderBox>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {invoice.firstName} {invoice.lastName}
                </Typography>

                <Fab
                    size="small"
                    color="primary"
                    onClick={onEdit}
                    sx={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                >
                    <EditIcon />
                </Fab>
            </HeaderBox>

            {/* Основний контент */}
            <Box sx={{ mb: 2 }}>
                <Typography><b>Car:</b> {invoice.carBrand} {invoice.carModel}</Typography>
                <Typography><b>Plate:</b> {invoice.licensePlate}</Typography>
                <Typography><b>Phone:</b> {invoice.phoneNumber}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>Tasks:</Typography>

                {invoice.tasks.map((task: Task) => (
                    <Paper
                        key={task.id}
                        sx={{
                            background: "rgba(255,255,255,0.08)",
                            p: 1.2,
                            mb: 1,
                            borderRadius: 2,
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "#eee"
                        }}
                    >
                        <Typography variant="subtitle1">{task.title}</Typography>
                        <Typography variant="body2">Supplies: {task.supplies}</Typography>
                        <Typography variant="body2">Supplies Cost: ${task.suppliesCost}</Typography>
                    </Paper>
                ))}
            </Box>

            <Typography><b>Work Cost:</b> ${invoice.workCost}</Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
                <b>Total:</b> ${invoice.totalCost}
            </Typography>

            <FormControlLabel
                control={<Checkbox checked={invoice.paymentDone} onChange={onTogglePaymentDone} />}
                label="Payment Done"
                sx={{
                    mt: 1,
                    color: "#fff"
                }}
            />

            <CardActions sx={{ justifyContent: "flex-end", mt: 2 }}>
                <IconButton
                    onClick={handleDelete}
                    sx={{ color: "#ff4444" }}
                >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </GlassCard>
    );
};
