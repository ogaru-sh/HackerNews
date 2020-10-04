import { Action, Dispatch } from "redux";
import fetchAPI from "./api/fetchAPI";

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
		await fetchAPI.fetchAPI().then((data: any) => {
			console.log(data);
			dispatch({
				type: ActionTypes.INIT_HACKERNEWS,
				payload: {
					result: {
						test: "test",
					},
				},
			});
		});
	};
};

export default {
	init,
};
