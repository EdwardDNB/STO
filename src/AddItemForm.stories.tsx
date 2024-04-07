import {AddItemForm} from "./AddItemForm";
import { action } from '@storybook/addon-actions';
export  default {
    title: 'AddItemForm Component',
    component:AddItemForm,
        addons: ['@storybook/addon-actions'],
}

export const AddItemFormBaseExample = (props:any) => {
  return<AddItemForm addItem={action("AddForm")} label={'Title'}/>
}