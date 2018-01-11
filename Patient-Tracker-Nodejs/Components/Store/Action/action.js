import ActionType from './actionType'

const storeAction = {
    login: function (user) {
        return {
            type: ActionType.LOGIN,
            val: user
        }
    },
    signup: function (user) {
        return {
            type: ActionType.SIGNUP,
            val: user
        }

    },
    patient: function (patient) {
        return {
            type: ActionType.GET,
            val: patient
        }

    },
    logout: function () {
        return {
            type: ActionType.DELETE,
            val: {}

        }
    },
}
export default storeAction;

