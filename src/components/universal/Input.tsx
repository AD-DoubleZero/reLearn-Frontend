import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext } from 'react'
import { Context } from '../..'

interface IInputProps {
  ref?: React.ForwardedRef<HTMLInputElement>
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  isInvalid?: boolean
  placeholder?: string
  className?: string
  type?: React.HTMLInputTypeAttribute
  errorText?: string
  hintText?: string
  autoComplete?: boolean
  searchBar?: boolean
}

const Input = observer(React.forwardRef((
  {
    ref,value,onChange,onBlur,isInvalid,placeholder,className,
    type,errorText,hintText,autoComplete,searchBar,
  } : IInputProps
) => {
  const { dictionary } = useContext(Context)
  const { setIsPropsHaveBeenChanged } = dictionary

  const onChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    searchBar && setIsPropsHaveBeenChanged(true)

    onChange && onChange(event)
  }, [onChange, searchBar, setIsPropsHaveBeenChanged])

  const onBlurHandler = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event)
  }, [onBlur])

  return (
    <span
      className={hintText ? "block w-full hint--bottom hint--large" : "block w-full"}
      data-hint={hintText}
    >
      <div className="group">
        <input
          placeholder={placeholder}
          className={"input " + className}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          autoComplete={autoComplete ? "on" : "off"}
          ref={ref}
        />
        {
          isInvalid &&
          <p className="text-error mt-1 px-2">
            {errorText}
          </p>
        }
      </div>
    </span>
  )
}))

export default Input