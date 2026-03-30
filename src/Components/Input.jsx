import React from 'react'
import { useId } from 'react'
import { forwardRef } from 'react'


const Input = forwardRef(function input({
   label,
   className = "",
   type = "text",
   ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && <label
        className=''
        htmlFor={id}>
        {label}
      </label>
      }
      <input
        type={type}
        className={ `${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input