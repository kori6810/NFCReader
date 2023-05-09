import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import NfcModal from './src/NfcModal';
import {goToNfcSetting, init, isEnabled, readTag} from './src/NfcProxy';
// import NfcProxy from './src/NfcProxy'
// Pre-step, call this before any NFC operations
NfcManager.start();

function App() {
  const [visible, setVisible] = React.useState(false);
  const [enabled, setEnabled] = React.useState<any>(null);
  // const [supported, setSupported] = React.useState<any>(null);

  useEffect(() => {
    async function initNFC() {
      try {
        // setSupported(await init());
        setEnabled(await isEnabled());
      } catch (ex) {
        console.warn(ex);
        Alert.alert('ERROR', 'fail to init NFC', [{text: 'OK'}]);
      }

      initNFC();
    }
    
  },[]);
  //reading NFC and showing value
  const onPress = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log('started working');
        setVisible(true);
      }
      const tag = await readTag();
      if (tag) {
        // setVisible(false);
        console.info('TagDetail: ', {tag});
      }
    } catch (ex) {
      throw ex;
    } finally {
      if (Platform.OS === 'android') {
        setTimeout(() => {
          setVisible(false);
        }, 800);
      }
    }
  };

  //if NFC is not Enabled
  function renderNfcNotEnabled() {
    return (
      <View
        style={{
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          // width,
        }}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Your NFC is not enabled. Please first enable it and hit CHECK AGAIN
          button
        </Text>

        <Pressable onPress={() => goToNfcSetting()} style={{marginBottom: 10}}>
          <Text>GO TO NFC SETTINGS</Text>
        </Pressable>

        <Pressable
          // mode="outlined"
          onPress={async () => {
            setEnabled(await isEnabled());
          }}>
          <Text>CHECK AGAIN</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <NfcModal visible={visible} setVisible={setVisible} />
      {!enabled && renderNfcNotEnabled()}
      {enabled && (
        <Pressable
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
            marginBottom: 10,
            padding: 10,
          }}
          // mode="contained"
          onPress={onPress}>
          <Text style={{color: 'white'}}>READ TAGs</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
