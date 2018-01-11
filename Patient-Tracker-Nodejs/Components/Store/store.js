import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import Create from './Reducer/create'
import Patient from './Reducer/patient'

const middleware = applyMiddleware(createLogger(), thunk)

let patient = combineReducers({
    Create ,
    Patient,
})

let store = createStore(
    patient,
    middleware
)

store.subscribe(()=>{console.log(store.getState())})

export default store