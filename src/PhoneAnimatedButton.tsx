import React, { useState } from 'react';
import { IconButton, styled } from '@mui/material';
import { Phone as PhoneIcon, PhoneDisabled as PhoneDisabledIcon } from '@mui/icons-material';

const callingAnimation = {
    '0%': {
        transform: 'scale(1)',
    },
    '50%': {
        transform: 'scale(1.2)',
    },
    '100%': {
        transform: 'scale(1)',
    },
};

const StyledCallingIconButton = styled(IconButton)<{ isCalling: boolean }>(({ theme, isCalling }) => ({
    color: isCalling ? theme.palette.error.main : theme.palette.success.main,
    animation: isCalling ? `${callingAnimation} 2s infinite` : 'none',
}));

type PropsTypes = {
    phone: string,
}

export const PhoneAnimatedButton = (props: PropsTypes) => {
    const [isCalling, setIsCalling] = useState(false);

    const handleCall = () => {
        setIsCalling(true);
        // Логика звонка...
    };

    const handleEndCall = () => {
        setIsCalling(false);
        // Логика завершения звонка...
    };

    return (
        <StyledCallingIconButton
            onClick={() => isCalling ? handleEndCall() : handleCall()}
            isCalling={isCalling}
        >
            {isCalling ? (
                <PhoneDisabledIcon />
            ) : (
                <PhoneIcon />
            )}
        </StyledCallingIconButton>
    );
};
