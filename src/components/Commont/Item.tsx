import type { CommitProps } from '@/types/index'
interface ItemProps {
  item: CommitProps
  onDel: (id: number) => void
}

export const Item = ({ item, onDel }: ItemProps) => {
  return (
    <div className="mt-5">
      <div className="text-gray-400">{item.name}</div>
      <div className="my-3 text-lg">{item.content}</div>
      <div className="text-gray-400">
        <span>{item.createAt}</span>
        <span className="mx-8">点赞数:{item.likeNum}</span>
        <span
          onClick={() => onDel(item.id)}
          className="cursor-pointer hover:text-blue-400"
        >
          删除
        </span>
      </div>
    </div>
  )
}
