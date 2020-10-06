import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List, { ListProps } from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { AppState } from "../ts/state";
import actions from "../ts/action";
import moment from "moment";

const StyledList = styled(List)`
	width: 100%;
	padding-top: 10px;
` as React.ComponentType<ListProps>;

//TODO: 型をつける
const StyledTypography: any = styled(Typography)`
	padding-left: 10px;
`;

const StyledAuthTypography: any = styled(Typography)`
	display: inline;
`;

const ThreadList = () => {
	const props = useSelector((state: AppState) => state);
	return (
		<StyledList>
			{(() => {
				return props.result.map((item: any, index: number) => {
					return (
						<HackerNewsList
							key={item.id}
							item={item}
							favoriteList={props.favoriteList}
						/>
					);
				});
			})()}
		</StyledList>
	);
};

interface IfavoriteState {
	color: any;
	checked: boolean;
	id: string;
}

const HackerNewsList: any = (props: any) => {
	const dispatch = useDispatch();
	const { item, favoriteList } = props;
	const isFavorite = favoriteList.indexOf(item.id) !== -1 ? true : false;

	const [favoriteState, setFavoriteState] = useState<IfavoriteState>({
		color: "",
		checked: false,
		id: "",
	});

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
		<>
			<ListItem
				button
				alignItems="flex-start"
				component="a"
				href={item.url}
				target="_brank"
			>
				<ListItemAvatar>
					<Avatar
						alt="Remy Sharp"
						src="/static/images/avatar/1.jpg"
					/>
				</ListItemAvatar>
				<ListItemText
					primary={item.title}
					secondary={
						<React.Fragment>
							<StyledAuthTypography
								component="span"
								color="textPrimary"
							>
								by {item.by}
							</StyledAuthTypography>
							<StyledTypography component="span">
								{item.score} points | {postTime}
								<button
									onClick={(commentUrl) => {
										window.open().location.href = commentUrl;
									}}
									color="inherit"
								>
									{`${item.descendants} comments`}
								</button>
							</StyledTypography>
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
			<Divider variant="inset" component="li" />
		</>
	);
};

export default ThreadList;
