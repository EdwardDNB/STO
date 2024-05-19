import React, {useCallback, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {Button, Card, CardContent} from "@mui/material";
import {addTaskSank} from "./state/tasksSlice";
import {useAppDispatch, useAppSelector} from "./state/store";
import {Task} from "./Task";

type PropsTypes = {
    id: string,}

export type FilterValuesTypes = 'All' | 'Active' | 'Completed'


export const Todolist = (props: PropsTypes) => {
    const dispatch = useAppDispatch()
    let tasks = useAppSelector(state => state.tasks.tasks).filter(task=>task.orderId===props.id)
    let [filter, setFilter] = useState<FilterValuesTypes>('All')
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.isDone)
    }
    if (filter === 'Active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    const filterActive = () => {
        setFilter('Active')
    }
    const filterCompleted = () => {
        setFilter('Completed')
    }
    const filterAll = () => {
        setFilter('All')
    }


    const addTask = useCallback((title: string) => {
        dispatch(addTaskSank(props.id, title))
    }, [dispatch, props.id])



    return (
        <Card sx={{position: 'relative'}}>
            <CardContent sx={{flexGrow: 1}}>
                <AddItemForm addItem={addTask} label={'add task'}/>
                <>
                    {tasks ?
                        tasks.map(task =>
                            <Task task={task} key={task.id}/>
                        ) : <div></div>
                    }
                </>
                <Button variant={filter === 'All' ? 'contained' : 'text'}
                        onClick={filterAll}>All
                </Button>
                <Button variant={filter === 'Active' ? 'contained' : 'text'}
                        onClick={filterActive}>Active
                </Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'text'}
                        onClick={filterCompleted}>Completed
                </Button>

            </CardContent>
        </Card>

    )
}
