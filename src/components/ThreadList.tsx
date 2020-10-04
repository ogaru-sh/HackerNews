import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
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
	console.log(props);
	return (
		<List className={classes.root}>
			{(() => {
				return props.result.map((item: any, index: number) => {
					console.log(item);
					return (
						<>
							<HackerNewsList
								key={index}
								item={item}
								classes={classes}
							/>
							<Divider variant="inset" component="li" />
						</>
					);
				});
			})()}
		</List>
	);
};

//お気に入りボタンの切り替える色の定義
const favoriteIconTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#4791db",
		},
		secondary: {
			main: "#e33371",
		},
	},
});

const HackerNewsList: any = (props: any) => {
	const { item, classes } = props;
	const [favoriteIcon, setFavoriteIcon] = React.useState({
		color: "primary",
		checked: false,
	});

	//投稿してからの時間を算出
	const postTime = moment(Number(item.time) * 1000).fromNow();
	const commentUrl = `https://news.ycombinator.com/item?id=${item.id}`;
	const handleChange = () => {
		const state = favoriteIcon;
		if (state.checked === false) {
			setFavoriteIcon({
				color: "secondary",
				checked: true,
			});
		} else {
			setFavoriteIcon({
				color: "primary",
				checked: false,
			});
		}
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
						{item.score} points | {postTime} |
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
						color={favoriteIcon.color}
					/>
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	);
};

export default ThreadList;
