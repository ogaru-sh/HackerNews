import React from "react";
import { useDispatch } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { useStyles } from "../../styles/header";
import SearchIcon from "@material-ui/icons/Search";
import CenteredTabs from "./Tabs";
import actions from "../../ts/action";

const SearchAppBar = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleChange = (event: { target: { value: string } }) => {
		dispatch(actions.search(event.target.value));
	};
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6" noWrap>
						HackerNews
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
							onChange={handleChange}
						/>
					</div>
				</Toolbar>
				<CenteredTabs />
			</AppBar>
		</div>
	);
};

export default SearchAppBar;
