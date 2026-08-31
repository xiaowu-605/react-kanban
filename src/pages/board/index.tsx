import { Button } from '@/components/ui/button'
import { Board } from '@/components/Board/index'
import { useKanban } from '@/stores/useKanban'

export const BoardPage = () => {
  const { boards, createBooard } = useKanban()
  return (
    <div className="pt-20 pl-20">
      <Board />
      <Button
        onClick={() => createBooard({ id: `${boards.length}`, name: '看板' })}
      >
        新增
      </Button>
    </div>
  )
}
