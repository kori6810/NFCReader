import {Platform, Alert} from 'react-native';
import NfcManager, {
  NfcTech,
  Ndef,
  NfcEvents,
  NfcError,
} from 'react-native-nfc-manager';
import { getOutlet } from 'reconnect.js';



const init = async()=>{
    const supported = await NfcManager.isSupported();
    if (supported) {
      await NfcManager.start();
    }
    return supported;
}
const isEnabled = async()=>{
    return NfcManager.isEnabled();
}

const goToNfcSetting = async()=>{
    return NfcManager.goToNfcSetting()
}
 const readTag = async () => {
    let tag = null;

    try {
      await NfcManager.requestTechnology([NfcTech.Ndef]);

      tag = await NfcManager.getTag();
      // tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();

      if (Platform.OS === 'ios') {
        await NfcManager.setAlertMessageIOS('Success');
      }
    } catch (ex) {
      // for tag reading, we don't actually need to show any error
      console.log(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return tag;
  };
// class NfcProxy {
//   static readTag: any;
//     async isEnabled() {
//         return NfcManager.isEnabled();
//       }
    
//       async goToNfcSetting() {
//         return NfcManager.goToNfcSetting();
//       }

//     readTag = withAndroidPrompt(async () => {
//       let tag = null;
  
//       try {
//         await NfcManager.requestTechnology([NfcTech.Ndef]);
  
//         tag = await NfcManager.getTag();
//         // tag.ndefStatus = await NfcManager.ndefHandler.getNdefStatus();
  
//         if (Platform.OS === 'ios') {
//           await NfcManager.setAlertMessageIOS('Success');
//         }
//       } catch (ex) {
//         // for tag reading, we don't actually need to show any error
//         console.log(ex);
//       } finally {
//         NfcManager.cancelTechnologyRequest();
//       }
  
//       return tag;
//     });
  
    
 
//  

export  {readTag,isEnabled, goToNfcSetting, init}