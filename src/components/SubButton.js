import React from 'react'

function SubButton(props) {
  return (
    <div style={{marginLeft:'5px',marginTop:'5px'}}>
        <button style={{fontSize:'10px',borderRadius:'25px',border:0,background:'#f2f3f4'}} disabled="disabled">{props.language}</button>
        <span style={{float:'right',fontSize:'12px'}}>{props.number}<span style={{fontSize:'10px',color:'grey',paddingLeft:'3px'}}>Problems Solved</span></span>
    </div>
  )
}

export default SubButton