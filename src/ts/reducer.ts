import { Actions, ActionTypes } from "./action";

export interface DefaultState {
	result: any;
	pureResult: any;
	searchResult: any;
	error: any;
}

export const initialState: DefaultState = {
	result: [],
	pureResult: [],
	searchResult: [],
	error: {},
};

export const reducer = (state = initialState, action: Actions) => {
	switch (action.type) {
		case ActionTypes.INIT_HACKERNEWS:
			return Object.assign({}, state, {
				result: action.payload.result,
				pureResult: action.payload.pureResult,
				searchResult: action.payload.searchResult,
			});
		case ActionTypes.ERROR:
			return Object.assign({}, state, {
				error: action.payload.error,
			});
		default:
			return state;
	}
};
