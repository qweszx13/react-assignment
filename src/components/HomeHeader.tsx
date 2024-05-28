import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRepoParameter,setPageParameter } from "../contexts/apiParameterSlice";


export default function HomeHeader(){
  const [issuePageNumberValue, setIssuePageNumber] = useState<number>(1);
  const [orgValue, setOrgValue] = useState<string>("");
  const [repoValue, setRepoValue] = useState<string>("");

  const nanIsOne = (value :string) :number => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 1 : parseInt(value);
  const dispatch = useDispatch();

  function loadRepoOnclickEvent(orgValue :string, repoValue :string) :void{
    dispatch(setRepoParameter({org:orgValue,repo:repoValue}));
  }

  function jumpToPageOnclickEvent(page :number) :void{
    dispatch(setPageParameter(page));
  }
  
  const buttonStyle :{} = {
    backgroundColor:"#0875E2",
    border:"none",
    height:"25px",
    width:"100px",
    borderRadius:"3px",
    color:"white",
  }
  

  return(
    <header>
      <div>
        <label style={{margin:"0px 10px"}}>
          Org :
          <input placeholder="Org" type="text" style={{margin:"0px 10px"}} onChange={(e)=>setOrgValue(e.target.value)}/>
        </label>
        <label>
          Repo :
          <input placeholder="Repo" type="text" style={{margin:"0px 10px"}} onChange={(e)=>setRepoValue(e.target.value)}/>
        </label>
        <button style={buttonStyle} onClick={()=>{loadRepoOnclickEvent(orgValue, repoValue)}}>
          Load Repo
        </button>
      </div>
      <div>
        <label>
          Issue Page :
        <input placeholder="Issues Page ex)1,2,3" type="number" style={{margin:"0px 10px"}} onChange={(e)=>setIssuePageNumber(nanIsOne(e.target.value))}/>
        </label>
        <button style={buttonStyle} onClick={()=>{jumpToPageOnclickEvent(issuePageNumberValue)}}>
          Jump to Page
        </button>
      </div>
    </header>
  )
}