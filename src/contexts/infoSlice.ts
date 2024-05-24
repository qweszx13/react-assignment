import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type GithubIssueInterface } from '../services/githubApi';

interface InfoState {
  value :GithubIssueInterface;
}

const initialState :InfoState = {
  value : [],
}

const infoSlice = createSlice({
  name: 'githubInfo',
  initialState,
  reducers:{
    setInfo: (state, action : PayloadAction<GithubIssueInterface>) => {
      state.value = action.payload
      console.log(state.value);
    }
  }
})

export const { setInfo } = infoSlice.actions;
export default infoSlice.reducer;