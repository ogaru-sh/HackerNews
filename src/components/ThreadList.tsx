import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import actions from "../ts/action";
import moment from "moment";

import {
	StyledList,
	StyledListItem,
	StyledTitleTypography,
	StyledTypography,
	StyledAuthTypography,
	StyledButton,
	StyledDivider,
} from "../styles/threadList";

import { AppState } from "../ts/state";
import { ColorType, ApiResult, DefaultState } from "../ts/interface";

const ThreadList: FC = () => {
	const props = useSelector((state: AppState) => state);
	return (
		<StyledList>
			{(() => {
				return props.result.map((item: ApiResult, _index: number) => {
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

const HackerNewsList = (props: {item: ApiResult, favoriteList: DefaultState["favoriteList"] }) => {
	const dispatch = useDispatch();
	const { item, favoriteList } = props;
	const isFavorite = favoriteList.indexOf(item.id) !== -1 ? true : false;

	const [favoriteState, setFavoriteState] = useState<IfavoriteState>({
		color: "",
		checked: false,
		id: "",
	});

	favoriteState.color = isFavorite ? ColorType.Sec : ColorType.Pri;
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
					primary={
						<StyledTitleTypography>
							{item.title}
						</StyledTitleTypography>
					}
					secondary={
						<React.Fragment>
							<StyledAuthTypography component="span">
								{item.by ? `by ${item.by}` : "no author"}
							</StyledAuthTypography>
							<StyledTypography component="span">
								{item.score
									? `${item.score} points`
									: "0 points"}
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
								{item.descendants
									? `${item.descendants} comments`
									: "0 comments"}
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
