import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { CommitProps } from '@/types/index'
import { GetCommontList } from '@/api/commont'

export const fetchCommontList = createAsyncThunk(
  'commont/fetchList',
  async () => {
    const res: CommitProps[] = await GetCommontList()
    return res // 成功时的返回值自动进 action.payload
  },
)

const commentSlice = createSlice({
  name: 'commont',
  initialState: [] as CommitProps[],
  reducers: {
    addCommont(state, action: PayloadAction<CommitProps>) {
      state.push(action.payload)
    },
    delCommont(state, action: PayloadAction<number>) {
      return state.filter((item) => item.id !== action.payload)
    },
    setCommontList(state, action: PayloadAction<CommitProps[]>) {
      state = action.payload
    },
  },
  // 2. 异步结果在这里接收
  extraReducers: (builder) => {
    builder.addCase(fetchCommontList.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { addCommont, delCommont, setCommontList } = commentSlice.actions
export default commentSlice.reducer
