import React, {useEffect} from 'react';
import {
    fetchPhones,
    deletePhone,
    deleteAllPhones, togglePhoneCalled
} from './state/phoneSlice';
import {useAppDispatch, useAppSelector} from "./state/store";
import {Grid, Card, CardContent, IconButton, Typography, Checkbox} from '@mui/material';
import { Delete as DeleteIcon} from '@mui/icons-material';
import {styled} from "@mui/system";
import {PhoneAnimatedButton} from "./PhoneAnimatedButton";


export const PhoneList: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPhones());
    }, [dispatch]);
    const phones = useAppSelector(state => state.phones.phones);


    const handleRemove = (id: string) => {
        dispatch(deletePhone(id));
    };
    const handleCheckboxChange = (id: string) => {
        dispatch(togglePhoneCalled(id));
    };
    const RootContainer = styled('div')(({theme}) => ({
        minHeight: '100vh',
        backgroundImage: 'url(http://localhost:3001/images/young-female-operator-with-headphones.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(2),
    }));
    return (
        <RootContainer>
            <IconButton onClick={() => dispatch(deleteAllPhones())} sx={{width: 40, height: 40}} color="primary">
                <DeleteIcon fontSize="large"/>
            </IconButton>
            <Grid container spacing={2} sx={{margin: '10px'}}>
                {phones.map(phone => (
                    <Grid item key={phone.id} xs={12} sm={6} md={3}>
                        <Card variant="outlined" sx={{
                            '&:hover': {backgroundColor: 'rgba(0, 255, 0, 0.1)'},
                            ...(phone.called && {backgroundColor: 'rgba(0, 255, 0, 0.1)'}),
                        }}>
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
                                <PhoneAnimatedButton phone={phone.number}/>
                                <IconButton onClick={() => handleRemove(phone.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </RootContainer>
    )
};


