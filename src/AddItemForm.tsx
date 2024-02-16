import React, {KeyboardEvent, SetStateAction, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type AddItemFormTypes = {
    addItem: (tittle: string) => void,
    label: string
}

export function AddItemForm(props: AddItemFormTypes) {
    let [text, setText] = useState<string>('')
    let [error, setError] = useState('')
    const addItemOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (text.trim() === '') {
                setError('Field is required')
                return
            }
            props.addItem(text.trim())
            setText('')
        } else {
            setError('')
        }
    }
    const addItemOnClick = () => {
        if (text.trim() === '') {
            setError('Field is required')
            return
        }
        props.addItem(text.trim())
        setText('')
    }
    const changeInput = (e: { currentTarget: { value: SetStateAction<string> } }) =>
        setText(e.currentTarget.value);
    return <div>
        <TextField id="outlined-multiline-static" label={error? error: props.label} variant="outlined"
                   value={text} onKeyDown={addItemOnKeyDown}
                   error={!!error}
                   onChange={changeInput}
        />
        <IconButton size="large" onClick={addItemOnClick} color="primary"><AddCircleOutlineIcon/></IconButton>
            </div>
}