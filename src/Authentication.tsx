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

export const Authentication: React.FC = () => {
    const dispatch = useAppDispatch();

    // --- UI state ---
    const [isRegistered, setIsRegistered] = useState(true);   // Login / Register
    const [isEmail, setIsEmail] = useState(true);             // Login via Email / Phone

    // --- Form state ---
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const error = useAppSelector(state => state.auth.error);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    // --- redirect after authentication ---
    if (isAuthenticated) {
        return <About />;
    }

    // === Handlers ===
    const handleToggleAuthMode = () => {
        setIsRegistered(!isRegistered);
        setEmail('');
        setPhone('');
        setPassword('');
        setName('');
    };

    const handleToggleInputMode = () => {
        setIsEmail(!isEmail);
        setEmail('');
        setPhone('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'phone') setPhone(value);
        if (name === 'password') setPassword(value);
        if (name === 'name') setName(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (isRegistered) {
            // LOGIN
            dispatch(handleLogin(email, phone, password));
        } else {
            // REGISTER
            dispatch(registerUserHandle(name, password, phone, email));
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url('https://source.unsplash.com/featured/1600x900/?garage,car')`,
                background: 'rgba(0,0,0,0.55)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Card
                sx={{
                    width: 420,
                    p: 2,
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.25)',
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{textAlign: 'center', fontWeight: 700, color: '#fff'}}
                    >
                        {isRegistered ? 'Login to AVTOREPAIR' : 'Create Account'}
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        {/* REGISTER FORM */}
                        {!isRegistered && (
                            <>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Your Name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Phone Number"
                                    name="phone"
                                    value={phone}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </>
                        )}

                        {/* LOGIN FORM */}
                        {isRegistered && (
                            <>
                                {isEmail ? (
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        value={email}
                                        onChange={handleChange}
                                        margin="normal"
                                    />
                                ) : (
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        variant="outlined"
                                        value={phone}
                                        onChange={handleChange}
                                        margin="normal"
                                    />
                                )}

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                            </>
                        )}

                        {/* ERROR */}
                        {error && (
                            <Typography color="error" sx={{mt: 1}}>
                                {error}
                            </Typography>
                        )}

                        {/* Switches */}
                        <Grid container justifyContent="space-between" sx={{mt: 2}}>
                            <FormControlLabel
                                control={<Switch checked={isRegistered} onChange={handleToggleAuthMode}/>}
                                label={isRegistered ? 'Login' : 'Register'}
                                sx={{color: '#fff'}}
                            />

                            {isRegistered && (
                                <FormControlLabel
                                    control={<Switch checked={isEmail} onChange={handleToggleInputMode}/>}
                                    label={isEmail ? 'Email' : 'Phone'}
                                    sx={{color: '#fff'}}
                                />
                            )}
                        </Grid>

                        {/* Submit */}
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                                mt: 2,
                                py: 1.2,
                                fontWeight: 700,
                                fontSize: '16px'
                            }}
                        >
                            {isRegistered ? 'Sign In' : 'Register'}
                        </Button>
                    </form>

                    {/* link at bottom */}
                    <Typography variant="body2" sx={{mt: 2, textAlign: 'center', color: '#fff'}}>
                        {isRegistered ? (
                            <Link
                                component="button"
                                underline="always"
                                sx={{color: '#ddd'}}
                                onClick={() => console.log('Forgot password')}
                            >
                                Forgot password?
                            </Link>
                        ) : (
                            <Link
                                component="button"
                                underline="always"
                                sx={{color: '#ddd'}}
                                onClick={() => setIsRegistered(true)}
                            >
                                Already have an account? Login
                            </Link>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};
