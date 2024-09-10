import React, { useState } from 'react'

const Hook = () => {
  const [count, setCount] = useState(0);

  const inc = () => {
    setCount(count + 1)
  }

  const dec = () => {
    setCount(count - 1)
  }
  return (
    <div>
      <div>{count}</div>
      <button
        onClick={inc}
        className='border bg-black text-white py-2 px-5'>Increase</button>
      <div>
        <button
          onClick={dec}
          className='border bg-black text-white py-2 px-5'>Decrease</button>
      </div>

    </div>
  )
}

export default Hook
