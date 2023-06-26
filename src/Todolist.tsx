import React, {KeyboardEvent, SetStateAction, useState} from "react";
import './Todolist.css'

type PropsTypes = {
    id:string,
    title: string,
    task: TaskType[],
    removeTask: (value: string,id:string) => void,
    changeFilter: (value: FilterValuesTypes,id:string) => void,
    addTask: (title: string,idList:string) => void,
    setCompleted: (isDone: boolean, id: string,listId:string) => void,
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
            props.addTask(textTask.trim(),props.id)
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
        props.addTask(textTask.trim(),props.id)
        setTextTask('')
    }
    const changeInput = (e: { currentTarget: { value: SetStateAction<string> } }) =>
        setTextTask(e.currentTarget.value);
    const filterAll = () => {
        props.changeFilter('All',props.id)
    }
    const filterActive = () => {
        props.changeFilter('Active',props.id)
    }
    const filterCompleted = () => {
        props.changeFilter('Completed',props.id)
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
                        const removeTask = () => props.removeTask(t.id,props.id)

                        return <li
                            className={t.isDone ? 'is-done' : ''}
                            key={t.id}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={(e) => {
                                    props.setCompleted(e.currentTarget.checked, t.id,props.id)
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