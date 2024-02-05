import { MouseEventHandler } from "react"
import styles from "./PaginationButton.module.scss"

interface Props {
  children: any
  onClick: MouseEventHandler<HTMLButtonElement>
  isActive: boolean
  disabled: boolean
}

const PaginationButton = ({ children, onClick, isActive, disabled }: Props) => {
  return (
    <button
      className={`${styles.paginationBtn} ${isActive && styles.activeBtn}`}
      disabled={disabled}
      onClick={onClick}>
      {children}
    </button>
  )
}

export default PaginationButton
