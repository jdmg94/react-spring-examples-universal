import { useState, useEffect } from 'react'
import { useDeviceMotion } from '../../utils'

const useRotation = () => {
  const [result, set] = useState({ translateX: 0, translateY: 0 })
  const { rotation, acceleration } = useDeviceMotion()

  useEffect(() => {
    if(rotation && acceleration){
      const { x, y } = acceleration
      const { alpha, beta } = rotation
      
      set({  
        translateX: 10 + (x * beta) * -200,
        translateY: 10 + (y * alpha) * 200,
      })
    }
  }, [rotation, acceleration])

  return result
}

export default useRotation
