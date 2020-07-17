import React, { Component } from 'react';
import { ScrollView, RefreshControl } from "react-native";
import { WebView } from 'react-native-webview';


function Berita({route, navigation}) {
  const {url} = route.params;
  
  return (
    <WebView source={{ uri: url }} />
  );
}

export default Berita
