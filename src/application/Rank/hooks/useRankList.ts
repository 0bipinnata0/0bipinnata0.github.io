import { useEffect } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch";
import useAppSelector from "../../../hooks/useAppSelector";
import {
  changeRankList,
  selectRankList,
} from "../../../store/rankList/rankListSlice";
import { getOfficialAndGlobalRank } from "../utils/filterIndex";

const useRankList = () => {
  const dispatch = useAppDispatch();
  const { rankList, status } = useAppSelector(selectRankList);
  const getRankListDataDispatch = () => {
    dispatch(changeRankList());
  };
  useEffect(() => {
    getRankListDataDispatch();
  }, []);
  const { globalList, officialList } = getOfficialAndGlobalRank(rankList);
  return {
    loading: status === "loading",
    globalList,
    officialList,
  };
};

export default useRankList;
