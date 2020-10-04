import { Action, Dispatch } from "redux";
import fetchAPI from "./api/fetchAPI";
import config from "./config";

export interface ActionBase extends Action {
	type: ActionTypes.INIT_HACKERNEWS;
	payload: {
		result: object[];
		pureResult: object[];
		searchResult: object[];
		favoriteList: string[];
		tabName: string;
	};
}

interface ClickFavoriteButton extends Action {
	type: ActionTypes.CLICK_FAVORITE_BUTTON;
}

interface Error extends Action {
	type: ActionTypes.ERROR;
	payload: {
		error: object[];
	};
}

export enum ActionTypes {
	INIT_HACKERNEWS = "INIT_HACKERNEWS",
	CLICK_FAVORITE_BUTTON = "CLICK_FAVORITE_BUTTON",
	ERROR = "ERROR",
}

export type Actions = ActionBase & (ClickFavoriteButton | Error);

//actionCreator
const init = (apiType: string) => {
	return async (dispatch: Dispatch<ActionTypes>, getState: any) => {
		const newItems = await fetchAPI.fetchAPI(config.apiType[apiType]);
		const limitItems = newItems.slice(0, config.viewLimit);
		const itemDetailArr = [];
		for (const item of limitItems) {
			const itemDetail = await fetchAPI.fetchAPI(`item/${item}`);
			itemDetailArr.push(itemDetail);
		}
		const favoriteList = getState().favoriteList;
		dispatch({
			type: ActionTypes.INIT_HACKERNEWS,
			payload: {
				result: itemDetailArr,
				pureResult: newItems,
				searchResult: itemDetailArr,
				tabName: apiType,
				favoriteList: favoriteList,
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
			const title = val.title.toLowerCase();
			if (title.indexOf(inputValue) !== -1) {
				array.push(val);
			}
			return array;
		},
		[]
	);
	//TODO: search用アクションを作成
	dispatch({
		type: ActionTypes.INIT_HACKERNEWS,
		payload: {
			result: searchItem,
			searchResult: state.searchResult,
			pureResult: state.pureResult,
		},
	});
};

// お気に入り機能
const favorite = (checked: boolean, id: string) => (
	dispatch: Dispatch<ActionTypes>,
	getState: any
) => {
	console.log(checked, id);
	const state = getState();
	let favoriteList = state.favoriteList;
	if (!checked) {
		favoriteList.push(id);
	} else {
		favoriteList = favoriteList.filter((val) => {
			return val !== id;
		});
	}
	console.log(favoriteList);
	dispatch({
		type: ActionTypes.CLICK_FAVORITE_BUTTON,
		payload: {
			favoriteList: favoriteList,
		},
	});
};

export default {
	init,
	search,
	favorite,
};
