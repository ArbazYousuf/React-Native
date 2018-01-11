const INITIAL_STATE = {
    

}
function Region(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'REGION':
            return Object.assign({}, state, { region: action.val });
        
        default: return state;

    }
}
export default Region;