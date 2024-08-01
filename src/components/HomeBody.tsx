import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../contexts/listSlice";
import { setInfo } from "../contexts/infoSlice";
import { type RootState } from "../contexts/store/store";
import { getGithubIssueInfo,getGithubIssueList } from "../services/githubApi";
import Pagination from "./Pagination";
import styles from "../styles/scss/home-body.module.scss";
import {Dispatch, UnknownAction} from "redux";

interface ApiParameterState {
  org : string;
  repo : string;
  page : number;
}

interface IssueProfileUser {
  user: {
    avatar_url: string,
    login: string
  }
}

interface IssueContent {
  content : {
    number : number,
    title : string,
    comments : string,
    content : string,
    body : string,
    labels :[]
  }
}

export default function HomeBody() {

  const dispatch :Dispatch<UnknownAction> = useDispatch();

  const [openIssuesCount, setOpenIssuesCount] = useState(0);

  const selectedApiParameter : ApiParameterState = useSelector((state :RootState) => state.apiParameter)
  const selectedOrg : string = selectedApiParameter.org;
  const selectedRepo : string = selectedApiParameter.repo;
  const selectedPage : number = selectedApiParameter.page;

  const issueInforomations = useSelector((state: RootState) => state.list.value);

  const setData = async () : Promise<void> => {
    const infoResult = await getGithubIssueInfo(selectedOrg, selectedRepo);
    const listResult = await getGithubIssueList(selectedOrg, selectedRepo, selectedPage);

    if(infoResult && listResult){
      setOpenIssuesCount(infoResult.data.open_issues_count);
      dispatch(setList([...listResult.data]));
      dispatch(setInfo(infoResult))
    }
  }

  useEffect((): void => {
    setData();
  }, [selectedOrg, selectedRepo, selectedPage])

  const BodyTitle :string = `${openIssuesCount} Open Issues for ${selectedOrg}/${selectedRepo}`;

  const IssueProfile = ({ user } : IssueProfileUser) => {
    return (
        <a href="##" className={styles.user_info}>
          <img src={user.avatar_url} alt={+"ID is " + user.login} />
          <div>
            {user.login}
          </div>
        </a>
    )
  }

  const IssueContent = ({ content } : IssueContent ) => (
      <div className={styles.issue_info}>
        <a href="##">
          <span className={styles.issue_number}>#{content.number}</span>
          <span className={styles.issue_title}>{content.title}</span>
        </a>
        <div>( {content.comments} comments )</div>
        <p>{content.body}</p>
        {content.labels.map((i : { id : string, name : string } ) => {
            return (
                <div key={`labels-${i.id}-${i.name}`} className={styles.issue_lable}>
                  <span>{i.name}</span>
                </div>
            )
        })}
      </div>
  );

  const Issue = ({ data }: { data: any }) => {
    return (
        <div key={`list-${data.id}`} className={styles.content_wrapper}>
          <IssueProfile user={data.user} />
          <IssueContent content={data} />
        </div>
    )
  }

  return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>
            {BodyTitle}
          </h1>
        </div>
        {issueInforomations.map((data) => <Issue data={data} />)}
        <Pagination></Pagination>
    </div>
  )
}