import {v4 as uuid} from "uuid";

import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./todo-lists-reducer";
export type ToDoListsTypes = {
    id: string,
    title: string,
}
test('correct todolist removed', () => {
    const todolist1 = uuid()
    const todolist2 = uuid()
    const startState: Array<ToDoListsTypes> = [
        {id: todolist1, title: 'Porsche Panamera'},
        {id: todolist2, title: 'Ford Mustang GT'},
    ]
    const endState = todoListsReducer(startState, removeTodolistAC(todolist1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolist2)
})
test('add todolist', () => {
    const todolist1 = uuid()
    const todolist2 = uuid()
    const todolistTitle = 'New Title'

    const startState: Array<ToDoListsTypes> = [
        {id: todolist1, title: 'Porsche Panamera'},
        {id: todolist2, title: 'Ford Mustang GT'},
    ]
    const endState = todoListsReducer(startState, addTodolistAC (todolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(todolistTitle)
})
test('change todolist title', () => {
    const todolist1 = uuid()
    const todolist2 = uuid()
    const todolistTitle = 'New Title'

    const startState: Array<ToDoListsTypes> = [
        {id: todolist1, title: 'Porsche Panamera'},
        {id: todolist2, title: 'Ford Mustang GT'},
    ]
    const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistTitle,todolist2))
    expect(endState[0].title).toBe('Porsche Panamera')
    expect(endState[1].title).toBe(todolistTitle)
})

