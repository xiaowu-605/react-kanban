import { useTestCtx } from '@/context/testCtx'

export const ChildTest = () => {
  const msg = useTestCtx()
  return <div>{msg}</div>
}
