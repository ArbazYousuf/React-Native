import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger'
import Create from './Reducer/create'
import Region from './Reducer/region'
import SearchRegion from './Reducer/searchRegion'
const middleware = applyMiddleware(thunk)

let TouristGuide = combineReducers({
    Create ,
    Region,
    SearchRegion,
})

let store = createStore(
    TouristGuide,
    middleware
)

store.subscribe(()=>{console.log(store.getState())})

export default store