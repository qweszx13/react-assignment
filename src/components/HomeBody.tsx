import { useEffect, useState } from "react";
import { type GithubIssueInterface } from "../services/githubApi";
import { getGithubIssueInfo,getGithubIssueList } from "../services/githubApi";
import { setInfo } from "../contexts/infoSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../contexts/store";

export default function HomeBody() {

  const [openIssuesCount, setOpenIssuesCount] = useState<number>(0);

  const apiParameter = useSelector((state :RootState) => state.apiParameter)

//repo :string, owner :string,page :number
  const setData = async () => {
    const infoResult = await getGithubIssueInfo(apiParameter.org,apiParameter.repo);
    const listResult = await getGithubIssueList(apiParameter.org,apiParameter.repo,apiParameter.page);
    if(infoResult !== undefined && listResult !== undefined){
      setOpenIssuesCount(infoResult.data.open_issues_count);
      console.log([...listResult.data]);
      dispatch(setInfo([...listResult.data]));
    }
  }

const dispatch = useDispatch();

useEffect(() => {
  setData();
}, [apiParameter.page,apiParameter.org,apiParameter.repo])

const issueInfos = useSelector((state: RootState) => state.info.value);

  return (
    <div>
      <div>
        <h1 style={{ fontSize: "2em", fontWeight: "300" }}>
          {openIssuesCount} Open issues for {apiParameter.org}/{apiParameter.repo}
        </h1>
      </div>
      {issueInfos.map((data) => {
        return (
          <div key={`list-${data.id}`} style={{ width: "780px", height: "170px", padding: "16px 8px", display: "flex", borderBottom: "1px solid #E2E2E2" }}>
            <a href="##" style={{ textAlign: "center", width: "10%", color: "#9C9C9C" }}>
              <img src={data?.user?.avatar_url} alt={+"ID is " + data!.user!.login} style={{ width: "35px", height: "35px", borderRadius: "17.5px", border: "1px solid #E2E2E2" }} />
              <div style={{ fontSize: "12px", wordWrap: "break-word" }}>
                {data!.user!.login}
              </div>
            </a>
            <div style={{ width: "90%" }}>
              <a href="##">
                <span style={{ marginRight: "10px" }}>#{data.number}</span>
                <span style={{ color: "black", fontWeight: "bold" }}>{data.title}</span>
              </a>
              <div>( {data.comments} comments )</div>
              <p style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", WebkitLineClamp: "2" }}>{data.body}</p>
              {data.labels.map((i) => {
                if (typeof i !== "string") {
                  return (
                    <div key={`labels-${i.id}-${i.name}`} style={{ border: "1px solid #ccc", backgroundColor: "#fff", borderRadius: "5px", display: "inline-block", padding: "0px 5px", marginRight: "5px", paddingBottom: "3px" }}>
                      <span style={{ fontSize: ".65rem" }}>{i.name}</span>
                    </div>
                  )
                } else {
                  return null
                }
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}