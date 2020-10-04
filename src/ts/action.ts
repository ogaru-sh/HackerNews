import { Action, Dispatch } from "redux";
import fetchAPI from "./api/fetchAPI";
import config from "./config";

export interface InitialAction extends Action {
	type: ActionTypes.INIT_HACKERNEWS;
	payload: {
		result: object[];
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
const init = () => {
	return async (dispatch: Dispatch<ActionTypes>) => {
		const newItems = await fetchAPI.fetchAPI("newstories");
		console.log("newItems", newItems);
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
			},
		});
	};
};

export default {
	init,
};
