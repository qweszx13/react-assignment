import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRepoParameter,setPageParameter } from "../contexts/apiParameterSlice";
import styles from "../styles/scss/home-header.module.scss"
import { Dispatch, UnknownAction } from "redux";


export default function HomeHeader(){
  const [issuePageNumberValue, setIssuePageNumber] = useState(1);
  const [orgValue, setOrgValue] = useState<string>("");
  const [repoValue, setRepoValue] = useState<string>("");

  const nanIsOne = (value :string) :number => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 1 : parseInt(value);
  const dispatch :Dispatch<UnknownAction>= useDispatch();

  function loadRepoOnclickEvent(orgValue :string, repoValue :string) :void{
    dispatch(setRepoParameter({org:orgValue,repo:repoValue}));
  }

  function jumpToPageOnclickEvent(page :number) :void{
    dispatch(setPageParameter(page));
  }

  return(
    <header className={styles.wrapper}>
      <div>
        <label>
          Org :
          <input placeholder="Org" type="text" onChange={(e)=>setOrgValue(e.target.value)}/>
        </label>
        <label>
          Repo :
          <input placeholder="Repo" type="text" onChange={(e)=>setRepoValue(e.target.value)}/>
        </label>
        <button onClick={()=>{loadRepoOnclickEvent(orgValue, repoValue)}}>
          Load Repo
        </button>
      </div>
      <div>
        <label>
          Issue Page :
        <input placeholder="Issues Page ex)1,2,3" type="number" onChange={(e)=>setIssuePageNumber(nanIsOne(e.target.value))}/>
        </label>
        <button onClick={()=>{jumpToPageOnclickEvent(issuePageNumberValue)}}>
          Jump to Page
        </button>
        <div data-testid="error-message">
          error message sample
        </div>
      </div>
    </header>
  )
}