import { Actions, ActionTypes } from "./action";

export interface DefaultState {
	result: any;
	pureResult: any;
	searchResult: any;
	favoriteList: string[];
	tabName: string;
	error: any;
}

export const initialState: DefaultState = {
	result: [],
	pureResult: [],
	searchResult: [],
	favoriteList: [],
	tabName: "",
	error: {},
};

export const reducer = (state = initialState, action: Actions) => {
	switch (action.type) {
		case ActionTypes.INIT_HACKERNEWS:
			return Object.assign({}, state, {
				result: action.payload.result,
				pureResult: action.payload.pureResult,
				searchResult: action.payload.searchResult,
				favoriteList: action.payload.favoriteList,
				tabName: action.payload.tabName,
			});
		case ActionTypes.CLICK_FAVORITE_BUTTON:
			return Object.assign({}, state, {
				favoriteList: action.payload.favoriteList,
			});
		case ActionTypes.ERROR:
			return Object.assign({}, state, {
				error: action.payload.error,
			});
		default:
			return state;
	}
};
