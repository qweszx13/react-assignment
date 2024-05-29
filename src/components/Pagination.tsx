import { useState, useEffect } from "react";
import styles from "../styles/scss/pagination.module.scss";
import { RootState } from "../contexts/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LIST_ITEM_COUNT } from "../services/githubApi";
import { type GithubIssueInfoInterface } from '../services/githubApi';
import { setPageParameter } from "../contexts/apiParameterSlice";

export default function Pagination() {

  const issueInformaitions :GithubIssueInfoInterface = useSelector((state :RootState) => state.info.value);
  const issuePage :number = useSelector((state :RootState)=> state.apiParameter.page);

  const [totalItems,setTotalItems] = useState(1);//開かれたIssueの数
  const itemCountPerPage :number = LIST_ITEM_COUNT;//ページに表すItemの数
  const pageCount :number = 10;//表示するページ数
  const currentPage :number = issuePage;//現在ページ
  const totalPages :number = totalItems !== 0 ? Math.ceil(totalItems / itemCountPerPage) : 0 //全体ページ数
  const [start, setStart] = useState(1);
  const noPrev :boolean = start === 1;//前→表示
  const noNext :boolean = start + pageCount - 1 >= totalPages;//後→表示

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
    setTotalItems(issueInformaitions?.data !== undefined ? issueInformaitions.data.open_issues_count : 1);
  }, [currentPage, pageCount, start, issueInformaitions]);

  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <p onClick={()=>dispatch(setPageParameter(start - 1))}>前</p>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <div className="page-list-div" key={"page"+ i}>
            {start + i <= totalPages && (
              <li key={i}>
                <p className={`${styles.page} ${currentPage === start + i && styles.active}`}
                  onClick={()=>dispatch(setPageParameter(start + i))}>
                  {start + i}
                </p>
              </li>
            )}
          </div>
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <p onClick={()=>dispatch(setPageParameter(start + pageCount))}>次</p>
        </li>
      </ul>
    </div>
  );
}