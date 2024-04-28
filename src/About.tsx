import React, {useState} from 'react';
import {styled} from '@mui/system';
import {Container, Grid, Typography, Button, TextField, Card, CardContent, CardHeader} from '@mui/material';
import {Instagram, Facebook, Twitter, Mail} from '@mui/icons-material';
import {addPhone, addPhoneHandle} from "./state/phoneSlice";
import {useAppDispatch} from "./state/store";

const RootContainer = styled('div')(({theme}) => ({
    minHeight: '100vh',
    backgroundImage: 'url(http://localhost:3001/images/female-mechanic-working-shop-car-1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({theme}) => ({
    maxWidth: 400,
    margin: 'auto',
}));

export const About: React.FC = () => {
    const [language, setLanguage] = useState<string>('uk'); // Изначально выбран украинский язык
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const dispatch = useAppDispatch()

    const validatePhoneNumber = (value: string) => {
        const ukrainianPhoneNumberPattern = /^(050|066|067|068|073|091|093|094|095|096|097|098|099)\d{7}$/;
        const isValid = ukrainianPhoneNumberPattern.test(value);
        setIsValidPhoneNumber(isValid);
        return isValid;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setPhoneNumber(value);
        if (value !== '') {
            validatePhoneNumber(value);
        } else {
            setIsValidPhoneNumber(false);
        }
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isValidPhoneNumber && phoneNumber !== "") {
            console.log('Phone number is valid:', phoneNumber);
            setIsFormSubmitted(true);
            dispatch(addPhoneHandle(phoneNumber))
        } else {
            console.log('Phone number is not invalid');
            setIsValidPhoneNumber(false);
        }
    };
    return (
        <RootContainer>
            <Container>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <img src="http://localhost:3001/images/logo.jpg" alt="Company logo"
                                     style={{width: 200, height: 200}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {language === 'uk' ? 'СТО "AVTOSERVICE"' : 'Car Service "AVTOSERVICE"'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                                <Button variant={language === 'uk' ? 'contained' : 'text'}
                                        onClick={() => setLanguage('uk')} style={{cursor: 'pointer'}}>Укр</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">|</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant={language === 'en' ? 'contained' : 'text'}
                                        onClick={() => setLanguage('en')} style={{cursor: 'pointer'}}>Eng</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1">063 456 67 89</Typography>
                            </Grid>
                            <Grid item>
                                <Instagram/>
                                <Facebook/>
                                <Twitter/>
                                <Mail/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <StyledCard>
                        <CardHeader title={language === 'uk' ? 'ЗАБРОНЮЙТЕ ЧАС ВІЗИТУ' : 'BOOK YOUR VISIT'}/>
                        <CardContent>
                            <Typography variant="body2">
                                {language === 'uk' ? 'Консультант зателефонує, розрахує приблизну вартість, підбере зручний час та відповість на всі запитання' : 'Our consultant will call you back, calculate the approximate cost, select a convenient time and answer all questions'}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    label="+38 (___) ___-__-__"
                                    name="phone"
                                    onChange={handlePhoneChange}
                                    error={!isValidPhoneNumber}
                                    helperText={!isValidPhoneNumber && (language === 'uk' ? 'Не вірний номер' : 'Invalid number')}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={!isValidPhoneNumber|| isFormSubmitted}
                                >
                                    {isFormSubmitted ? (language === 'uk' ? 'ЗАЯВКА НА ДЗВІНОК ВІДПРАВЛЕНА' : 'APPLICATION FOR A CALL IS SENT') : (language === 'uk' ? 'ЗАПИСАТИСЯ' : 'SIGN UP')}
                                </Button>
                            </form>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Container>
        </RootContainer>
    );
}
