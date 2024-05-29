import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiParmeterState {
  org :string,
  repo :string,
  page :number
}

const initialState :ApiParmeterState = {
  org :"facebook",
  repo :"react",
  page :1
}

const apiParameterSlice = createSlice({
  name: 'apiParameter',
  initialState,
  reducers:{
    setRepoParameter: (state, action : PayloadAction<{org :string,repo :string}>) => {
      state.org = action.payload.org;
      state.repo = action.payload.repo;
    },
    setPageParameter: (state, action : PayloadAction<number>) => {
      state.page = action.payload;
    }
  }
})

export const { setRepoParameter,setPageParameter } = apiParameterSlice.actions;
export default apiParameterSlice.reducer;