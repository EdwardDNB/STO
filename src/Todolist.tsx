import React, {KeyboardEvent,SetStateAction, useState} from "react";

type PropsTypes = {
    title: string,
    task: TaskType[],
    removeTask: (value: string) => void,
    changeFilter: (value: FilterValuesTypes) => void,
    addTask: (title: string) => void
}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'

export function Todolist(props: PropsTypes) {
    let [textTask, setTextTask] = useState<string>('')
    const addTask = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            props.addTask(textTask)
            setTextTask('')
        }
    }
    const changeInput=(e: { currentTarget: { value: React.SetStateAction<string>; }; }) => {
        setTextTask(e.currentTarget.value);
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div><input value={textTask} onKeyDown={addTask} onChange={changeInput}/>
                <button onClick={() => {
                    props.addTask(textTask)
                    setTextTask('')
                }}>+
                </button>
            </div>
            <ul>
                {
                    props.task.map(t => <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>X</button>
                    </li>)
                }
            </ul>
            <button onClick={() => {
                props.changeFilter('All')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('Active')
            }}>Active
            </button>
            <button onClick={() => {
                props.changeFilter('Completed')
            }}>Completed
            </button>
        </div>
    )
}