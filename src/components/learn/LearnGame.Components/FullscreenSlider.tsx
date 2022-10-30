import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../..'
import FullscreenSliderItem from './FullscreenSlider_item'

interface ICollocationEditForm {
  children: any
}

const FullscreenSlider = observer(({ children }: ICollocationEditForm) => {
  const { setSlidersCount } = useContext(Context).learn

  useEffect(() => {
    setSlidersCount(React.Children.count(children))
  }, [setSlidersCount, children])

  return (
    <div className="overflow-hidden relative h-screen">
      {
        React.Children.map(children, (c, i) => 
          <React.Fragment key={i + "_screen"}>
            <FullscreenSliderItem index={i}>
              {c}
            </FullscreenSliderItem>
          </React.Fragment>
        )
      }
    </div>
  )
})

export default FullscreenSlider