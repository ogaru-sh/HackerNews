import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import actions from "../../ts/action";
import config from "../../ts/config";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		borderRadius: "0px",
	},
});

const CenteredTabs = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		dispatch(actions.init(config.tabTitles[newValue]));
	};

	return (
		<Paper className={classes.root}>
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
			</Tabs>
		</Paper>
	);
};

export default CenteredTabs;
