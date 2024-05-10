import { Octokit } from 'octokit';
import { useState,useEffect } from 'react'

const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_API
})

export const testOctokit = async (per_page :number) =>{
  const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "facebook",
    repo: "react",
    per_page: per_page
  });
  
  console.log(result);
  return result;
}

const getGithubData = async (pageNum: number)=>{
  const response: Response = await fetch("https://api.github.com/repos/facebook/react/issues?page="+pageNum+"/issues?state=open");
  const jsonData: [] = await response.json();
  return jsonData;
}

export const useGithubData = (pageNum: number) => {
  const [data,setData] = useState([])
  useEffect(() => {
    getGithubData(pageNum).then(jsonData => setData(jsonData));
  },[])
  return data
}