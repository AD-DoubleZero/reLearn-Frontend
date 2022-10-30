import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Context } from '../../../..'
import { ICollocation } from '../../../../utils/interfaces'

interface IPreparationCard {
  collocation: ICollocation
  idx: number
}

const PreparationCard = ({ collocation, idx }: IPreparationCard) => {

  const { decActiveIdx, incActiveIdx } = useContext(Context).learn

  return (
    <div className="w-full">
      {/* Left */}
      {
        idx !== 0 &&
        <div className="pb-6 flex justify-center">
          <FontAwesomeIcon
            onClick={decActiveIdx}
            className="h-8 w-8 cursor-pointer text-text"
            icon={faAngleUp}
          />
        </div>
      }

      {/* Form */}
      <div className="card">
        <div className="mb-2 pb-2 border-b border-b-divider">
          <h1 className="text-center text-2xl">{collocation.body}</h1>
        </div>
          <div className="mb-2 pb-2 border-b border-b-divider">
            <h1 className="text text-center">Значение:</h1>
            <p className="text text-2xl"> {collocation.meaning}</p>
          </div>

          {
            collocation.association &&
            <div className="mb-2 border-b border-b-divider">
            <h1 className="text text-center">Ассоциация:</h1>
            <p className="text text-2xl"> {collocation.association}</p>
          </div>
          }
      </div>

      {/* Right */}
      <div className="pt-6 flex justify-center">
        <FontAwesomeIcon
          onClick={incActiveIdx}
          className="h-8 w-8 cursor-pointer text-text"
          icon={faAngleDown}
        />
      </div>
    </div>
  )
}

export default PreparationCard