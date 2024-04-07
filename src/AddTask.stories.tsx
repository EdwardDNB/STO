import { action } from '@storybook/addon-actions';
import {Task} from "./Task";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./state/store";
export  default {
    title: 'AddTask Component',
    component:Task,
        addons: ['@storybook/addon-actions'],
}

export const AddTaskBaseExample = () => {
  return<><Provider store={store}>
      <Task task={{id: '1', title: 'Change engine oil', isDone: true}} id={"1"} />
      <Task task={{id: '2', title: 'Change engine oil', isDone: false}} id={"2"} />
  </Provider>
  </> }