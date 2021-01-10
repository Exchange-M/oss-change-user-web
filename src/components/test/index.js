import React, {useState} from 'react'

function Test() {
  let [number, setNumber] = useState(0)

  return (
    <div>
      <button onClick={() => setNumber(number+1)}>
        증가
      </button>
      <button onClick={() => setNumber(number-1)}>
        감속
      </button>

      <span>{number}</span>
    </div>
    
  )
}

export default Test