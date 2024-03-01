import {removeTaskAC, tasksReducer} from "./LR4-tasks-reducer";


export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string, title: string, isDone: boolean
}
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
    expect(endState["todolist1"].every(task=>task.id!='1')).toBeTruthy()

})
//замість зірочок впишіть необхідні данні та зробіть action creator та типи для нього і Reducer якій задовільнятиме тест
/*test('add task', () => {

    const action = addTaskAC("todolist1", 'Repair disks')
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"].length).toBe(***)
    expect(endState["todolist2"].length).toBe(***)
    expect(endState["todolist2"][0].id).toBeDefined()
    expect(endState["todolist1"][0].title).toBe(***)
    expect(endState["todolist1"][0].isDone).toBe(***)

})*/

/*
test('change task status', () => {

    const action = changeTaskStatusAC("todolist1", '2',false)//isDone it is status
    const endState = tasksReducer(startState, action)
    expect(***)Be(***)
    expect(***)Be(***)

})*/
/*
test('change task title', () => {

    const action = changeTaskTitleAC("todolist1", '2','New Task Title')
    const endState = tasksReducer(startState, action)
    expect(endState["todolist1"][1].title)Be(***)
    expect(***)Be(***)

})*/

/*
test('add todo list', () => {
// ми повинні добавити Todolist з пустими тасками поки не враховуючи рассинхронізацію з редуктором тудулистів
    const action = addTodolistAC ('New title')// addTodolistAC імпортуємо і не забуваємо імпортувати типи з роботи 3
    const endState = tasksReducer(startState, action)

    const keys=Object.keys(endState)
    const newKey=keys.find(key=>key!= "todolist1"&& key!= "todolist2")
    if(!newKey){
        throw new Error('Key for new todolist should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([])

})
*/
/*
test('property deleted', () => {
//превірте чи видалені свойства щоб вони на занімали пам'ять. Імпортуйте акшшон креетор та його типи і зробіть редуктор
    const action = removeTodolistAC ('todolist1 ')
    const endState = tasksReducer(startState, action)

    const keys=Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState['todolist1']).toBeUndefined()

})*/
