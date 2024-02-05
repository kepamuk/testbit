import { createSlice } from "@reduxjs/toolkit"

export const usersListSlice = createSlice({
  name: "usersInfo",
  initialState: {
    usersInfo: [],
  },
  reducers: {
    reducerUserInfo: (state: any, action: any) => {
      state.usersInfo = action.payload
    },
    reducerSearchUser: (state: any, action: any) => {
      state.usersInfo = action.payload
    },
  },
})

export const { reducerUserInfo, reducerSearchUser } = usersListSlice.actions

export default usersListSlice
