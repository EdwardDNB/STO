import React, {useState, ChangeEvent, FormEvent} from 'react';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    Grid,
    Link,
    Box,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from "./state/store";
import {handleLogin, registerUserHandle} from "./state/authSlice";
import {About} from "./About";



interface Props {
    // Здесь вы можете добавить необходимые пропсы
}

export const Authentication: React.FC<Props> = () => {
    const [isRegistered, setIsRegistered] = useState<boolean>(true);
    const [isEmail, setIsEmail] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.auth.error);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <About/>; // Если аутентификация успешна, выполняем редирект на /about
    }


    const handleToggle = () => {
        setIsRegistered(!isRegistered);
    };

    const handleInputToggle = () => {
        setIsEmail(!isEmail);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your login or registration logic here
        if (isRegistered) {
            dispatch(handleLogin(email, phone, password))

        } else {
            dispatch(registerUserHandle(name, password, phone, email))
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'name':
                setName(value);
                break;
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url('https://source.unsplash.com/featured/1600x900/?nature')`,
                backgroundSize: 'cover',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card sx={{width: 400}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {isRegistered ? 'Login' : 'Register'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {!isRegistered && (
                            <>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label='Email'
                                    variant="outlined"
                                    name='email'
                                    value={email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label='Phone Number'
                                    variant="outlined"
                                    name='phone'
                                    value={phone}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        {isRegistered && (
                            <>{!isEmail ? (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label={'Phone Number'}
                                    variant="outlined"
                                    name='phone'
                                    value={phone}
                                    onChange={handleChange}
                                />) : (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label={'Email'}
                                    variant="outlined"
                                    name={'email'}
                                    value={email}
                                    onChange={handleChange}
                                />)}
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        {error && (
                            <Typography variant="body2" color="error" mb={2}>
                                {error}
                            </Typography>
                        )}
                        <Grid container justifyContent="space-between" alignItems="center">
                            <FormControlLabel
                                control={<Switch checked={isRegistered} onChange={handleToggle}/>}
                                label={isRegistered ? 'Login' : 'Register'}
                            />
                            {isRegistered && (
                                <FormControlLabel
                                    control={<Switch checked={isEmail} onChange={handleInputToggle}/>}
                                    label={isEmail ? 'Email' : 'Phone Number'}
                                />
                            )}
                            <Button type="submit" variant="contained" color="primary">
                                {isRegistered ? 'Login' : 'Register'}
                            </Button>
                        </Grid>
                    </form>
                    <Typography variant="body2" mt={2}>
                        {isRegistered ? (
                            <Link href="#" onClick={() => console.log('Forgot password')}>
                                Forgot password?
                            </Link>
                        ) : (
                            <Link href="#" onClick={() => setIsRegistered(true)}>
                                Already have an account? Login here
                            </Link>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};


