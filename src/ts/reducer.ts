import {Actions, ActionTypes} from "./action"

export interface DefaultState {
    result: any;
    error: any;
}

const initialState: DefaultState = {
    result: {},
    error: {}
}

export const reducer = (state = initialState, action: Actions) => {
    switch(action.type) {
        case ActionTypes.INIT_HACKERNEWS: 
        return Object.assign({}, state, {
            result: action.payload.result
        })
        case ActionTypes.ERROR:
            return Object.assign({}, state, {
                error: action.payload.error
            })
        default: 
            return state;
        })
    }
}