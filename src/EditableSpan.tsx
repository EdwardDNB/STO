import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsTypes = {
    title: string,
    changeTaskTitle:(taskTitle:string)=>void
}


export function EditableSpan(props: EditableSpanPropsTypes) {
    let [onFocus, setOnFocus] = useState(false)
let[inputValue,setInputValue]=useState('')
    function onFocusHandler() {
        setOnFocus(true)
        setInputValue(props.title)
    }

    function onBlurFocusHandler() {
        setOnFocus(false)
        props.changeTaskTitle(inputValue)
    }
function onChangeHandler(e:ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value)
}
    return onFocus
        ? <TextField onBlur={onBlurFocusHandler}
                 onChange={onChangeHandler}
                 autoFocus={true}
                 value={inputValue}></TextField>
        : <span onDoubleClick={onFocusHandler}>{props.title}</span>

}