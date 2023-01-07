import styled from "styled-components";
import globalStyle from "../../../assets/global-style";

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${globalStyle["font-size-s"]};
    color: #3b1f1f;
    color: ${globalStyle["font-color-light"]};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;

export default Menu;
