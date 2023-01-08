import { useEffect } from "react";
import { useParams } from "react-router";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import {
  changeSingerInfo,
  selectSingerInfo,
} from "../../../store/singerInfo/singerInfoSlice";

const useSingerInfo = () => {
  const dispatch = useAppDispatch();
  const { artist, hotSongs, status } = useAppSelector(selectSingerInfo);
  const { id } = useParams();
  useEffect(() => {
    id && dispatch(changeSingerInfo(id));
  }, []);

  return {
    artist,
    hotSongs,
    loading: status === "loading",
  };
};

export default useSingerInfo;
