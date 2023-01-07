import styled from "styled-components";
import globalStyle from "../../../assets/global-style";

const TopDesc = styled.div<{
  background: string;
}>`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${({ background }) => background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 43%, 0.4), hsla(0, 0%, 100%, 0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${globalStyle["font-size-s"]};
      line-height: 15px;
      color: ${globalStyle["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${globalStyle["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${globalStyle["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${globalStyle["font-size-m"]};
        color: ${globalStyle["font-color-desc-v2"]};
      }
    }
  }
`;

export default TopDesc;
