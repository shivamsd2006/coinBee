import React from 'react'
import Report from '../Report/Report.jsx'
import Income from '../Income/Income.jsx'
import Goals from '../Goals/Goals.jsx'
import Budget from '../Budget/Budget.jsx'

const Sidebar = () => {
  return (
    <div>
      <Report/>
      <Income/>
      <Goals/>
      <Budget/>
    </div>
  )
}

export default Sidebar
