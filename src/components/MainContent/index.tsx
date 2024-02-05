import axios from "axios"
import { useEffect, useState } from "react"
import { debounce } from "lodash"
import SearchIcon from "../../assets/search-icon.svg"
import ArrowDown from "../../assets/arrow-down.svg"
import ArrowLeft from "../../assets/arrow-left.svg"
import ArrowRight from "../../assets/arrow-right.svg"
import EditIcon from "../../assets/edit-icon.svg"
import DeleteDown from "../../assets/delete-icon.svg"
import PaginationButton from "../PaginationButton"
import AppDrawer from "../AppDrawer"
import { useDispatch, useSelector } from "react-redux"
import { actionSearchUser, actionUserList } from "../../store/action"

import styles from "./MainContent.module.scss"

const MainContent = () => {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [toggleOrder, setToggleOrder] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [searchInput, setSearchInput] = useState<string>("")

  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [modalData, setModalData] = useState([])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value)
  }

  const debouncedOnChange = debounce(handleInputChange, 500)

  const getModalData = async (id: any) => {
    try {
      const response = await axios.get(
        `https://test.gefara.xyz/api/v1/user/${id}/transactions`
      )
      setModalData(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handleClick = (id: any, email: any) => {
    getModalData(id)
    setEmail(email)
    setIsOpen((prevState) => !prevState)
  }

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const userData = useSelector((state: any) => state.userInfo)

  useEffect(() => {
    if (searchInput.length > 0) {
      dispatch(
        // @ts-ignore
        actionSearchUser({
          search: searchInput,
          orderBy: !toggleOrder ? "tokens:desc" : "tokens:asc",
        })
      )
      setIsLoading(false)
    } else if (searchInput.length === 0) {
      dispatch(
        // @ts-ignore
        actionUserList({
          page: currentPage,
          orderBy: !toggleOrder ? "tokens:desc" : "tokens:asc",
        })
      )
      setIsLoading(false)
    }
  }, [currentPage, toggleOrder, searchInput])

  const toggleOrderBy = () => {
    setToggleOrder((prevState) => !prevState)
  }

  return (
    <main>
      <h1 className={styles.title}>Моя организация</h1>

      <div className={styles.content}>
        <h3 className={styles.subTitle}>Пользователи</h3>

        <div className={styles.searchBox}>
          <img src={SearchIcon} alt="SearchIcon" />
          <input
            type="text"
            placeholder="Поиск"
            onChange={(event) => debouncedOnChange(event)}
            className={styles.search}
          />
        </div>

        <div className={styles.table}>
          <div className={styles.tableTitle}>
            <p>Email</p>
            <p>Имя</p>
            <p>Роль</p>
            <p>Подписка</p>
            <p>
              <button onClick={toggleOrderBy}>
                Токены
                <img
                  src={ArrowDown}
                  alt="ArrowDown"
                  className={`${toggleOrder && styles.revertIcon}`}
                />
              </button>
            </p>
            <p>Действия</p>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <h1>Загрузка...</h1>
            </div>
          ) : userData.usersInfo.data.length > 0 ? (
            userData.usersInfo.data.map((user: any) => (
              <ul className={styles.userList} key={user.id}>
                <li>{user.email}</li>
                <li>{user.name}</li>
                <li>{user.role}</li>
                <li>{user.subscription.plan.type}</li>
                <li>{user.subscription.tokens} TKN</li>
                <li>
                  <button
                    className={styles.edit}
                    onClick={() => handleClick(user.id, user.email)}>
                    <img src={EditIcon} alt="EditIcon" />
                  </button>
                  <button className={styles.delete}>
                    <img src={DeleteDown} alt="DeleteDown" />
                  </button>
                </li>
              </ul>
            ))
          ) : (
            <div className={styles.error}>
              <h1>
                К сожалению, по вашему запросу ничего не найдено. Попробуйте еще
                раз
              </h1>
            </div>
          )}
        </div>

        {searchInput.length === 0 && (
          <div className={styles.pagination}>
            {currentPage === 1 ? (
              <PaginationButton
                onClick={() => setCurrentPage(currentPage - 1)}
                isActive={false}
                disabled>
                <img src={ArrowLeft} alt="ArrowLeft" />
              </PaginationButton>
            ) : (
              <PaginationButton
                onClick={() => setCurrentPage(currentPage - 1)}
                isActive={false}
                disabled={false}>
                <img src={ArrowLeft} alt="ArrowLeft" />
              </PaginationButton>
            )}

            <PaginationButton
              isActive={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              disabled={false}>
              1
            </PaginationButton>
            <PaginationButton
              isActive={currentPage === 2}
              onClick={() => setCurrentPage(2)}
              disabled={false}>
              2
            </PaginationButton>
            <PaginationButton
              isActive={currentPage === 3}
              onClick={() => setCurrentPage(3)}
              disabled={false}>
              3
            </PaginationButton>
            <PaginationButton
              isActive={currentPage === 4}
              onClick={() => setCurrentPage(4)}
              disabled={false}>
              4
            </PaginationButton>
            <PaginationButton
              isActive={currentPage === 5}
              onClick={() => setCurrentPage(5)}
              disabled={false}>
              5
            </PaginationButton>

            {currentPage === 5 ? (
              <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                isActive={false}
                disabled>
                <img src={ArrowRight} alt="ArrowRight" />
              </PaginationButton>
            ) : (
              <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                isActive={false}
                disabled={false}>
                <img src={ArrowRight} alt="ArrowRight" />
              </PaginationButton>
            )}
          </div>
        )}
      </div>

      <AppDrawer
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        email={email}
        modalData={modalData}
      />
    </main>
  )
}

export default MainContent
