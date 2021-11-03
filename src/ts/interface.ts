import { Action } from "redux";
import { ActionTypes } from "./action";
import { AppState } from "./state";

export interface InitialProps {
	store: {
		dispatch: AppState;
	};
}

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

export interface DefaultState {
	result: ApiResult[] 
	pureResult: object[];
	searchResult: object[];
	favoriteList: string[];
	tabName: string;
	error: any;
}

export interface ApiResult 	{
	deleted: boolean;
	type: string;
	by: string;
	time: number;
	text: string;
	dead: boolean;
	parent: number[];
	poll: number;
	kids: number[];
	url: string;
	score: number;
	title: string;
	parts: number[];
	descendants: number;
	id: string
}

export enum ColorType {
	Pri = "primary",
	Sec = "secondary",
}

export interface Config {
	apiInfo: {
		baseUrl: string;
		query: string;
	};
	apiType: {
		new: string;
		popular: string;
		job: string;
	};
	tabTitles: string[];
	viewLimit: number;
}
