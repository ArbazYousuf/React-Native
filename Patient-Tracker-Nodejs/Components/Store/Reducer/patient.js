const INITIAL_STATE = {
    patient: null

}
function Patient(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET':
            return Object.assign({}, state, { patient: action.val });
            
        default: return state;

    }
}
export default Patient;