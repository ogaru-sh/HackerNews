import { Action, Dispatch } from "redux";
import fetchAPI from "./api/fetchAPI";
import config from "./config";

export interface InitialAction extends Action {
	type: ActionTypes.INIT_HACKERNEWS;
	payload: {
		result: object[];
		pureResult: object[];
		searchResult: object[];
	};
}

interface Error extends Action {
	type: ActionTypes.ERROR;
	payload: {
		error: object[];
	};
}

export enum ActionTypes {
	INIT_HACKERNEWS = "INIT_HACKERNEWS",
	ERROR = "ERROR",
}

export type Actions = InitialAction | Error;

//actionCreator
const init = (apiType: string) => {
	return async (dispatch: Dispatch<ActionTypes>) => {
		const newItems = await fetchAPI.fetchAPI(config.apiType[apiType]);
		const limitItems = newItems.slice(0, config.viewLimit);
		const itemDetailArr = [];
		for (const item of limitItems) {
			const itemDetail = await fetchAPI.fetchAPI(`item/${item}`);
			itemDetailArr.push(itemDetail);
		}
		dispatch({
			type: ActionTypes.INIT_HACKERNEWS,
			payload: {
				result: itemDetailArr,
				pureResult: newItems,
				searchResult: itemDetailArr,
			},
		});
	};
};

//TODO: tab切り替えの際にキーワードボックスに残っている文字で検索
const search = (inputValue: string) => (
	dispatch: Dispatch<ActionTypes>,
	getState: any
) => {
	const state = getState();
	console.log(state);
	const searchItem = state.searchResult.reduce(
		(array: object[], val: { title: string }) => {
			const title = val.title;
			if (title.indexOf(inputValue) !== -1) {
				array.push(val);
			}
			return array;
		},
		[]
	);
	dispatch({
		type: ActionTypes.INIT_HACKERNEWS,
		payload: {
			result: searchItem,
			searchResult: state.searchResult,
			pureResult: state.pureResult,
		},
	});
};

export default {
	init,
	search,
};
