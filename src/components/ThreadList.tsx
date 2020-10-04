import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { createMuiTheme } from "@material-ui/core/styles";
import { AppState } from "../ts/state";
import actions from "../ts/action";
import moment from "moment";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			paddingTop: "10px",
			backgroundColor: theme.palette.background.paper,
		},
		inline: {
			display: "inline",
		},
		title: {
			color: theme.palette.primary.light,
		},
	})
);

const ThreadList = () => {
	const classes = useStyles();
	const props = useSelector((state: AppState) => state);
	return (
		<List className={classes.root}>
			{(() => {
				return props.result.map((item: any, index: number) => {
					return (
						<>
							<HackerNewsList
								key={index}
								item={item}
								classes={classes}
								favoriteList={props.favoriteList}
							/>
							<Divider variant="inset" component="li" />
						</>
					);
				});
			})()}
		</List>
	);
};

interface IfavoriteState {
	color: any;
	checked: boolean;
	id: string;
}

const HackerNewsList: any = (props: any) => {
	const dispatch = useDispatch();
	const { item, classes, favoriteList } = props;
	const isFavorite = favoriteList.indexOf(item.id) !== -1 ? true : false;

	const [favoriteState, setFavoriteState] = useState<IfavoriteState>({
		color: "",
		checked: false,
		id: "",
	});
	enum role {
		PRIMARY = "primary",
		SECONDARY = "secondary",
	}
	favoriteState.color = isFavorite ? "secondary" : "primary";
	favoriteState.checked = isFavorite;
	favoriteState.id = item.id;

	//投稿してからの時間を算出
	const postTime = moment(Number(item.time) * 1000).fromNow();
	const commentUrl = `https://news.ycombinator.com/item?id=${item.id}`;

	//お気に入りボタンのクリック状態を変更、お気に入りリスト変更
	const handleChange = () => {
		const state = favoriteState;
		if (state.checked === false) {
			setFavoriteState({
				color: "secondary",
				checked: true,
				id: item.id,
			});
		} else {
			setFavoriteState({
				color: "primary",
				checked: false,
				id: item.id,
			});
		}
		dispatch(actions.favorite(favoriteState.checked, favoriteState.id));
	};

	return (
		<ListItem
			button
			alignItems="flex-start"
			component="a"
			href={item.url}
			target="_brank"
		>
			<ListItemAvatar>
				<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
			</ListItemAvatar>
			<ListItemText
				primary={item.title}
				secondary={
					<React.Fragment>
						<Typography
							component="span"
							variant="body2"
							className={classes.inline}
							color="textPrimary"
						>
							by {item.by}
						</Typography>
						{item.score} points | {postTime}
						<a href={commentUrl} target="_brank">
							{item.descendants}
							comments
						</a>
					</React.Fragment>
				}
			/>
			<ListItemSecondaryAction>
				<IconButton onClick={handleChange}>
					<StarBorderIcon
						fontSize="large"
						color={favoriteState.color}
					/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default ThreadList;
