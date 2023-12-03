/* eslint-disable no-unused-vars */
import { useState } from 'react'
import TodoApp from '../Component/TodoApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoApp />
    </>
  )
}

export default App
