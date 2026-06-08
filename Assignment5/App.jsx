import { useState } from 'react'
import TodoApp from './components/TodoApp'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoApp />
    </>
  )
}

export default App
