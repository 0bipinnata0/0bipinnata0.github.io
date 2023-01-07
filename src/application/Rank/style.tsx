import styled from "styled-components";
import globalStyle from "../../assets/global-style";

// Props 中的 globalRank 和 tracks.length 均代表是否为全球榜

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .official,
  .global {
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${globalStyle["font-size-m"]};
    color: ${globalStyle["font-color-desc"]};
  }
`;
export const List = styled.ul<{
  isGlobal: boolean;
}>`
  margin-top: 10px;
  padding: 0 5px;
  display: ${({ isGlobal }) => (isGlobal ? "flex" : "")};
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${globalStyle["background-color"]};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`;
export const ListItem = styled.li<{
  show: boolean;
}>`
  display: ${({ show }) => (show ? "flex" : "")};
  padding: 3px 0;
  border-bottom: 1px solid ${globalStyle["border-color"]};
  .img_wrapper {
    width: ${({ show }) => (show ? "27vw" : "32vw")};
    height: ${({ show }) => (show ? "27vw" : "32vw")};
    border-radius: 3px;
    position: relative;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient
        (hsla (0, 0%, 100%, 0), hsla (0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequency {
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${globalStyle["font-size-ss"]};
      color: ${globalStyle["font-color-light"]};
    }
  }
`;
export const SongContainer = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${globalStyle["font-size-s"]};
    color: grey;
  }
`;

export const EnterLoading = styled.div<{
  show?: boolean;
}>`
  display: ${(props) => (props.show ? "initial" : "none")};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
`;
