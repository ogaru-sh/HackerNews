import React from "react";
import { Provider } from "react-redux";
import CenteredTabs from "../../components/header/Tabs";
import { renderMUI } from "../support/renderMUI";
import { useStore } from "../../ts/store";
import configureStore from "redux-mock-store";

import { renderHook, act } from "@testing-library/react-hooks";

const initialState = {
  result: [],
  pureResult: [],
  searchResult: [],
  favoriteList: [],
  tabName: "new",
  error: {}
};

const mockStore = configureStore();

describe("Tab", () => {
  test("renders Tab component", () => {
    const store = renderHook(() => useStore(initialState));
    renderMUI(
      <Provider store={mockStore(initialState)}>
        <CenteredTabs />
      </Provider>
    );
  });
});
