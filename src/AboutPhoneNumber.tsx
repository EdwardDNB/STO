import React, {useState} from 'react';
import {Grid, Typography, Tooltip} from '@mui/material';
import {PhoneAndroidOutlined} from '@mui/icons-material';

export const PhoneNumber = () => {
    const phoneNumber = '+380634566789';
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <Grid
            item
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '5px',
            }}
        >
            <Tooltip title="Call">
                <PhoneAndroidOutlined sx={{color: hovered ? 'blue' : 'inherit'}}/>
            </Tooltip>
            <Typography variant="body1" sx={{marginLeft: '8px', color: hovered ? 'blue' : 'inherit'}}>
                {phoneNumber}
            </Typography>
        </Grid>
    );
};


