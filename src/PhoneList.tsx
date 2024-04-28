import React, {useEffect} from 'react';
import {
    fetchPhones,
    deletePhone,
    deleteAllPhones, togglePhoneCalled
} from './state/phoneSlice';
import {useAppDispatch, useAppSelector} from "./state/store";
import {Grid, Card, CardContent, IconButton, Typography, Checkbox} from '@mui/material';
import {Phone as PhoneIcon, Delete as DeleteIcon} from '@mui/icons-material';


export const PhoneList: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPhones());
    }, [dispatch]);
    const phones = useAppSelector(state => state.phones.phones);

    const handleCall = (phone: string) => {
        // Логика для совершения звонка
        console.log('Calling', phone);
    };

    const handleRemove = (id: string) => {
        dispatch(deletePhone(id));
    };
    const handleCheckboxChange = (id: string) => {
        dispatch(togglePhoneCalled(id));
    };

    return (
        <>
            <IconButton onClick={() => dispatch(deleteAllPhones())} sx={{width: 40, height: 40}} color="primary">
                <DeleteIcon fontSize="large"/>
            </IconButton>
            <Grid container spacing={2} sx={{margin: '10px'}}>
                {phones.map(phone => (
                    <Grid item key={phone.id} xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{'&:hover': {backgroundColor: 'rgba(0, 255, 0, 0.1)'}}}>
                            <CardContent>
                                <Checkbox
                                    checked={phone.called} // Статус чекбокса
                                    onChange={() => handleCheckboxChange(phone.id)} // Функция при изменении чекбокса
                                    sx={{
                                        float: 'right',
                                        color: 'green', // Цвет галочки
                                    }}
                                />
                                <Typography variant="body1">{phone.number}</Typography>
                                <Typography variant="caption" color="text.secondary" fontStyle="italic"
                                            textAlign="right">
                                    {new Date(phone.date).toLocaleString()}
                                </Typography>
                                <IconButton onClick={() => handleCall(phone.number)} sx={{color: 'green'}}>
                                    <PhoneIcon/>
                                </IconButton>
                                <IconButton onClick={() => handleRemove(phone.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};


