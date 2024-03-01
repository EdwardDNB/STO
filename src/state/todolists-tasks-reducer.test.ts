import {TaskStateType, ToDoListsTypes} from "../App";
import {addTodolistAC, todoListsReducer} from "./todo-lists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equaled', () => {
    const startTasksState: TaskStateType = {}
    const startTodoListState: Array<ToDoListsTypes> = []

    const action = addTodolistAC('New todo list')
    //відправляємо єкшн у два редуктори але фабрику екшена потрібно так змінити щоб вона нам передавала щє згенерований айді
        // таким чином будемо превряти чи айді совпадає
    const endTaskState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListState, action)

const key =Object.keys(endTaskState)// отримуємо ключі
    const idFromTasks=key[0]// так як ключів не має крім нашого одного
    const idFromTodoLists=endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})