import React, {ChangeEvent, useState} from "react";

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
        ? <input onBlur={onBlurFocusHandler}
                 onChange={onChangeHandler}
                 autoFocus={true}
                 value={inputValue}></input>
        : <span onDoubleClick={onFocusHandler}>{props.title}</span>

}