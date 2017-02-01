import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';
import Popup from './Popup.js';

async function initApp() {
    const store = await createUIStore();
    //console.dir(store.getState());
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    ReactDOM.render(
    	<Provider store={store}>
            <Popup/>
        </Provider>,
        mountNode
    );
}

initApp();