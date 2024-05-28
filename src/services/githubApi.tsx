import { Octokit } from 'octokit';

export const LIST_ITEM_COUNT = 25;

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_API
})

// Octokit-Libraries-Owner,Repository,Page設定し使う場合
export const getGithubFacebookList = async (page :number) =>{
  const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "facebook",
    repo: "react",
    page:page,
    per_page: LIST_ITEM_COUNT,
  });
  
  console.log(result); 
  return result;
}

export const getGithubFacebookInfo = async () => {
  const result = await octokit.request("GET /repos/{owner}/{repo}",{
    owner: "facebook",
    repo: "react"
  })

  console.log(result);
  return result
}
// Octokit-Libraries-Owner,Repository,Pageを引数として使った場合
export const getGithubIssueList = async (owner :string, repo :string, page :number) =>{
  const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: owner,
    repo: repo,
    page:page,
    per_page: LIST_ITEM_COUNT,
  }).catch((error)=>{
    if(error.response.status === 404){
      console.log("Page Not Found Please Check Owner : "+owner +",Repo : "+ repo )
    }
  })

  if(typeof response === "undefined" ){
    console.log("void"); 
  }else{
    return response;
  }
}

export type GithubIssueInterface = Awaited<ReturnType<typeof getGithubFacebookList>>["data"]

export const getGithubIssueInfo = async (owner :string, repo :string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}",{
    owner: owner,
    repo: repo
  }).catch((error)=>{
    if(error.response.status === 404){
      console.log("Page Not Found Please Check Owner : "+owner +",Repo : "+ repo )
    }
  })

  if(typeof response === "undefined" ){
    console.log("void"); 
  }else{
    return response;
  }
}

export type GithubIssueInfoInterface = Awaited<ReturnType<typeof getGithubIssueInfo>>;