
import { action } from '@storybook/addon-actions';
import {EditableSpan} from "./EditableSpan";
export  default {
    title: 'EditableSpan Component',
    component:EditableSpan,
        addons: ['@storybook/addon-actions'],
}

export const EditableSpanBaseExample = (props:any) => {
  return<EditableSpan title={"1"} changeTaskTitle={action("AddForm")}/>
}