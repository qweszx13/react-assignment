import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../contexts/listSlice";
import { setInfo } from "../contexts/infoSlice";
import { type RootState } from "../contexts/store/store";
import { getGithubIssueInfo,getGithubIssueList } from "../services/githubApi";
import Pagination from "./Pagination";
import styles from "../styles/scss/home-body.module.scss";

export default function HomeBody() {

  const dispatch = useDispatch();

  const [openIssuesCount, setOpenIssuesCount] = useState(0);

  const apiParameter = useSelector((state :RootState) => state.apiParameter)
  const issueInforomations = useSelector((state: RootState) => state.list.value);

  const setData = async () => {
    const infoResult = await getGithubIssueInfo(apiParameter.org,apiParameter.repo);
    const listResult = await getGithubIssueList(apiParameter.org,apiParameter.repo,apiParameter.page);

    if(infoResult !== undefined && listResult !== undefined){
      setOpenIssuesCount(infoResult.data.open_issues_count);
      dispatch(setList([...listResult.data]));
      dispatch(setInfo(infoResult))
    }
  }

  useEffect(() => {
    setData();
  }, [apiParameter.page,apiParameter.org,apiParameter.repo])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>
          {openIssuesCount} Open issues for {apiParameter.org}/{apiParameter.repo}
        </h1>
      </div>
      {issueInforomations.map((data) => (
          <div key={`list-${data.id}`} className={styles.content_wrapper}>
            <a href="##" className={styles.user_info}>
              <img src={data?.user?.avatar_url} alt={+"ID is " + data!.user!.login}/>
              <div>
                {data!.user!.login}
              </div>
            </a>
            <div className={styles.issue_info}>
              <a href="##">
                <span className={styles.issue_number}>#{data.number}</span>
                <span className={styles.issue_title}>{data.title}</span>
              </a>
              <div>( {data.comments} comments )</div>
              <p>{data.body}</p>
              {data.labels.map((i) => {
                if (typeof i !== "string") {
                  return (
                    <div key={`labels-${i.id}-${i.name}`} className={styles.issue_lable}>
                      <span>{i.name}</span>
                    </div>
                  )}else 
                  return null
              })}
            </div>
          </div>
        )
      )}
      <Pagination></Pagination>
    </div>
  )
}