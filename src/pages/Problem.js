import React from 'react'
import './Problem.css'
import ProblemComponent from '../components/ProblemComponent'
import IDEComponent from '../components/IDEComponent'

function Problem() {
  return (
    <div className='main-problem' >
        <ProblemComponent/>
        <IDEComponent/>
        </div>
  )
}

export default Problem