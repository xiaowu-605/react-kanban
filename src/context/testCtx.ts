import { createContext, useContext } from 'react'

export const Ctx = createContext('')

export const TestProvider = Ctx.Provider

export const useTestCtx = () => useContext(Ctx)
