import { useState } from "react"

function useInput(initialValue: string): {
  bind: {
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
  }
  value: string
  setInvalid: React.Dispatch<React.SetStateAction<boolean>>
  clear(): void
  isInvalid: boolean
} {
  const [value, setValue] = useState(initialValue)
  const [isInvalid, setInvalid] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalid(false)
    setValue(event.target.value.trimStart())
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim())
  }

  const bind = {
    value,
    onChange,
    onBlur,
  }

  const clear = () => setValue("")

  return { bind, value, setInvalid, clear, isInvalid }
}

export default useInput