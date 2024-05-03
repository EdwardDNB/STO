import React from 'react';
import { Grid, IconButton, Tooltip, styled } from '@mui/material';
import { Instagram, Facebook, Twitter, MailOutline } from '@mui/icons-material';

const StyledIconButton = styled(IconButton)({
    opacity: 1,
});

export const SocialIcons = () => {
    const handleMailClick = () => {
        window.location.href = 'mailto:example@mail.com';
    };

    const handleSocialClick = (socialMedia: string) => {
        switch (socialMedia) {
            case 'instagram':
                window.location.href = 'https://www.instagram.com/';
                break;
            case 'facebook':
                window.location.href = 'https://www.facebook.com/';
                break;
            case 'twitter':
                window.location.href = 'https://twitter.com/';
                break;
            default:
                break;
        }
    };

    return (
        <Grid item>
            <Tooltip title="Instagram">
                <StyledIconButton onClick={() => handleSocialClick('instagram')}>
                    <Instagram />
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="Facebook">
                <StyledIconButton onClick={() => handleSocialClick('facebook')}>
                    <Facebook />
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="Twitter">
                <StyledIconButton onClick={() => handleSocialClick('twitter')}>
                    <Twitter />
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="Send Email">
                <StyledIconButton onClick={handleMailClick}>
                    <MailOutline />
                </StyledIconButton>
            </Tooltip>
        </Grid>
    );
};


