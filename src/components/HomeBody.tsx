import { useEffect, useState } from "react";
import { getGithubFacebookInfo, getGithubFacebookList } from "../services/githubApi";

export default function HomeBody(){
  
  type DataType = { id :string, 
    user :{avatar_url :string, login :string}, 
    number :number, 
    body :string,
    title :string, 
    comments :number, 
    labels :Array<string>}

  //setIssuePageNumber -> reduxで管理するのがいいのか質問
  const [issuePageNumberValue, setIssuePageNumber] = useState<number>(1);
  const [userData,setUserData] = useState<any>([]);
  const [openIssuesCount,setOpenIssuesCount] = useState<number>(0);
  

  const setData = async () => {
    try {
      const infoResult = await getGithubFacebookInfo();
      const listResult = await getGithubFacebookList(issuePageNumberValue);
      
      setOpenIssuesCount(infoResult.data.open_issues_count);
      setUserData([...listResult.data]);
    } catch (error) {
      console.log(error); 
    }
  }
  
  useEffect(()=>{
      setData();
  },[])

  return(
    <div>
      <div>
        <h1 style={{fontSize:"2em",fontWeight:"300"}}>
          {openIssuesCount} Open issues for Facebook / react
        </h1>
      </div>

      {userData.map((data: DataType)=>{
        return (
        <div key={`list-${data.id}`} style={{width:"780px",height:"170px",padding:"16px 8px",display:"flex",borderBottom:"1px solid #E2E2E2"}}>
          <a href="##" style={{textAlign:"center", width:"10%",color:"#9C9C9C"}}>
            <img src={data.user.avatar_url} alt={+"ID is "+data.user.login} style={{width:"35px",height:"35px",borderRadius:"17.5px",border:"1px solid #E2E2E2"}}/>
            <div style={{fontSize:"12px",wordWrap:"break-word"}}>
              {data.user.login}
            </div>
          </a>
          <div style={{width:"90%"}}>
            <a href="##">
              <span style={{marginRight:"10px"}}>#{data.number}</span>
              <span style={{color:"black", fontWeight:"bold"}}>{data.title}</span>
            </a>
            <div>( {data.comments} comments )</div>
            <p style={{display:"-webkit-box", WebkitBoxOrient:"vertical",overflow:"hidden",WebkitLineClamp:"2"}}>{data.body}</p>
            {data.labels.map((i :any/*質問する部分*/)=>{
              return (
                <div key={`labels-${data.id}-${i.name}`} style={{border:"1px solid #ccc",backgroundColor:"#fff",borderRadius:"5px",display:"inline-block", padding:"0px 5px",marginRight:"5px",paddingBottom:"3px"}}>
                  <span style={{fontSize:".65rem"}}>{i.name}</span>
                </div>
              )
            })}
          </div>
        </div>
        )
      })}
    </div>
  )
}