import React, {KeyboardEvent, SetStateAction, useState} from "react";

type AddTaskFormTypes = {
    addTask: (tittle: string) => void
}

export function AddTaskForm(props: AddTaskFormTypes) {
    let [textTask, setTextTask] = useState<string>('')
    let [error, setError] = useState('')
    const addTaskOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (textTask.trim() === '') {
                setError('Field is required')
                return
            }
            props.addTask(textTask.trim())
            setTextTask('')
        } else {
            setError('')
        }
    }
    const addTaskOnClick = () => {
        if (textTask.trim() === '') {
            setError('Field is required')
            return
        }
        props.addTask(textTask.trim())
        setTextTask('')
    }
    const changeInput = (e: { currentTarget: { value: SetStateAction<string> } }) =>
        setTextTask(e.currentTarget.value);
    return <div><input value={textTask} onKeyDown={addTaskOnKeyDown}
                       className={error && 'error'}
                       onChange={changeInput}/>
        <button onClick={addTaskOnClick}>+</button>
        {error && <div className={'message-error'}>{error}</div>}
    </div>
}