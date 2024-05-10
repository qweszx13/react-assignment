import { useEffect, useState } from "react";
import store from "./contexts/store";
import { testOctokit, useGithubData } from "./services/githubApi";

function App() {
  
  useEffect(()=>{
    const test = async() =>await testOctokit(issuePageNumberValue);
    console.log(test);
  },[])

  const [orgValue, setOrgValue] = useState<string>("");
  const [repoValue, setRepoValue] = useState<string>("");
  const [issuePageNumberValue, setIssuePageNumber] = useState<number>(1);

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
          <button>
            Jump to Page
          </button>
        </form>
      </header> 
      <body>
        
      </body>
    </div>
  );
}

export default App;
