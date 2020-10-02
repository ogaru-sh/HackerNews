import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.div``;
const HeaderInner = styled.div``;
const ThreadButton = styled.div``;

const header = () => {
	return (
		<div className="header-main">
			<HeaderWrapper>
				<HeaderInner>
					<ThreadButton>NEW</ThreadButton>
					<ThreadButton>PAST</ThreadButton>
					<ThreadButton>COMMENTS</ThreadButton>
				</HeaderInner>
			</HeaderWrapper>
		</div>
	);
};

export default header;
