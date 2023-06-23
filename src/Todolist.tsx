import React, {KeyboardEvent, SetStateAction, useState} from "react";
import './Todolist.css'

type PropsTypes = {
    title: string,
    task: TaskType[],
    removeTask: (value: string) => void,
    changeFilter: (value: FilterValuesTypes) => void,
    addTask: (title: string) => void,
    setCompleted: (isDone: boolean, id: string) => void,
    filter: FilterValuesTypes
}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'

export function Todolist(props: PropsTypes) {
    let [textTask, setTextTask] = useState<string>('')
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
    const filterAll = () => {
        props.changeFilter('All')
    }
    const filterActive = () => {
        props.changeFilter('Active')
    }
    const filterCompleted = () => {
        props.changeFilter('Completed')
    }
    let [error, setError] = useState('')
    return (
        <div>
            <h3>{props.title}</h3>
            <div><input value={textTask} onKeyDown={addTaskOnKeyDown}
                        className={error && 'error'}
                        onChange={changeInput}/>
                <button onClick={addTaskOnClick}>+</button>
                {error && <div className={'message-error'}>{error}</div>}
            </div>
            <ul>
                {
                    props.task.map(t => {
                        const removeTask = () => props.removeTask(t.id)

                        return <li
                            className={t.isDone ? 'is-done' : ''}
                            key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(e) => {
                                    props.setCompleted(e.currentTarget.checked, t.id)
                                }
                                }
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>X</button>
                        </li>
                    })
                }
            </ul>
            <button className={props.filter === 'All' ? 'filter' : ''}
                    onClick={filterAll}>All
            </button>
            <button className={props.filter === 'Active' ? 'filter' : ''}
                    onClick={filterActive}>Active
            </button>
            <button className={props.filter === 'Completed' ? 'filter' : ''}
                    onClick={filterCompleted}>Completed
            </button>
        </div>
    )
}