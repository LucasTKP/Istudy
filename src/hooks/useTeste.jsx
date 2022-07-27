import React from 'react'

function useTeste() {
    const HelloWorld = React.useCallback((message) => {
        console.log(message)
    })

  return {
    HelloWorld
  }
}

export default useTeste