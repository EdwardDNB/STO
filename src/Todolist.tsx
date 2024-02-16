import React from "react";
import './Todolist.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

type PropsTypes = {
    id: string,
    title: string,
    task: TaskType[],
    removeTask: (value: string, id: string) => void,
    changeFilter: (value: FilterValuesTypes, id: string) => void,
    addTask: (title: string, idList: string) => void,
    setCompleted: (isDone: boolean, id: string, listId: string) => void,
    filter: FilterValuesTypes,
    removeTodolist: (id: string) => void
    changeTaskTitle: (id: string, title: string, idList: string) => void,
    changeTodoListTitle: (title: string, idList: string) => void

}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
export type FilterValuesTypes = 'All' | 'Active' | 'Completed'


export function Todolist(props: PropsTypes) {

    const filterActive = () => {
        props.changeFilter('Active', props.id)
    }
    const filterCompleted = () => {
        props.changeFilter('Completed', props.id)
    }
    const filterAll = () => {
        props.changeFilter('All', props.id)
    }

    function removeTodolist() {
        props.removeTodolist(props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }


    function changeTodoListTitle(title: string) {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div>

            <h3><EditableSpan changeTaskTitle={changeTodoListTitle} title={props.title}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} label={'add task'}/>
            <ul>
                {
                    props.task.map(t => {
                        const removeTask = () => props.removeTask(t.id, props.id)

                        function changeTaskTitle(title: string) {
                            props.changeTaskTitle(t.id, title, props.id)
                        }

                        return <li
                            className={t.isDone ? 'is-done' : ''}
                            key={t.id}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={(e) => {
                                    props.setCompleted(e.currentTarget.checked, t.id, props.id)
                                }
                                }
                            />
                            <EditableSpan title={t.title} changeTaskTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask}>
                                <Delete/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <Button variant={props.filter === 'All' ? 'contained' : 'text'}
                    onClick={filterAll}>All
            </Button>
            <Button variant={props.filter === 'Active' ? 'contained' : 'text'}
                    onClick={filterActive}>Active
            </Button>
            <Button variant={props.filter === 'Completed' ? 'contained' : 'text'}
                    onClick={filterCompleted}>Completed
            </Button>
        </div>
    )
}
