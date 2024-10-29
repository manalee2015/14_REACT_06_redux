import rootReducer from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
/* 
The logger middleware is used to log actions and state changes to the console. This can be very helpful for
debugging purposes, as it allows you to see the flow of actions and how they affect the state of your application.
How Logger Works:
	Action Logging: It logs every action that is dispatched to the Redux store, including the action type and payload.
	State Logging: It logs the state of the Redux store before and after each action is processed, allowing you to see
	how the state changes in response to actions.
Benefits:
	Debugging: Helps in tracking down bugs by providing a clear view of what actions are being dispatched and
	how they affect the state.
	Development: Useful during development to understand the flow of data and ensure that the application
	behaves as expected.
*/
import logger from 'redux-logger';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;