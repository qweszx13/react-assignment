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
      console.log("*set Repo* => org set =",state.org,"/repo set = ",state.repo,"/page set = ",state.page);
    },
    setPageParameter: (state, action : PayloadAction<number>) => {
      state.page = action.payload;
      console.log("*set Page* => org set =",state.org,"/repo set = ",state.repo,"/page set = ",state.page);
    }
  }
})

export const { setRepoParameter,setPageParameter } = apiParameterSlice.actions;
export default apiParameterSlice.reducer;