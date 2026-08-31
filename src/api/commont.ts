import { get, post } from './request'
import type { CommitProps } from '@/types/index'

export const GetCommontList = () => get<CommitProps[]>(`/list/`)
