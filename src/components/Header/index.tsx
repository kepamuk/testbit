import OrganizationIcon from "../../assets/organization-icon.svg"
import AdminAvatar from "../../assets/admin-avatar.svg"

import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header>
      <div className={styles.leftSection}>
        <h1>BitTest</h1>

        <div className={styles.myOrg}>
          <img src={OrganizationIcon} alt="OrganizationIcon" />
          <span>Моя организация</span>
        </div>
      </div>

      <button className={styles.rightSection}>
        <img src={AdminAvatar} alt="AdminAvatar" />
        <div className={styles.btnContent}>
          <span>Вы авторизованы</span>
          <p>Администратор</p>
        </div>
      </button>
    </header>
  )
}

export default Header
