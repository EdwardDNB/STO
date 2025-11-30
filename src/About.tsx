import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    Container, Grid, Typography, Button, TextField, Card, CardContent, CardHeader
} from '@mui/material';
import { addPhoneHandle } from "./state/phoneSlice";
import { useAppDispatch } from "./state/store";
import { PhoneNumber } from "./AboutPhoneNumber";
import { SocialIcons } from "./AboutSocialIcons";

const RootContainer = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1603360931894-cd7bda512f90?q=80&w=2070")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // затемнюючий напівпрозорий шар
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(2px)',
    }
}));

const GlassCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    maxWidth: 420,
    width: '100%',
    padding: theme.spacing(3),
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.10)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
}));

const LangBtn = styled(Button)(({ theme }) => ({
    color: '#fff',
    fontWeight: 600,
    '&.MuiButton-contained': {
        backgroundColor: '#d32f2f',
        '&:hover': {
            backgroundColor: '#b71c1c',
        }
    }
}));

export const About: React.FC = () => {
    const [language, setLanguage] = useState<string>('uk');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const dispatch = useAppDispatch();

    const validatePhoneNumber = (value: string) => {
        const pattern = /^(050|066|067|068|073|091|093|094|095|096|097|098|099)\d{7}$/;
        setIsValidPhoneNumber(pattern.test(value));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setPhoneNumber(value);
        value ? validatePhoneNumber(value) : setIsValidPhoneNumber(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValidPhoneNumber && phoneNumber !== "") {
            setIsFormSubmitted(true);
            dispatch(addPhoneHandle(phoneNumber));
        } else {
            setIsValidPhoneNumber(false);
        }
    };

    return (
        <RootContainer>
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container justifyContent="space-between" alignItems="center" marginBottom={4}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <img
                                    src="http://localhost:3001/images/IconRepair.png"
                                    alt="Logo"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        border: '2px solid #fff'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
                                    {language === 'uk' ? 'СТО “AVTOREPAIR”' : 'Car Service “AVTOREPAIR”'}
                                </Typography>
                                <Typography sx={{ color: '#bbb', marginTop: 1 }}>
                                    {language === 'uk'
                                        ? 'Професійний догляд за вашим авто'
                                        : 'Professional care for your vehicle'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                            <Grid item>
                                <LangBtn
                                    variant={language === 'uk' ? 'contained' : 'text'}
                                    onClick={() => setLanguage('uk')}
                                >
                                    Укр
                                </LangBtn>
                            </Grid>
                            <Grid item>
                                <Typography color="#fff">|</Typography>
                            </Grid>
                            <Grid item>
                                <LangBtn
                                    variant={language === 'en' ? 'contained' : 'text'}
                                    onClick={() => setLanguage('en')}
                                >
                                    Eng
                                </LangBtn>
                            </Grid>

                            <PhoneNumber />
                            <SocialIcons />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center">
                    <GlassCard>
                        <CardHeader
                            title={language === 'uk' ? 'ЗАПИС НА СЕРВІС' : 'BOOK A SERVICE'}
                            titleTypographyProps={{
                                align: 'center',
                                fontSize: 22,
                                fontWeight: 700,
                                color: '#fff'
                            }}
                        />
                        <CardContent>
                            <Typography variant="body1" sx={{ color: '#ddd', mb: 2 }}>
                                {language === 'uk'
                                    ? 'Майстер перетелефонує вам для уточнення деталей та часу візиту.'
                                    : 'A service master will contact you to confirm the details.'}
                            </Typography>

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    id="phone"
                                    name="phone"
                                    value={phoneNumber}
                                    label="+38 (___) ___-__-__"
                                    onChange={handlePhoneChange}
                                    error={!isValidPhoneNumber}
                                    helperText={!isValidPhoneNumber && (language === 'uk'
                                        ? 'Некоректний номер'
                                        : 'Invalid number')}
                                    InputLabelProps={{ style: { color: '#bbb' } }}
                                    InputProps={{
                                        style: {
                                            color: '#fff',
                                            borderRadius: 8
                                        }
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        py: 1.4,
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        backgroundColor: '#ff3333',
                                        '&:hover': { backgroundColor: '#cc0000' }
                                    }}
                                    disabled={!isValidPhoneNumber || isFormSubmitted}
                                >
                                    {isFormSubmitted
                                        ? (language === 'uk'
                                            ? 'ЗАЯВКА ВІДПРАВЛЕНА'
                                            : 'REQUEST SENT')
                                        : (language === 'uk'
                                            ? 'ЗАПИСАТИСЯ'
                                            : 'SIGN UP')}
                                </Button>
                            </form>

                            <Typography variant="body2" sx={{ mt: 2, color: '#aaa', fontStyle: 'italic' }}>
                                {language === 'uk'
                                    ? '*Або зареєструйтеся, щоб заповнити заявку самостійно'
                                    : '*Or register to fill out the form yourself'}
                            </Typography>
                        </CardContent>
                    </GlassCard>
                </Grid>
            </Container>
        </RootContainer>
    );
};
