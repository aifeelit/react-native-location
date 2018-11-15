import React from 'react';
import {
  Linking,
  NativeEventEmitter,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import RNLocation from 'react-native-location'
import moment from 'moment'

const RNLocationEmitter = new NativeEventEmitter(RNLocation);

const repoUrl = 'https://github.com/timfpark/react-native-location'

export default class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      location: null
    }
  }

  componentWillMount() {
    RNLocation.requestAlwaysAuthorization()
    RNLocation.setDistanceFilter(5.0)
    RNLocationEmitter.addListener('locationUpdated', location => {
      this.setState({ location })
    })

    this._startUpdatingLocation();
  }

  _startUpdatingLocation = () => {
    RNLocation.startUpdatingLocation()
  }

  _stopUpdatingLocation = () => {
    RNLocation.stopUpdatingLocation()
    this.setState({ location: null })
  }

  _openRepoUrl = () => {
    Linking.openURL(repoUrl)
      .catch(err => console.error('An error occurred', err));
  }

  render() {
    const { location } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={{alignItems:'center',marginTop:30}}>
            <Text style={styles.title}>
              react-native-location
            </Text>
            <TouchableHighlight onPress={this._openRepoUrl} underlayColor='#CCC' activeOpacity={0.8}>
              <Text style={styles.repoLink}>
                {repoUrl}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.row}>
            <TouchableHighlight onPress={this._startUpdatingLocation} style={[styles.button, { backgroundColor:'#126312' }]}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={this._stopUpdatingLocation} style={[styles.button, { backgroundColor:'#881717' }]}>
                <Text style={styles.buttonText}>Stop</Text>
            </TouchableHighlight>
          </View>

          {location && (
            <React.Fragment>
              <View style={styles.row}>
                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>
                    Course
                  </Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.coords.course}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>
                    Speed
                  </Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.coords.speed}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>
                    Altitude
                  </Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.coords.altitude}
                  </Text>
                </View>
              </View>

              <View style={{alignItems:'flex-start'}}>
                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Latitude
                    </Text>
                    <Text style={styles.detail}>
                      {location.coords.latitude}
                    </Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Longitude
                    </Text>
                    <Text style={styles.detail}>
                      {location.coords.longitude}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Accuracy
                    </Text>
                    <Text style={styles.detail}>
                      {location.coords.accuracy}
                    </Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Altitude Accuracy
                    </Text>
                    <Text style={styles.detail}>
                      {location.coords.altitudeAccuracy}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Timestamp
                    </Text>
                    <Text style={styles.detail}>
                      {location.timestamp}
                    </Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>
                      Date / Time
                    </Text>
                    <Text style={styles.detail}>
                      {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.full]}>
                    <Text style={styles.json}>
                      {JSON.stringify(location)}
                    </Text>
                  </View>
                </View>
              </View>
            </React.Fragment>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
  },
  innerContainer: {
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  repoLink: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0000CC',
    textDecorationLine:'underline',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  detailBox: {
    padding: 15,
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF'
  },
  valueTitle: {
    fontFamily: 'Futura',
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  largeDetail: {
    fontSize: 20,
  },
  json: {
    fontSize: 12,
    fontFamily: 'Courier',
    textAlign: 'center',
    fontWeight:'bold'
  },
  full: {
    width: "100%",
  },
  half: {
    width: "50%",
  },
  third: {
    width: "33%",
  },
});
