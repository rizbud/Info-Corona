import React, {Component} from 'react';
import { 
  ScrollView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  RefreshControl,
  ActivityIndicator
} from "react-native";

const format = amount => {
  return Number(amount)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

class Lengkap extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dataProv: [],
      refreshing: true
    }
  }

  componentDidMount() {
    this._isMounted = true;

    //Fetch Data Provinsi
    fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
    .then((response) => response.json())
    .then((json) => {
      this.setState({dataProv: json.data})
    })
    .catch(err => {
      console.log(err)
      ToastAndroid.show('Gagal memuat', ToastAndroid.SHORT)
    })
    .finally(() => {
      this.setState({refreshing: false})
      ToastAndroid.show('#DiRumahAja', ToastAndroid.SHORT)
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.componentDidMount();
  }

  render() {

    const {dataProv} = this.state;
    let tampil
    if (this.state.refreshing) {
      tampil = <ActivityIndicator />
    } else {
      tampil = <View>
      {dataProv.slice(0,(dataProv.length-1)).map((item, index) => (
        <View key={index} style={styles.provinsi}>
          <Text style={styles.textProv}>{item.provinsi}</Text>
          <View style={{flexDirection: "row"}}>
          <View style={styles.aktif}>
            <Text style={styles.titleKasus}>Positif</Text>
            <Text style={styles.textKasus}>{format(item.kasusPosi != undefined ? item.kasusPosi : "")}</Text>
          </View>
          <View style={styles.sembuh}>
            <Text style={styles.titleKasus}>Sembuh</Text>
            <Text style={styles.textKasus}>{format(item.kasusSemb != undefined ? item.kasusSemb : "")}</Text>
          </View>
          <View style={styles.meningal}>
            <Text style={styles.titleKasus}>Meninggal</Text>
            <Text style={styles.textKasus}>{format(item.kasusMeni != undefined ? item.kasusMeni : "")}</Text>
          </View>
          </View>
        </View>
      ))}</View>
    }

    return (
      <>
        <StatusBar backgroundColor="#e6e6e6" barStyle="dark-content" />
        <ScrollView
          style={styles.main}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />}
          >
          {tampil}
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create ({
  main: {
    backgroundColor: "#e6e6e6",
    flex: 1
  },
  provinsi: {
    backgroundColor: "#fff",
    marginVertical: 5,
    paddingHorizontal: 25,
    paddingVertical: 5
  },
  textProv: {
    fontFamily: "IBM-Plex",
    fontSize: 12,
    marginBottom: 3
  },
  aktif: {
    backgroundColor: "#f5a623",
    marginRight: 10,
    flex: 1,
    padding: 5,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  sembuh: {
    backgroundColor: "#219653",
    flex: 1,
    marginRight: 10,
    padding: 5,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  meningal: {
    backgroundColor: "#f82649",
    flex: 1,
    padding: 5,
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  titleKasus: {
    color: "#fff",
    fontFamily: "IBM-Plex",
    fontSize: 11
  },
  textKasus: {
    color: "#fff",
    fontFamily: "IBM-Plex",
    fontSize: 15
  },
})

export default Lengkap