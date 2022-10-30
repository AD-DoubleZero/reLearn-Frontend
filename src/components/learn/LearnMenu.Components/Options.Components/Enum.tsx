import React from 'react'

interface IEnumProps {
  children: any
}

const Enum = ({ children }: IEnumProps) => {
  return (
    <div className="cont max-w-4xl flex flex-wrap justify-center">
      {React.Children.map(children, (c) =>
        <div className="min-w-[25%] mt-2 flex justify-center">
          { c }
        </div>
      )}
    </div>
  )
}

export default Enum