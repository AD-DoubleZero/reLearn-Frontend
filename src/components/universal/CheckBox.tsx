import React from 'react'

interface ICheckBox {
  label?: string
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  id: string
}

const CheckBox = (
  {
    label, checked, onChange, id
  } : ICheckBox
) => {
  return (
    <div className="min-h-5 mt-2">
      {/* see .checkbox in index.css */}
      <div className="checkbox flex">
        <input
          tabIndex={-1}
          type="checkbox"
          id={id}
          onChange={onChange}
          checked={checked}
        />
        <label
          className="text"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default CheckBox