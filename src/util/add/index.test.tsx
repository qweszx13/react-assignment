import "@testing-library/jest-dom";
// import { fireEvent, render,screen } from "@testing-library/react";
import { add } from "."
// import { Provider } from "react-redux";
// import store from "../../contexts/store/store";
// import HomeHeader from "../../components/HomeHeader";

test('add 1 2', () => {
    const result = add(1, 2);

    expect(result).toBe(3); 
});

// describe('ギットハブからRepo、Orgを入力しtargetのリポジトリ情報をもらう',()=>{
//     test("ギットハブAPIを使用し情報を持ってくるけどRepoがない場合エラが出る",async ()=>{
//         //given →Org,Repo検索をした時
//         render(
//         <Provider store = {store}>
//             <HomeHeader/>
//         </Provider>
//         );
//         //when Repoの値がGithub上に存在しない場合
//         const orgInput = screen.getByLabelText("Org :");
//         const repoInput = screen.getByLabelText("Repo :");

//         fireEvent.change(orgInput, ({target: {value: "react"}}));   
//         fireEvent.change(repoInput, ({target: {value: "facebook-is-not-exist-repo"}}));
        
//         //then エラメッセージが表示される
//         //作成してないです
//     })    

//     test("ギットハブAPIを使用し情報を持ってくるけどOrg(Owner)がない場合エラが出る",async ()=>{
//         //given →Org,Repo検索をした時
//         render(
//         <Provider store = {store}>
//             <HomeHeader/>
//         </Provider>
//         );
//         //when Orgの値がGithub上に存在しない場合
//         const orgInput = screen.getByLabelText("Org :");
//         const repoInput = screen.getByLabelText("Repo :");

//         fireEvent.change(orgInput, ({target: {value: "react-is-not-exist-owner"}}));   
//         fireEvent.change(repoInput, ({target: {value: "facebook"}}));   
//         //then エラメッセージが表示される
//         //作成してないです
//     })    

//     test("ギットハブAPIを使用し情報を持ってくるけどRepo,Orgがない場合エラが出る",async ()=>{
//         //given →Org,Repo検索をした時
//         render(
//         <Provider store = {store}>
//             <HomeHeader/>
//         </Provider>
//         );
//         //when Org,Repoの値が存在しない場合
//         const orgInput = screen.getByLabelText("Org :");
//         const repoInput = screen.getByLabelText("Repo :");

//         fireEvent.change(orgInput, ({target: {value: ""}}));   
//         fireEvent.change(repoInput, ({target: {value: ""}}));   
//         //then エラメッセージが表示される
//         //作成してないです
//     })    
// })