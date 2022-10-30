import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../../../..'
import ResultItem from './ResultItem'

const ResultCollocationsStats = observer(() => {
  const { learnedCollocations } = useContext(Context).learn

  return (
    <div>
      <ol>
        {
          learnedCollocations.map((c, idx) => 
            <React.Fragment key={idx}>
              <ResultItem collocation={c} idx={idx} />
            </React.Fragment>
          )
        }

      </ol>
    </div>
  )
})

export default ResultCollocationsStats