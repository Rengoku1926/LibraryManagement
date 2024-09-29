import { useState } from 'react'

import './App.css'
import AddUser from './Components/User/AddUser'
import GetAllUsers from './Components/User/GetAllUsers'
import UserDashboard from './Components/User/UserDashboard'
import MainDashboard from './Components/Dashboard/MainDashboard'
import AddBook from './Components/Book/AddBook'
import IssueBook from './Components/Transaction/IssueBook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MainDashboard/>
    </div>
  )
}

export default App
