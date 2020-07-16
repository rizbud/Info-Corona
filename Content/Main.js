import React, {Component} from "react";
import{
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl
} from "react-native";

const format = amount => {
  return Number(amount)
      .toFixed()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

class Main extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      dataIdn: {},
      dataGlobal: {},
      refreshing: true,
      news: []
    }
  }

  componentDidMount() {
    this._isMounted = true;
    
    //Indonesia
    fetch('https://indonesia-covid-19.mathdro.id/api')
    .then((response) => response.json())
    .then((json) => {
      this.setState({dataIdn: json})
    })
    .catch(err => {
      console.log(err)
    })

    //Global
    fetch('https://covid-19.mathdro.id/api')
    .then((response) => response.json())
    .then((json) => {
      this.setState({dataGlobal: json})
    })
    .catch(err => {
      console.log(err)
    })
    
    //News
    fetch('https://dekontaminasi.com/api/id/covid19/news')
    .then((response) => response.json())
    .then((json) => {
      this.setState({news: json})
    })
    .catch(err => {
      console.log(err)
      ToastAndroid.show('Gagal memuat', ToastAndroid.SHORT)
    })
    .finally(() => {
      this.setState({refreshing: false})
      ToastAndroid.show('Terakhir Update: Baru saja', ToastAndroid.SHORT)
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _onRefresh= () => {
    this.setState({refreshing: true});
    this.componentDidMount();
  }

  render () {
    const {dataIdn, dataGlobal, news} = this.state
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
          <View>
            <Image
              source={require('./image/cover.png')}
              style={{
                width: "100%",
                height: 175,
                resizeMode: 'stretch'
                }} />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>COVID-19 di Indonesia</Text>
            <View style={styles.stats}>
              <View style={styles.aktif}>
                <Text style={styles.titleKasus}>Kasus Aktif</Text>
                <Text style={styles.textKasus}>{format(dataIdn.perawatan != undefined ? dataIdn.perawatan : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
              <View style={styles.sembuh}>
                <Text style={styles.titleKasus}>Sembuh</Text>
                <Text style={styles.textKasus}>{format(dataIdn.sembuh != undefined ? dataIdn.sembuh : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
            </View>
            <View style={styles.stats}>
              <View style={styles.meningal}>
                <Text style={styles.titleKasus}>Meninggal</Text>
                <Text style={styles.textKasus}>{format(dataIdn.meninggal != undefined ? dataIdn.meninggal : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
              <View style={styles.total}>
                <Text style={styles.titleKasus}>Total Kasus</Text>
                <Text style={styles.textKasus}>{format(dataIdn.jumlahKasus != undefined ? dataIdn.jumlahKasus : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Lengkap')}>
              <Text style={styles.detailText}>Selengkapnya ></Text>
            </TouchableOpacity>
          </View>
          
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>COVID-19 di Dunia</Text>
            <View style={styles.stats}>
              <View style={styles.total}>
                <Text style={styles.titleKasus}>Total Kasus</Text>
                <Text style={styles.textKasus}>{format(dataGlobal.confirmed != undefined ? dataGlobal.confirmed.value : "")} Orang</Text>
              </View>
            </View>
            <View style={styles.stats}>
              <View style={styles.meningal}>
                <Text style={styles.titleKasus}>Meninggal</Text>
                <Text style={styles.textKasus}>{format(dataGlobal.deaths != undefined ? dataGlobal.deaths.value : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
            <View style={styles.sembuh}>
                <Text style={styles.titleKasus}>Sembuh</Text>
                <Text style={styles.textKasus}>{format(dataGlobal.recovered != undefined ? dataGlobal.recovered.value : "")}</Text>
                <Text style={styles.titleKasus}>Orang</Text>
              </View>
            </View>
          </View>
          
          <View style={{marginTop: 10}}>
            <Text style={styles.title}>Berita Terbaru</Text>
            {news.slice(0,19).map((item,index) => (
              <TouchableOpacity key={index} style={styles.berita} onPress={() => ToastAndroid.show(item.url, ToastAndroid.SHORT)}>
                <Text style={styles.textBerita}>{item.title}</Text>
                <View style={styles.bacaBerita}>
                  <Text style={{color:"#3389fe", fontFamily: "IBM-Thin"}}>Baca...</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#e6e6e6",
    flex: 1
  },
  title: {
    fontFamily: "IBM-Plex",
    marginHorizontal: 15,
    borderBottomWidth: 0.6
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 5,
    padding: 5
  },
  aktif: {
    backgroundColor: "#d43f8d",
    marginRight: 10,
    flex: 1,
    padding: 10,
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
    padding: 10,
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
    marginRight: 10,
    flex: 1,
    padding: 10,
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
  total: {
    backgroundColor: "#f5a623",
    flex: 1,
    padding: 10,
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
    fontSize: 12
  },
  textKasus: {
    color: "#fff",
    fontFamily: "IBM-Plex",
    fontSize: 18
  },
  detailText: {
    fontFamily: "IBM-Plex",
    fontSize: 13,
    alignSelf: "flex-end",
    marginRight: 15,
    color: "#3389fe"
  },
  berita: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: "row"
  },
  textBerita: {
    fontFamily: "IBM-Thin",
    fontSize: 13,
    flex: 1
  },
  bacaBerita: {
    marginLeft: 5,
    fontSize: 13,
    alignContent: 'flex-end',
    justifyContent: "flex-end"
  }
})

export default Main