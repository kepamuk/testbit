import axios from "axios"
import { reducerSearchUser, reducerUserInfo } from "./slice"

export const actionUserList =
  ({ page, orderBy }: any) =>
  (dispatch: any) => {
    axios
      .get(
        `https://test.gefara.xyz/api/v1/user/list?page=${page}&orderBy=${orderBy}`
      )
      .then((res) => {
        dispatch(reducerUserInfo(res.data))
      })
  }

export const actionSearchUser =
  ({ search, orderBy }: any) =>
  (dispatch: any) => {
    axios
      .get(
        `https://test.gefara.xyz/api/v1/user/list?search=${search}&orderBy=${orderBy}`
      )
      .then((res) => {
        dispatch(reducerSearchUser(res.data))
      })
  }
