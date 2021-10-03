import Reactotron from 'reactotron-react-native'

const reactotron = Reactotron
  .configure({ 
    name: 'Info Corona', 
    host: '192.168.1.198' 
  }).useReactNative()

  if (reactotron) {
    reactotron.connect()
    reactotron.clear()
  }
export default reactotron
console.tron = reactotron