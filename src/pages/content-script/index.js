import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createUIStore} from 'redux-webext';
import ContentScript from './ContentScript.js';

async function initApp() {
	try {
	    const store = await createUIStore(); //this part is have error : Unhandled promise rejection TypeError: promise.then is not a function
	    const mountNode = document.createElement('div');
	    document.body.appendChild(mountNode);
	    ReactDOM.render(
	    	<ContentScript/>,
	        mountNode
	    );
	} catch (e) {
		console.log(e); // 30
	}
	

    // ReactDOM.render(
    // 	<Provider store={store}>
    //         <ContentScript/>
    //     </Provider>,
    //     mountNode
    // );
}

initApp();