import React, {KeyboardEvent, SetStateAction, useState} from "react";

type AddItemFormTypes = {
    addItem: (tittle: string) => void
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
    return <div><input value={text} onKeyDown={addItemOnKeyDown}
                       className={error && 'error'}
                       onChange={changeInput}/>
        <button onClick={addItemOnClick}>+</button>
        {error && <div className={'message-error'}>{error}</div>}
    </div>
}