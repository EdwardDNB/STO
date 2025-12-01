import React, { useEffect } from 'react';
import {
    fetchPhones,
    deletePhone,
    deleteAllPhones,
    togglePhoneCalled
} from './state/phoneSlice';
import { useAppDispatch, useAppSelector } from "./state/store";
import {
    Grid,
    IconButton,
    Typography,
    Checkbox,
    Box,
    CardContent
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from "@mui/system";
import { PhoneAnimatedButton } from "./PhoneAnimatedButton";

// === Стилізований фон (аналог About) ===
const RootContainer = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage:
        'url("https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=20700")',
    background: 'rgba(0,0,0,0.55)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: theme.spacing(4),

    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(2px)',
        zIndex: 1
    }
}));

// === Glass Card для Phone Item ===
const GlassCard = styled('div')(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    padding: theme.spacing(2),
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.10)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    color: '#fff',
    transition: '0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    '&:hover': {
        transform: 'translateY(-4px)',
        borderColor: 'rgba(255,255,255,0.45)'
    }
}));

// Верхня кнопка очистки всіх заявок
const ClearAllButton = styled(IconButton)(() => ({
    zIndex: 2,
    width: 48,
    height: 48,
    color: '#ff4d4d',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
    transition: '0.3s ease',
    marginBottom: 16,

    '&:hover': {
        background: 'rgba(255,255,255,0.25)'
    }
}));

export const PhoneList: React.FC = () => {
    const dispatch = useAppDispatch();
    const phones = useAppSelector(state => state.phones.phones);

    useEffect(() => {
        dispatch(fetchPhones());
    }, [dispatch]);

    const handleRemove = (id: string) => {
        dispatch(deletePhone(id));
    };

    const handleCheckboxChange = (id: string) => {
        dispatch(togglePhoneCalled(id));
    };

    return (
        <RootContainer>
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <ClearAllButton onClick={() => dispatch(deleteAllPhones())}>
                    <DeleteIcon fontSize="large" />
                </ClearAllButton>

                <Grid container spacing={3}>
                    {phones.map(phone => (
                        <Grid item key={phone.id} xs={12} sm={6} md={4} lg={3}>
                            <GlassCard
                                style={{
                                    borderColor: phone.called
                                        ? 'rgba(0,255,0,0.5)'
                                        : 'rgba(255,255,255,0.25)',
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" sx={{ color: '#fff' }}>
                                        {phone.number}
                                    </Typography>

                                    <Checkbox
                                        checked={phone.called}
                                        onChange={() => handleCheckboxChange(phone.id)}
                                        sx={{
                                            color: '#00ff88',
                                            '&.Mui-checked': { color: '#00ff88' }
                                        }}
                                    />
                                </Box>

                                <Typography
                                    variant="caption"
                                    sx={{ opacity: 0.7, fontStyle: 'italic' }}
                                >
                                    {new Date(phone.date).toLocaleString()}
                                </Typography>

                                <PhoneAnimatedButton phone={phone.number} />

                                <IconButton
                                    onClick={() => handleRemove(phone.id)}
                                    sx={{ alignSelf: 'flex-end', color: '#ff6666' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </RootContainer>
    );
};
