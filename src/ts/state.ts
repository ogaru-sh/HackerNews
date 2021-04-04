import { DefaultState } from "./interface";

export interface AppState extends DefaultState {}

export const initialState: DefaultState = {
	result: [
		{
			deleted: false,
			type: "",
			by: "",
			time: 0,
			text: "",
			dead: false,
			parent: [],
			poll: 0,
			kids: [],
			url: "",
			score: 0,
			title: "",
			parts: [],
			descendants: 0,
			id: ""
		},
	],
	pureResult: [],
	searchResult: [],
	favoriteList: [],
	tabName: "new",
	error: {},
};