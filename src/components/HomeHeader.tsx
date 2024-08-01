import {ChangeEvent, useState} from "react";
import { useDispatch } from "react-redux";
import { setRepoParameter,setPageParameter } from "../contexts/apiParameterSlice";
import styles from "../styles/scss/home-header.module.scss"
import { Dispatch, UnknownAction } from "redux";
import {parse} from "node:url";

// // HomeHeader => ロジックと見た目を持ったコンポーネント

// // React: ロジック、見た目は分けることができる
// // React: ロジック => CustomHook閉じ込められる
// // React: 見た目　=> JSX

// // 分けることによるメリット
// // Counter <=> useCounter

// // カウンターコンポーネント
// // => 見た目
// // => ロジック

// // => 見た目　=> JSX
// // => ロジック => CustomHook

// // 見た目、ロジックを分けていない例
// const Counter = () => {
//   // ロジック
//   const [value, setCount] = useState(0)

//   const handleClick = () => {
//     setCount(current => current + 1)
//   }

//   const count = value


//   // 見た目
//   return (
//     <div onClick={handleClick}>
//       {count}回ボタンが押された
//     </div>
//   )
// }

// // 見た目とロジックの分け方

// // 見た目
// const Counter = ({count, handleClick}) => (
//   <div onClick={handleClick}>
//     {count}回ボタンが押された
//   </div>
// )

// // ロジック
// const useCounter = () => {
//   const [value, setCount] = useState(0)

//   const countUp = () => {
//     setCount(current => current + 1)
//   }

//   const count = value

//   return ({
//     count,
//     countUp,
//   })
// }

// // 見た目とロジックをくっつける（合成する）
// const Counter = () => {
//   const {count, handleClick} = useCounter

//   return <Counter count={count} handleClick={handleClick} />
// }

type PositiveNumber = {
  value: number
}


type Feature = [
  issuePageNumber: PositiveNumber,
  setIssuePageNumber: (newValue: PositiveNumber) => void,
]
type Parameter = {
  initialState: number
}
const useIssuesPageNumber = ({ initialState }: Parameter): Feature => {

}

// PositiveNumber | null -> PositiveNumber | PositiveNumber(1)
const getOrElse = <A,>(nullable: A | null, defaultValue: A): A => nullable === null ? defaultValue : nullable


// string -> PositiveNumber, string -> not PositiveNumber 1
const parsePositiveNumber = (value: string): PositiveNumber => {
  // string -> PositiveNumber | null
  // const nanIsOne = (value: string): number => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 1 : parseInt(value);
  const parseAsPositiveNumber = (value: string): PositiveNumber | null => {
    const result = parseInt(value)

    positiveResult = { value: parseInt(value) }

    switch ()

    return parseInt(value) > 1 ?  : null;
  }

  const maybePositiveNumber = parseAsPositiveNumber(value)

  return getOrElse(maybePositiveNumber, { value: 1 })
}


// string -> PositiveNumber, string -> not PositiveNumber 1
const nanIsOne = (value: string): number => isNaN(parseInt(value)) || parseInt(value) <= 0 ? 1 : parseInt(value);

// 1. 見た目からロジックを抽出する
// 2. どう的な値を引数として受け取れる形にする
// 3. ロジックをcustomHookにする
// 4. customHookと見た目を合成する
export default function HomeHeader(){
  // const [issuePageNumberValue, setIssuePageNumber] = useState(1);
  const [value, setValue] = useIssuesPageNumber(1)
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

  // event type 何を指定するんだ
  const handleChangeOrg = (e: ChangeEvent<HTMLInputElement>) => setOrgValue(e.target.value);

  const handleChangeRepo = (e: ChangeEvent<HTMLInputElement>) => setRepoValue(e.target.value);

  const parseAsPositiveNumber = (value: string): PositiveNumber => {

  }
  // const handleChangePageNumber = (e: ChangeEvent<HTMLInputElement>) => setIssuePageNumber(nanIsOne(e.target.value));
  const handleChangePageNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(nanIsOne(e.target.value));
    setValue(parseInt(e.target.value));
    setValue(parseAsPositiveNumber(e.target.value));
    setValue(parseAsPositiveNumber(e.target.value));
  }

  class A {
    public int getValue() {

    }
  }

  class B {
    public int getValue() {

    }
  }

  class Util {
    public void printA(A: a) {}
  }

  final var a = new A()
  final var b = new B()
  final var util = new Util()

  util.printA(a)

  util.printA(b)


  const handleClickeLoadRepository = () => loadRepoOnclickEvent(orgValue, repoValue);

  const handleClickPaging = () => jumpToPageOnclickEvent(issuePageNumberValue);

  // styles, handleChangeOrg(e),handleChangeRepo(e),handleChangePage(e), handleClickeLoadRepository,handleClickPaging()

  // 1. handle<EventName><ComponentName> <-- 案件ではよく見る
  // 2. handle<ComponentName><EventName> <-- 英語表現上ではこっちの方が正しかった気がする。。

  return(
      <header className={styles.wrapper}>
        <div>
          <label>
            Org :
            <input placeholder="Org" type="text" onChange={handleChangeOrg}/>
          </label>
          <label>
            Repo :
            <input placeholder="Repo" type="text" onChange={handleChangeRepo}/>
          </label>
          <button onClick={handleClickeLoadRepository}>
            Load Repo
          </button>
        </div>
        <div>
          <label>
            Issue Page :
            <input placeholder="Issues Page ex)1,2,3" type="number" onChange={handleChangePageNumber}/>
          </label>
          <button onClick={handleClickPaging}>
            Jump to Page
          </button>
          <div data-testid="error-message">
            error message sample
          </div>
        </div>
      </header>
  )
}