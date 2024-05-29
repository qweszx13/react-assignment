import HomeHeader from "../components/HomeHeader"
import HomeBody from "../components/HomeBody"
import styles from "../styles/scss/home.module.scss"

export default function Home(){

  return(
    <div className={styles.wrapper}>
      <HomeHeader></HomeHeader>
      <HomeBody></HomeBody>
    </div>
  )
}