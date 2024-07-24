import React from 'react'

const ViewTemplate = ({templatePara}) => {
  return (
    <div>
     {templatePara.map((t,i)=>(
        <p key={i}>{t}</p>
     ))}
    </div>
  )
}

export default ViewTemplate
