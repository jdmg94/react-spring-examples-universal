import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const eightyPercent = () => {
  const { width } = Dimensions.get('window')

  return width * 0.8
}

const Box = styled.View`
  margin: 10px auto;
  height: 100px;
  width: ${eightyPercent()}px;
  background-color: #000;
`

export default Box