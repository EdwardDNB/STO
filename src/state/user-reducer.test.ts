import {userReducer} from "./user-reducer";

test('user reducer should increment only age',
    () => {
    const startState =  {
      age:20,childrenCount:2,name:'Edward'
    }
    const endState=userReducer(startState,{type:'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
        expect(endState.childrenCount).toBe(2)
    })
test('user reducer should increment only children count',
    () => {
        const startState =  {
            age:20,childrenCount:2,name:'Edward'
        }
        const endState=userReducer(startState,{type:'INCREMENT-CHILDREN-COUNT'})
        expect(endState.childrenCount).toBe(3)
        expect(endState.age).toBe(20)
    })
test('Change user name',()=>{
    const startState={
        name:'Edward',age:33,childrenCount:0
    }
    const endState=userReducer(startState,{type:'CHANGE-NAME',name:'Ruslan'})
    expect(endState.name).toBe('Ruslan')
    expect(endState.age).toBe(33)
    expect(endState.childrenCount).toBe(0)
})