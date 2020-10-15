import { Action, Dispatch } from "redux";
import fetchAPI from "./api/fetchAPI";
import config from "./config";
import { ActionBase } from "./interface";

interface ClickFavoriteButton extends Action {
	type: ActionTypes.CLICK_FAVORITE_BUTTON;
	payload: {
		favoriteList: [];
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
	CLICK_FAVORITE_BUTTON = "CLICK_FAVORITE_BUTTON",
	ERROR = "ERROR",
}

export type Actions = ActionBase | ClickFavoriteButton | Error;

//actionCreator
const init = (apiType: string) => {
	return async (dispatch: Dispatch<ActionTypes>, getState: any) => {
		let fetchItems;
		const favoriteList = getState().favoriteList;
		try {
			if (apiType === "favorite") {
				fetchItems = favoriteList;
			} else {
				fetchItems = await fetchAPI.fetchAPI(config.apiType[apiType]);
			}
			const limitItems = fetchItems.slice(0, config.viewLimit);
			const itemDetailArr = [];
			for (const item of limitItems) {
				const itemDetail = await fetchAPI.fetchAPI(`item/${item}`);
				itemDetailArr.push(itemDetail);
			}
			dispatch({
				type: ActionTypes.INIT_HACKERNEWS,
				payload: {
					result: itemDetailArr,
					pureResult: fetchItems,
					searchResult: itemDetailArr,
					tabName: apiType,
					favoriteList: favoriteList,
				},
			});
		} catch {
			// TODO: error action
		}
	};
};

//TODO: tab切り替えの際にキーワードボックスに残っている文字で検索
const search = (inputValue: string) => (
	dispatch: Dispatch<ActionTypes>,
	getState: any
) => {
	const state = getState();
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
			favoriteList: state.favoriteList,
		},
	});
};

// お気に入り機能
const favorite = (checked: boolean, id: string) => (
	dispatch: Dispatch<ActionTypes>,
	getState: any
) => {
	const state = getState();
	let favoriteList = state.favoriteList;
	if (!checked) {
		favoriteList.push(id);
	} else {
		favoriteList = favoriteList.filter((val) => {
			return val !== id;
		});
	}
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
