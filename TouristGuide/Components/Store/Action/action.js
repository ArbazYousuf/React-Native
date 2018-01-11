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
    logout: function () {
        return {
            type: ActionType.DELETE,
            val: {}

        }

    },
    region: function (region) {
        return {
            type: ActionType.REGION,
            val : region
        }
    },
    searchRegion : function (region){
        return{
            type : ActionType.SEARCH,
            val : region
        }
    },
    marker : function (marker){
        return{
            type : ActionType.MARKER,
            val: marker
        }
    },
    direction: function(location){
        return{
            type : ActionType.DIRECTION,
            val: location
        }
    }

}
export default storeAction;

