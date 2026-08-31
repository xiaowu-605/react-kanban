import { useRef } from 'react'
import { ChildTest } from './childTest'

type TestProps = {
  title: string
  children?: any
  onGetTitle: (title: string) => void
}

export const Test = (props: TestProps) => {
  const { title, children, onGetTitle } = props
  const divRef = useRef<HTMLDivElement>(null)
  const getDom = () => {
    console.log('divRef--', divRef.current)
    onGetTitle('传递给父组件的值')
  }
  return (
    <div className="mt-10">
      <div ref={divRef}>div--{title}</div>
      <div>{children}</div>
      <ChildTest />
      <button
        onClick={getDom}
        className="h-[54px] w-[100px] ml-2 bg-blue-400 rounded-md text-white cursor-pointer hover:bg-blue-300"
      >
        获取dom
      </button>
    </div>
  )
}
