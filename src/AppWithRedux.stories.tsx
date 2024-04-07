import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
export  default {
    title: 'AppWithRedux Component',
    component:AppWithRedux,
        addons: ['@storybook/addon-actions'],
}

export const AppWithReduxExample = () => {
    return<Provider store={store}><AppWithRedux /></Provider>
}