import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import actions from "../../ts/action";
import config from "../../ts/config";

const StyledPaper = styled(Paper)`
	flex-grow: 1;
	border-radius: 0px;
` as React.ComponentType<PaperProps>;

const CenteredTabs = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState(0);

	//　タブの切り替えとタブ名に沿ったデータを取得するアクション実行
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		dispatch(actions.init(config.tabTitles[newValue]));
	};

	return (
		<StyledPaper>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="new" />
				<Tab label="popular" />
				<Tab label="job" />
				<Tab label="favorite" />
			</Tabs>
		</StyledPaper>
	);
};

export default CenteredTabs;
