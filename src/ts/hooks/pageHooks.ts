import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "../action";
import { AppState } from "../state";
import moment from "moment";

const usePageInit = (): void => {
	const dispatch = useDispatch();
	const props = useSelector((state: AppState) => state);
	const [time, setTime] = useState(moment());
	useEffect(() => {
		let tabName = props.tabName;
		if (!tabName) {
			dispatch(actions.init("new"));
		} else if (tabName !== "favorite") {
			dispatch(actions.init(tabName));
		}
		// インターバルごとにスレッド自動更新
		const interval = setInterval(() => {
			setTime(moment());
		}, 20000);
		return () => {
			clearInterval(interval);
		};
	}, []);
};

export default {
	usePageInit,
};
