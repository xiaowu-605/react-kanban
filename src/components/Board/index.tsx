import { useKanban } from '@/stores/useKanban'
import { Task } from '@/components/Board/Task'
import { DndContext } from '@dnd-kit/core'
export const Board = () => {
  const { boards, createBooard } = useKanban()
  return (
    <DndContext>
      <div className="flex flex-row">
        {boards.map((board) => (
          <div
            key={board.id}
            className="flex flex-row "
          >
            <div className="kanban-group mr-1 w-[260px] rounded-1xl bg-blue-100 p-2">
              <div className="flex flex-col">
                <div className="rounded-full bg-blue-200 px-1 w-fit mb-2">
                  未开始
                </div>
                <div>
                  {[0, 1, 2].map((item) => (
                    <Task
                      key={item}
                      title={`任务${item}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  )
}
