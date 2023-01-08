import styled from "styled-components";

export const ImgWrapper = styled.div<{
  bgUrl: string;
}>`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${({ bgUrl }) => bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba (7, 17, 27, 0.3);
  }
`;
