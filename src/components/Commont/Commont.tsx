import { useState, useRef, useEffect } from 'react'
import cn from 'classnames'
import { GetCommontList } from '@/api/commont'
import type { CommitProps } from '@/types/index'
import { Item } from '@/components/Commont/Item'
import { useDispatch, useSelector } from 'react-redux'
import { addCommont, delCommont, fetchCommontList } from '@/stores/commentSlice'
import type { RootState, AppDispatch } from '@/stores'

export const Commont = () => {
  const list = useSelector((state: RootState) => state.commont)
  const dispatch = useDispatch<AppDispatch>()

  const [commitList, setCommitList] = useState<CommitProps[]>([])
  const [inputVal, setInputVal] = useState('')
  const [sortType, setSortType] = useState(0)
  const [lastType, setLastType] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  // 获取评论数据
  const getCommontList = async () => {
    const res: CommitProps[] = await GetCommontList()
    setCommitList(res)
  }
  useEffect(() => {
    // getCommontList()
    dispatch(fetchCommontList())
  }, [dispatch])
  // 排序
  const handleSort = (type: number) => {
    if (lastType === type) {
      setSortType(0)
      setLastType(0)
      return
    }
    setSortType(type)
    setLastType(type)
  }
  // 发表评论
  const commit = () => {
    if (!inputVal.trim()) {
      alert('请先输入评论')
      return
    }
    dispatch(
      addCommont({
        id: list.length,
        name: 'Jack' + list.length,
        content: inputVal,
        createAt: new Date().toISOString(),
        likeNum: 0,
      }),
    )
    // setCommitList((pre) => [
    //   ...pre,
    //   {
    //     id: pre.length,
    //     name: 'Jack' + pre.length,
    //     content: inputVal,
    //     createAt: new Date().toISOString(),
    //     likeNum: 0,
    //   },
    // ])
    setInputVal('')
    inputRef.current?.focus()
  }
  // 删除评论
  const handleDel = (id: number) => {
    // setCommitList(commitList.filter((item) => item.id !== id))
    dispatch(delCommont(id))
  }
  return (
    <div className="pt-10 pl-20">
      {/* title */}
      <div className="flex items-center">
        <div>
          <span className="text-2xl mr-2">评论</span>
          {commitList.length}
        </div>
        <div className="ml-10">
          <span
            onClick={() => handleSort(1)}
            className={cn('cursor-pointer hover:text-blue-400', {
              'text-blue-500': sortType === 1,
              'text-gray-400': sortType !== 1,
            })}
          >
            最新
          </span>
          <span className="mx-3">|</span>
          <span
            onClick={() => handleSort(2)}
            className={cn('cursor-pointer hover:text-blue-400', {
              'text-blue-500': sortType === 2,
              'text-gray-400': sortType !== 2,
            })}
          >
            最热
          </span>
        </div>
      </div>
      {/* 输入框等 */}
      <div className="flex items-center my-10">
        {/* 头像 */}
        <div className="w-[64px] h-[64px] flex items-center justify-center rounded-full border">
          头像
        </div>
        {/* 输入框 */}
        <div className="flex items-center ml-2">
          <input
            className="h-[54px] w-[500px] rounded-md transition-colors outline-hidden pl-1 border  focus:border-blue-500"
            type="text"
            placeholder="发一条友善的评论..."
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button
            onClick={commit}
            className="h-[54px] w-[100px] ml-2 bg-blue-400 rounded-md text-white cursor-pointer hover:bg-blue-300"
          >
            发表
          </button>
        </div>
      </div>
      {/* 评论列表 */}
      {!commitList.length ? (
        <span className="text-gray-400">暂无评论</span>
      ) : (
        <div>
          {commitList.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDel={handleDel}
            />
          ))}
        </div>
      )}
    </div>
  )
}
