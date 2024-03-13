import {TaskStateType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todo-lists-reducer";
const startState: TaskStateType = {//associativity massive
    "todolist1": [
        {id: '1', title: 'Change engine oil', isDone: true},
        {id: '2', title: 'Change rubier', isDone: false},
        {id: '3', title: 'Washing', isDone: true},
    ],
    "todolist2": [
        {id: '1', title: 'Change engine oil', isDone: true},
        {id: '2', title: 'Change rubier', isDone: false},
        {id: '3', title: 'Washing', isDone: true},
    ]
}
test('remove task', () => {

    const action = removeTaskAC("todolist1", '1')
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"].length).toBe(2)
    expect(endState["todolist2"].length).toBe(3)
    expect(endState["todolist1"].every((task: { id: string; })=>task.id!='1')).toBeTruthy()

})
test('add task', () => {

    const action = addTaskAC("todolist1", 'Repair disks')
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"].length).toBe(4)
    expect(endState["todolist2"].length).toBe(3)
    expect(endState["todolist2"][0].id).toBeDefined()
    expect(endState["todolist1"][0].title).toBe('Repair disks')
    expect(endState["todolist1"][0].isDone).toBe(false)

})
test('change task status', () => {

    const action = changeTaskStatusAC("todolist1", '2',true)
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"][1].isDone).toBe(true)
    expect(endState["todolist2"][1].isDone).toBe(false)

})
test('change task title', () => {

    const action = changeTaskTitleAC("todolist1", '2','New Task Title')
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"][1].title).toBe('New Task Title')
    expect(endState["todolist2"][1].title).toBe('Change rubier')

})
test('add todo list', () => {

    const action = addTodolistAC ('New title')
    const endState = tasksReducer(startState, action)

    const keys=Object.keys(endState)
    const newKey=keys.find(key=>key!= "todolist1"&& key!= "todolist2")
    if(!newKey){
        throw new Error('Key for new todolist should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])

})
test('property deleted', () => {

    const action = removeTodolistAC ('todolist2')
    const endState = tasksReducer(startState, action)

    const keys=Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState['todolist2']).toBeUndefined()

})
