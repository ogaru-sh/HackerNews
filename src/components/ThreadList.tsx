import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List, { ListProps } from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { AppState } from "../ts/state";
import actions from "../ts/action";
import moment from "moment";

const StyledList = styled(List)`
	width: 70%;
	padding-top: 10px;
	left: 15%;
	background: rgba(255, 255, 255, 0.9);
	border: 1px solid #cccccc;
	border-radius: 7px;
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
	margin-top: 20px;
` as React.ComponentType<ListProps>;

const StyledListItem: any = styled(ListItem)`
	padding-left: 30px;
	padding-bottom: 0px;
`;

//TODO: 型をつける
const StyledTypography: any = styled(Typography)`
	padding-left: 10px;
`;

const StyledAuthTypography: any = styled(Typography)`
	display: inline;
	color: gray;
`;

const StyledButton: any = styled(Button)`
	bottom: 1px;
	color: #0002ff82; ;
`;

const StyledDivider: any = styled(Divider)`
	width: 90%;
	margin-left: 35px;
`;

const ThreadList: FC = () => {
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
	// TODO: material-uiモジュールの型定義を明確に付与する
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
			<StyledListItem
				button
				alignItems="flex-start"
				component="a"
				href={item.url}
				target="_brank"
			>
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
								{item.score} points
							</StyledTypography>
							<StyledTypography component="span">
								{postTime}
							</StyledTypography>
							<StyledButton
								onClick={(e) => {
									window.open(commentUrl, "_blank");
								}}
								color="inherit"
							>
								{`${item.descendants} comments`}
							</StyledButton>
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
			</StyledListItem>
			<StyledDivider variant="inset" component="li" />
		</>
	);
};

export default ThreadList;
