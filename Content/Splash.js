import React, {Component} from "react";
import{
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";

const w = Dimensions.get('screen').width;

import styles from './styles/splashStyle'

class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  timeConsuming = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }

  async componentDidMount() {
    const time = await this.timeConsuming()
    if(time !== null) {
      this.props.navigation.navigate('Home')
    }
  }


  render() {
    return (
      <>
        <StatusBar backgroundColor="#dbecff" barStyle="dark-content" />
        <View style={styles.splash}>
          <Image source={require('./image/splashs.jpg')} style={styles.image} />
          <Text style={styles.text}>Made with ♥ by @rizbud</Text>
        </View>
      </>
    )
  }
}

export default Splash