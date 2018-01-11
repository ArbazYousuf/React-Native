const INITIAL_STATE = {


}
function SearchRegion(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SEARCH':
            return Object.assign({}, state, { marker: action.val });

        case 'MARKER':
            return Object.assign({}, state, { marker: action.val });

        case 'DIRECTION':
            return Object.assign({}, state, { location: action.val });

        default: return state;

    }
}
export default SearchRegion;