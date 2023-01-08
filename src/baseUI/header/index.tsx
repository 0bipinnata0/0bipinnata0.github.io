import React from "react";
import styled from "styled-components";
import globalStyle from "../../assets/global-style";
import { Marquee } from "./style";

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${globalStyle["font-color-light"]};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${globalStyle["font-size-l"]};
    font-weight: 700;
  }
`;
// 处理函数组件拿不到 ref 的问题，所以用 forwardRef
const Header = React.forwardRef<
  HTMLDivElement,
  { handleClick?: () => void; children: string; isMarquee?: boolean }
>((props, ref) => {
  const {
    handleClick = () => {},
    children = "标题",
    isMarquee = false,
  } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        <Marquee>
          <h1>{children}</h1>
        </Marquee>
      ) : (
        <h1>{children}</h1>
      )}
    </HeaderContainer>
  );
});

export default React.memo(Header);
