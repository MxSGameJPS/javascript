import styles from './LandingFooter.module.css'

export default function LandingFooter(){
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.center}>
          <span className={styles.credit}>developed by</span>
          <a className={styles.creditLink} href="https://www.linkedin.com/in/saulopavanello" target="_blank" rel="noreferrer">@saulopavanello</a>
        </div>
      </div>
    </footer>
  )
}
