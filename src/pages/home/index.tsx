import { useState, useRef, createContext } from 'react'
import { Commont } from '@/components/Commont/Commont'
import { Test } from '@/components/test'
import { Ctx, TestProvider } from '@/context/testCtx'

export const Home = () => {
  const [title, setTitle] = useState('这是父组件传来的title')
  const getTitle = (title: string) => {
    console.log('title--', title)
    setTitle(title)
  }
  const testValue = '这是父组件传递给孙子组件的信息'
  return (
    <div className="p-20">
      <Commont />
      <TestProvider value={testValue}>
        <Test
          title={title}
          onGetTitle={getTitle}
        >
          <span>这是父组件的span</span>
        </Test>
      </TestProvider>
    </div>
  )
}
