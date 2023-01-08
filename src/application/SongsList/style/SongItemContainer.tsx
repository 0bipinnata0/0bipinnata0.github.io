import styled from "styled-components";
import globalStyle from "../../../assets/global-style";
export const SongItemContainer = styled.ul`
  > li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${globalStyle["border-color"]};
      ${globalStyle.noWrap()}
      >span {
        ${globalStyle.noWrap()}
      }
      > span:first-child {
        color: ${globalStyle["font-color-desc"]};
      }
      > span:last-child {
        font-size: ${globalStyle["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;
