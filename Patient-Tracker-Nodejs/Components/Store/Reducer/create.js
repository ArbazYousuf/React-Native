const INITIAL_STATE = {

}
function Create(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, action.val);

        case 'SIGNUP':
            return Object.assign({}, state, action.val);

        case 'DELETE':
            return Object.assign({});

        default: return state;

    }
}
export default Create;