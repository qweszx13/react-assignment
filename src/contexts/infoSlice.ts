import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type GithubIssueInfoInterface } from '../services/githubApi';

interface InfoState {
  value :GithubIssueInfoInterface;
}

const initialState :InfoState = {
  value :{} as GithubIssueInfoInterface
}

const infoSlice = createSlice({
  name: 'githubInfo',
  initialState,
  reducers:{
    setInfo: (state, action : PayloadAction<GithubIssueInfoInterface>) => {
      state.value = action.payload
    }
  }
})

export const { setInfo } = infoSlice.actions;
export default infoSlice.reducer;