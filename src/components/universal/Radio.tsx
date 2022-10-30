import React from 'react'

interface ISwitchRadio {
  label?: string
  checked?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name: string
  id: string
}

const Radio = ({
  label,checked, onChange,
  name, id,
}: ISwitchRadio) => {
  return (
    <div className="min-h-5 mt-2">
      {/* see .checkbox in index.css */}
      <div className="radio flex h-5">
        <input
          name={name}
          tabIndex={-1}
          type="radio"
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

export default Radio