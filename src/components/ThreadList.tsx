import React, { FC } from "react";
import { useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
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
	})
);

const ThreadList = () => {
	const classes = useStyles();
	const props = useSelector((state: AppState) => state);
	console.log(props);

	return (
		<List className={classes.root}>
			{(() => {
				return props.newStories.map((item: any, index: number) => {
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

const HackerNewsList: any = (props: any) => {
	const { item, classes } = props;

	//投稿してからの時間を算出
	const postTime = moment(Number(item.time) * 1000).fromNow();
	const commentUrl = `https://news.ycombinator.com/item?id=${item.id}`;
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
		</ListItem>
	);
};

export default ThreadList;
