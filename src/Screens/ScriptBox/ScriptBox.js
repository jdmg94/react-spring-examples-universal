import React from 'react'
import { View } from 'react-native'
import { animated, useSpring } from 'react-spring'

const AnimatedView = animated(View)
const ScriptBox = () => {
  const animation = useSpring({
    from: { top: '50%', left: '0%', width: '0%', height: '0%', backgroundColor: 'lightgreen', position: 'relative' },
    to: async next => {
      while (1) {
        await next({ width: '80%', height: '80%', top: '10%', left: '10%', backgroundColor: 'lightblue' })
        await next({ top: '0%', left: '50%', height: '40%', width: '50%', backgroundColor: 'lightgreen' })        
        await next({ top: '0%', height: '100%', backgroundColor: 'lightgoldenrodyellow' })
        await next({ top: '60%', height: '40%', backgroundColor: 'lightpink' })
        await next({ width: '100%', left: '0%', backgroundColor: 'lightsalmon' })
        await next({ width: '50%', backgroundColor: 'lightcoral' })
        await next({ top: '0%', height: '100%', backgroundColor: 'lightseagreen' })
        await next({ height: '40%', backgroundColor: 'lightskyblue' })
        await next({ left: '0%', top: '0%', width: '100%', height: '100%', backgroundColor: 'lightslategrey' })
      }
    },
  })

  return <AnimatedView style={animation} />
}

export default ScriptBox
