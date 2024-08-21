import React, { createContext, useState } from 'react'

export const addProjectResponseContext = createContext()
function ContextShare({children}) {

    const [addprojectResponse,setAddProjectResponse]=useState([])

  return (
    <>
    <addProjectResponseContext.Provider value={{addprojectResponse,setAddProjectResponse}}>
        {children}
    </addProjectResponseContext.Provider>
    
    </>
  )
}

export default ContextShare