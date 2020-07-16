import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class Berita extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

expot default Berita