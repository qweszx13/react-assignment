import { useEffect, useState } from "react";
import store from "./contexts/store";
import { testOctokit } from "./services/githubApi";

function App() {

  const [issuePageNumberValue, setIssuePageNumber] = useState<number>(1);
  const [orgValue, setOrgValue] = useState<string>("");
  const [repoValue, setRepoValue] = useState<string>("");
  const [userData,setUserData] = useState<any>([]);
  const [headerLink,setHeaderLink] = useState<string|undefined>();

  

  const setData = async () => {
    const result = await testOctokit(issuePageNumberValue);
    setUserData([...result.data]);
    setHeaderLink(result.headers.link);
  }
  
  useEffect(()=>{
      setData();
  },[])

  const nanIsOne = (value:string) :number => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 1 : parseInt(value);
  
  return (
    <div style={{textAlign:"center"}}>
      <header>
        <form>
          <label style={{margin:"0px 10px"}}>
            Org : {repoValue}
            <input placeholder="Org" type="text" style={{margin:"0px 10px"}} onChange={(e)=>setOrgValue(e.target.value)}/>
          </label>
          <label >
            Repo : {orgValue}
            <input placeholder="Repo" type="text" style={{margin:"0px 10px"}} onChange={(e)=>setRepoValue(e.target.value)}/>
          </label>
          <button>
            Load Repo
          </button>
        </form>
        <form>
          <label>
            Issue Page :{issuePageNumberValue}
          <input placeholder="Issues Page ex)1,2,3" type="number" style={{margin:"0px 10px"}} onChange={(e)=>setIssuePageNumber(nanIsOne(e.target.value))}/>
          </label>
          <button onClick={()=>{
            console.log(userData);
          }}>
            Jump to Page
          </button>
        </form>
      </header>
      <div>
          {userData.map((data: { id :string; user :{avatar_url :string, login :string} })=>{
            return (
            <div>
              <img src={data.user.avatar_url} alt={+"ID is "+data.user.login} style={{width:"40px",height:"40px",borderRadius:"20px"}}/>
              <p>
                {data.user.login}
              </p>
            </div>
            )
          })}
      </div>
    </div>
  );
}

export default App;
