import '@expo/match-media'
import { Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { DeviceMotion } from 'expo-sensors'

export const percent = percentage => value => value * (percentage / 100)
export const useMedia = (queries, values, defaultValue) => {
  const { width } = Dimensions.get('window')
  const match = () => values[queries.findIndex(query => matchMedia(query).matches)] || defaultValue
  const [value, set] = useState(match)

  useEffect(() => {
    set(match())
  }, [width])

  return value
}

export const useDeviceMotion = () => {
  const [motionInfo, set] = useState({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    DeviceMotion.setUpdateInterval(500)
    const subscription = DeviceMotion.addListener(rotation => set(rotation))
    return () => DeviceMotion.removeSubscription(subscription)
  }, [])

  return motionInfo
}
