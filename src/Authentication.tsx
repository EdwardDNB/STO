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

interface Props {
    // Здесь вы можете добавить необходимые пропсы
}

export const Authentication: React.FC<Props> = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isEmail, setIsEmail] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleToggle = () => {
        setIsLogin(!isLogin);
    };

    const handleInputToggle = () => {
        setIsEmail(!isEmail);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Implement your login or registration logic here
        if (isLogin) {
            // Login logic
            console.log('Logging in with:', isEmail ? email : phone, password);
        } else {
            // Registration logic
            console.log('Registering with:', email, phone, password, name);
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
                backgroundImage: `url('/*https://source.unsplash.com/featured/1600x900/?nature*/')`,
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
                        {isLogin ? 'Login' : 'Register'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
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
                                    label={!isEmail ? 'Email' : 'Phone Number'}
                                    variant="outlined"
                                    name={!isEmail ? 'email' : 'phone'}
                                    value={!isEmail ? email : phone}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <TextField
                            margin="normal"
                            fullWidth
                            label={isEmail ? 'Email' : 'Phone Number'}
                            variant="outlined"
                            name={isEmail ? 'email' : 'phone'}
                            value={isEmail ? email : phone}
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
                        <Grid container justifyContent="space-between" alignItems="center">
                            <FormControlLabel
                                control={<Switch checked={isLogin} onChange={handleToggle}/>}
                                label={isLogin ? 'Login' : 'Register'}
                            />
                            {isLogin && (
                                <FormControlLabel
                                    control={<Switch checked={isEmail} onChange={handleInputToggle}/>}
                                    label={isEmail ? 'Email' : 'Phone Number'}
                                />
                            )}
                            <Button type="submit" variant="contained" color="primary">
                                {isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Grid>
                    </form>
                    <Typography variant="body2" mt={2}>
                        {isLogin ? (
                            <Link href="#" onClick={() => console.log('Forgot password')}>
                                Forgot password?
                            </Link>
                        ) : (
                            <Link href="#" onClick={() => setIsLogin(true)}>
                                Already have an account? Login here
                            </Link>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};


