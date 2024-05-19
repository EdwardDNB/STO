import React, {ChangeEvent, useState} from "react";
import {TextField, Typography, TypographyProps,TextFieldProps} from "@mui/material";


type EditableSpanPropsTypes = {
    title: string;
    changeTaskTitle: (taskTitle: string) => void;
    fontSize?: number;
    color?: string;
    variant?: TypographyProps['variant'];
    label?: string;
    typographySx?: TypographyProps['sx'];
    textFieldSx?: TextFieldProps['sx'];
};

export const EditableSpan: React.FC<EditableSpanPropsTypes> = ({
                                                                   title,
                                                                   changeTaskTitle,
                                                                   fontSize = 14,
                                                                   color = 'black',
                                                                   variant = 'body1',
                                                                   label,
                                                                   typographySx,
                                                                   textFieldSx
                                                               }) => {
    const [onFocus, setOnFocus] = useState(false);
    const [inputValue, setInputValue] = useState(title);

    const handleFocus = () => {
        setOnFocus(true);
        setInputValue(title);
    };

    const handleBlur = () => {
        setOnFocus(false);
        changeTaskTitle(inputValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };

    return onFocus ? (
        <TextField
            label={label}
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus
            value={inputValue}
            fullWidth
            InputProps={{
                style: {fontSize, color},
            }}
            variant="outlined"
        />
    ) : (
        <Typography
            onClick={handleFocus}
            variant={variant}
            sx={{fontSize, color,...typographySx}}
        >
            {title}
        </Typography>
    );
};
