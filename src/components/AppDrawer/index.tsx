import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import CloseIcon from "../../assets/close-icon.svg"

import styles from "./AppDrawer.module.scss"

const AppDrawer = ({ toggleDrawer, isOpen, email, modalData }: any) => {
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      className={styles.drawer}>
      <div className={styles.heading}>
        <span>{email}</span>

        <button className={styles.closeButton} onClick={toggleDrawer}>
          <img src={CloseIcon} alt="Close Icon" />
        </button>
      </div>

      <div className={styles.graph}>
        <span>Использование токенов</span>

        {/* ГРАФИК */}
      </div>

      <div className={styles.divider} />

      <div className={styles.transactionsHistory}>
        <span>История операций</span>

        <div className={styles.table}>
          <div className={styles.tableTitle}>
            <p>Тип</p>
            <p>Сумма</p>
            <p>Дата</p>
          </div>

          {modalData.map((data: any) => {
            const date = new Date(data.created_at)

            return (
              <ul className={styles.transactionsList} key={data.id}>
                <li>{data.type === "REPLENISH" ? "Пополнение" : "Списание"}</li>
                <li
                  className={`${
                    data.type === "REPLENISH" ? styles.green : styles.red
                  }`}>
                  {data.type === "REPLENISH" ? "+" : "-"}
                  {data.amount} BTKN
                </li>
                <li>
                  {date.toLocaleString().replace(/-/g, ".").replace(/,/g, ", ")}
                </li>
              </ul>
            )
          })}
        </div>
      </div>
    </Drawer>
  )
}

export default AppDrawer
