import type { ITrack } from "../../api/request/getRankListRequest";
import { SongContainer } from "./style";

const SongList: React.FC<{
  traces: ITrack[];
}> = ({ traces }) => {
  if (!traces.length) {
    return null;
  }
  return (
    <SongContainer>
      {traces.map((item, index) => {
        return (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        );
      })}
    </SongContainer>
  );
};
export default SongList;
