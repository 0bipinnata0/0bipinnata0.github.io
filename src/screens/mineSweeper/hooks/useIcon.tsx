import styled from "styled-components";

const One = styled.div`
  color: #136f63;
  font-weight: 900;
`;

const Two = styled.div`
  color: #032b43;
  font-weight: 900;
`;

const Three = styled.div`
  color: #3f88c5;
  font-weight: 900;
`;

const Four = styled.div`
  color: #ffba08;
  font-weight: 900;
`;
const Five = styled.div`
  color: #d00000;
  font-weight: 900;
`;

const Six = styled.div`
  color: #2b9348;
  font-weight: 900;
`;

const Seven = styled.div`
  color: #aaf683;
  font-weight: 900;
`;
const Eight = styled.div`
  color: #985f99;
  font-weight: 900;
`;

const useIcon = (type: number): React.ReactNode => {
  switch (type) {
    case -1:
      return <>💣</>;
    case 1:
      return <One>1</One>;
    case 2:
      return <Two>2</Two>;
    case 3:
      return <Three>3</Three>;
    case 4:
      return <Four>4</Four>;
    case 5:
      return <Five>5</Five>;
    case 6:
      return <Six>6</Six>;
    case 7:
      return <Seven>7</Seven>;
    case 8:
      return <Eight>8</Eight>;
    default:
      return null;
  }
};

export default useIcon;
