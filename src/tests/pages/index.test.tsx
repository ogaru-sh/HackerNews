import React, { useMemo } from "react";
import { Provider } from "react-redux";
import CenteredTabs from "../../components/header/Tabs";
import { renderMUI } from "../support/renderMUI";
import { useStore, initStore, initializeStore } from "../../ts/store";
import { reducer } from "../../ts/reducer";
import { createStore } from "redux";

import { renderHook, act } from "@testing-library/react-hooks";

const initialState = {
	result: [],
	pureResult: [],
	searchResult: [],
	favoriteList: [],
	tabName: "new",
	error: {},
};

describe("Tab", () => {
	test("renders Tab component", () => {
		const store = renderHook(() => useStore(initialState));
		renderMUI(
			// TODO: オーバーロードエラーを回避する
			<Provider store={store}>
				<CenteredTabs />
			</Provider>
		);
	});
});
