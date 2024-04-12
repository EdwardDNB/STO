import {useAppDispatch} from "./state/store";
import React, {useCallback} from "react";
import {addTodolistSank} from "./state/todo-lists-reducer";
import Box from "@mui/material/Box";
import {AddItemForm} from "./AddItemForm";

export const AddCar = () => {
    const dispatch = useAppDispatch()
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistSank(title))
    }, [dispatch])
    return <Box sx={{padding: '10px'}}><AddItemForm addItem={addTodoList} label={'add car'}/></Box>
}