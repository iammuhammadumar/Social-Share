/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  StatusBar,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import Marker from 'react-native-image-marker';
import Share from 'react-native-share';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () =>{
  const [value, onChangeText] = useState('');
  const [shareImage, setShareImage] = useState('');

 const instagramShareDialog = () => {    
   if( Platform.OS === 'ios') {
    const shareOptions = {
      method: Share.InstagramStories.SHARE_STICKER_IMAGE,
      stickerImage: shareImage, //or you can use "data:" link
      backgroundBottomColor: '#fefefe',
      backgroundTopColor: '#ffffff',
      // attributionURL: , //in beta
      social: Share.Social.INSTAGRAM_STORIES
    };
      Share.shareSingle(shareOptions);
   } else {
    const shareOptions = {
      title: 'Share via',
      message: `Check out This with me on ${moment(new Date()).format('MMMM Do, h:mm a')}`,
      url: shareImage,
      social: Share.Social.INSTAGRAM,
    };
    Share.shareSingle(shareOptions);
   }
  }

  const shareImageText = (text)=>{
    onChangeText(text);
    Marker.markText({
      src:  'https://i.picsum.photos/id/100/2500/1656.jpg?hmac=gWyN-7ZB32rkAjMhKXQgdHOIBRHyTSgzuOK6U0vXb1w',
      text: `${value} There. Please Check this.\nplaygroundapp.com`, 
      position : 'bottomLeft',
      X: 100,
      Y: 100, 
      color: '#000000',
      fontName: 'Arial-BoldItalicMT',
      fontSize: 60,
      textBackgroundStyle: {
          type: 'stretchX',
          paddingX: 20,
          paddingY: 20,
          color: '#fcfcfc'
      },
      scale: 1, 
      quality: 100
  }).then((path) => {
   
    setShareImage( Platform.OS === 'android' ? 'file://' + path : path );
    }).catch((err) => {
        console.log(err)
        this.setState({
            loading: false,
            err
        })
    });
  }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
          flex:1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: Colors.lighter,
          marginTop:40
        }}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: shareImage|| 'https://i.picsum.photos/id/100/2500/1656.jpg?hmac=gWyN-7ZB32rkAjMhKXQgdHOIBRHyTSgzuOK6U0vXb1w',
          }}
        />
        <TextInput
          multiline
          placeholder='Enter Share able text'
          numberOfLines={4}
          textAlign={'center'}
          style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1,  marginTop:20 }}
          onChangeText={text => shareImageText(text)}
          value={value}
        />
        <TouchableOpacity onPress={instagramShareDialog} style={styles.buttonView}>
          <Text style={{color: 'white'}}>Share</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  tinyLogo: {
    width: 300,
    height: 200,
  },
  buttonView: {
    width: 120,
    height: 30,
    backgroundColor: Colors.dark,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
