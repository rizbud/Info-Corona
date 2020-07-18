import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, BackHandler } from "react-native";
import { WebView } from 'react-native-webview';

class Berita extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  backButton = () => {
    this.props.navigation.goBack()
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backButton)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButton)
  }

  render() {
    const {url} = this.props.route.params;
    return (
      <WebView
        source={{ uri: url }}
        renderLoading={
          <ActivityIndicator
            color="#000"
            size={40}
            style={{flex: 1, justifyContent: "center"}} />
        }  
      />
    )
  }
}

export default Berita
