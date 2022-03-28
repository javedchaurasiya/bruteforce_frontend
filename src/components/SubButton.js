import React from 'react'

function SubButton(props) {
  return (
    <div style={{marginLeft:'5px',marginTop:'5px'}}>
        <button style={{fontSize:'10px',borderRadius:'25px',border:0,background:'#e5e6e7',color:'#9e9e9e'}} disabled="disabled">{props.language}</button>
        <span style={{float:'right',fontSize:'12px'}}>{props.number}<span style={{fontSize:'10px',color:'#9e9e9e',paddingLeft:'3px'}}>Problems Submitted</span></span>
    </div>
  )
}

export default SubButton