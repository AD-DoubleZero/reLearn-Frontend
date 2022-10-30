import React, { useCallback, useEffect, useState } from 'react'
import symbols from '../../utils/symbols'
import DropDownBlock from './DropDownBlock'
import Input from './Input'

interface ITranscriptionInputProps {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  placeholder?: string
  className?: string
  hintText?: string
}

const TranscriptionInput = ({
  value, onChange, onBlur, placeholder,
  className, hintText,
}: ITranscriptionInputProps) => {
  const [selectedList, setSelectedList] = useState(0)
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const inputRef = React.createRef<HTMLInputElement>()

  useEffect(() => {
    const values = symbols[selectedList].values
    setSelectedValues(values)
  }, [selectedList, setSelectedValues])

  const selectedListHandler = useCallback((event: React.FormEvent<HTMLSelectElement>) => {
		setSelectedList(+(event.target as HTMLSelectElement).value)
	}, [setSelectedList])

  const pushInputValue = useCallback((idx: number) => {
    const value = selectedValues[idx];

    (inputRef.current as HTMLInputElement).focus();
    (inputRef.current as HTMLInputElement).value += value
  }, [inputRef, selectedValues])

  return (
    <div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={className}
        hintText={hintText}
        ref={inputRef}
      />
      <DropDownBlock title="Специальные символы:">
        <div className="m-1 rounded bg-transparent border border-divider">
          <div className="p-2 border-b border-b-divider">
            <select
              className="select"
              value={selectedList}
              onChange={selectedListHandler}
            >
              {
                symbols.map((s, idx) =>
                  <option key={idx + "_option"} value={idx}>{ s.title }</option>
                )
              }
            </select>
          </div>

          <div className="flex flex-wrap p-2">
            {
              selectedValues.map((v, idx) =>
                <div
                  key={idx + "_value"}
                  onClick={() => pushInputValue(idx)}
                  className="text text-base w-6 h-6 flex items-center justify-center cursor-pointer rounded bg-transparent border border-secondary"
                >
                  { v }
                </div>
              )
            }
          </div>
        </div>
      </DropDownBlock>
    </div>
  )
}

export default TranscriptionInput