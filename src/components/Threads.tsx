import Link from "next/link";
import styled from "styled-components";

const ThreadsWrapper = styled.div`
	width: 960px;
	margin: 40px auto;
	padding: 20px 0;
	background: rgba(255, 255, 255, 0.9);
	border: 1px solid #cccccc;
	border-radius: 7px;
	box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
`;
const ThreadsInner = styled.div``;
const ThreadTitle = styled.div``;
const ThreadsItem = styled.div``;
const RoleName = styled.div``;

const Threads = () => {
	return (
		<div className="threads-main">
			<ThreadsWrapper>
				<ThreadsInner>
					<RoleName>スレッド一覧</RoleName>
					<ThreadsItem>
						<ThreadTitle>NEW</ThreadTitle>
					</ThreadsItem>
					<ThreadsItem>
						<ThreadTitle>NEW</ThreadTitle>
					</ThreadsItem>
					<ThreadsItem>
						<ThreadTitle>NEW</ThreadTitle>
					</ThreadsItem>
				</ThreadsInner>
			</ThreadsWrapper>
		</div>
	);
};

export default Threads;
