import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <span>😓</span>
      <br />
      <p>Страница не найдена!</p>
    </div>
  )
}

export default NotFound
