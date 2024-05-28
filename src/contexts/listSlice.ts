import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type GithubIssueInterface } from '../services/githubApi';

interface ListState {
  value :GithubIssueInterface;
}

const initialState :ListState = {
  value :[],
}

const listSlice = createSlice({
  name: 'githubList',
  initialState,
  reducers:{
    setList: (state, action : PayloadAction<GithubIssueInterface>) => {
      state.value = action.payload
      console.log(state.value);
    }
  }
})

export const { setList } = listSlice.actions;
export default listSlice.reducer;