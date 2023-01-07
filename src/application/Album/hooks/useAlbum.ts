import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import {
  changeCurrentAlbum,
  selectAlbum,
} from "../../../store/albumDetail/albumDetailSlice";

const useAlbum = () => {
  let { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentAlbum, status } = useAppSelector(selectAlbum);
  useEffect(() => {
    id && dispatch(changeCurrentAlbum(id));
  }, []);
  return {
    loading: status === "loading",
    currentAlbum,
  };
};

export default useAlbum;
