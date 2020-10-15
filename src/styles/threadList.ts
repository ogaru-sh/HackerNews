import List, { ListProps } from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const StyledList = styled(List)`
	width: 70%;
	padding-top: 10px;
	left: 15%;
	background: rgba(255, 255, 255, 0.9);
	border: 1px solid #cccccc;
	border-radius: 7px;
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
	margin-top: 20px;
` as React.ComponentType<ListProps>;

export const StyledListItem: any = styled(ListItem)`
	padding-left: 30px;
	padding-bottom: 0px;
`;

//TODO: 型をつける
export const StyledTitleTypography = styled(Typography)`
	font-size: 18px;
`;

export const StyledTypography: any = styled(Typography)`
	padding-left: 12px;
	font-size: 14px;
`;

export const StyledAuthTypography: any = styled(Typography)`
	display: inline;
	font-size: 14px;
`;

export const StyledButton: any = styled(Button)`
	bottom: 1px;
	color: #0004ff69;
	font-size: 14px;
	margin-left: 6px;
`;

export const StyledDivider: any = styled(Divider)`
	width: auto;
	margin-left: 0px;
`;
