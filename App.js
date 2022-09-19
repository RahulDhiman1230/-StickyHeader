
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

const UPPER_VIEW_HEIGHT = 300;
const HEADER_VIEW_HEIGHT = 50;
const SCROLL_DISTANCE = UPPER_VIEW_HEIGHT - HEADER_VIEW_HEIGHT;
const imagePath = require('./src/bgImage.jpeg');
const App = () => {

const headerAnimVal = useRef( new Animated.Value(0) ).current;
const opacityAnimVal = useRef( new Animated.Value(0) ).current;
const marginTopAnim = useRef( new Animated.Value(0) ).current;

const [selectedTab, setSelectedTab] = useState(-1);

const [ yOffsetPromise, setyOffsetPromise ] = useState(0);
const [ yOffsetComplete, setyOffsetComplete ] = useState(0);
const [ yOffsetCovered, setyOffsetCovered ] = useState(0);


/**
 * Interpolate the headerAnimVal
 */
const translateY = headerAnimVal?.interpolate({
  inputRange: [ 0, SCROLL_DISTANCE ],
  outputRange: [ UPPER_VIEW_HEIGHT, HEADER_VIEW_HEIGHT ],
  extrapolate: 'clamp'
});

const opacityAnimInter = opacityAnimVal?.interpolate({
  inputRange: [ 0, SCROLL_DISTANCE ],
  outputRange: [ 1, 0 ]
});

const marginTopInter = marginTopAnim?.interpolate({
  inputRange: [ 0, SCROLL_DISTANCE ],
  outputRange: [ 50, -100 ]
})

const _onScrollHandler = ({nativeEvent}) => {
  headerAnimVal?.setValue( nativeEvent?.contentOffset?.y )
  opacityAnimVal?.setValue( nativeEvent?.contentOffset?.y )
  marginTopAnim?.setValue( nativeEvent?.contentOffset?.y );

  // if( nativeEvent?.contentOffset?.y === 0) 
  //   setSelectedTab(-1);
   if( nativeEvent?.contentOffset?.y > 0 && nativeEvent?.contentOffset?.y + 400 < yOffsetComplete  )
    setSelectedTab(0);
  else if( nativeEvent?.contentOffset?.y + 400 >= yOffsetComplete  && nativeEvent?.contentOffset?.y + 400 < yOffsetCovered  )
    setSelectedTab(1);
  else if( nativeEvent?.contentOffset?.y + 400 >= yOffsetCovered   )
    setSelectedTab(2);

  console.log('onscroll : ', nativeEvent);
}
console.log('selected taB', selectedTab );
console.log('promise : ', yOffsetPromise);
console.log('complete : ', yOffsetComplete);
console.log('covered : ', yOffsetCovered);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View style={[styles.upperView,{ height: translateY }]} >
          <Image source={imagePath} style={styles.imageStyle} resizeMode={'contain'} />
          <Animated.View style={[styles.imageOverlayView, { opacity: opacityAnimInter, marginTop: marginTopInter }]} >
            <Text style={styles.overlayHeader} >{`Here's an offer we know\nyou can't refuse!`}</Text>
            <Text style={styles.overlaySubText} >{`If you are looking for a reason to switch to rental.\nSubscriptions, you've come to the rightplace.\nOur list of benifits is long we needed a whole\nother page for it.`}</Text>
          </Animated.View>
          <View style={styles.tabView} >
            <View style={[styles.tabHolder, { borderColor: selectedTab == 0 ? '#42d1f5' : '#cfd1d1'}]} >
              <Text style={[styles.tabText, { color: selectedTab == 0 ? '#42d1f5' : '#cfd1d1' }]} >{`Our promise`}</Text>
            </View>
            <View style={[styles.tabHolder, { borderColor: selectedTab == 1 ? '#42d1f5' : '#cfd1d1'}]} >
              <Text style={[styles.tabText,  { color: selectedTab == 1 ? '#42d1f5' : '#cfd1d1' }]}>{`Complete Flexibility`}</Text>
            </View>
            <View style={[styles.tabHolder, { borderColor: selectedTab == 2 ? '#42d1f5' : '#cfd1d1'}]} >
              <Text style={[styles.tabText, { color: selectedTab == 2 ? '#42d1f5' : '#cfd1d1' }]}>{`We get you covered`}</Text>
            </View>
          </View>
        </Animated.View>
      <ScrollView removeClippedSubviews={true} scrollEventThrottle={16} onScroll={_onScrollHandler}  showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView} >
        
        <View style={styles.bottomView} >

          {/* <ScrollView > */}
          <View onLayout={({nativeEvent}) => {
            console.log('Promise :', nativeEvent);
            setyOffsetPromise( nativeEvent?.layout?.y );
          }} style={styles.promiseView} >
            <Text style={styles.header} >{`Our Promises`}</Text>
            <Text style={styles.subheader} >{`Qualoty and your satisfaction are at the very core of out service`}</Text>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(0, 2)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(2, DummyData?.length)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
          </View>

          <View  onLayout={({nativeEvent}) => {
            console.log('Complete :', nativeEvent);
            setyOffsetComplete( nativeEvent?.layout?.y );
          }} style={styles.promiseView} >
            <Text style={styles.header} >{`Complete Flexibility`}</Text>
            <Text style={styles.subheader} >{`Qualoty and your satisfaction are at the very core of out service`}</Text>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(0, 2)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(2, DummyData?.length)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
          </View>

          <View  onLayout={({nativeEvent}) => {
            console.log('Covered :', nativeEvent);
            setyOffsetCovered( nativeEvent?.layout?.y );
          }} style={styles.promiseView} >
            <Text style={styles.header} >{`We get you covered`}</Text>
            <Text style={styles.subheader} >{`Qualoty and your satisfaction are at the very core of out service`}</Text>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(0, 2)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
            <View style={styles.rowHolderView} >
              {
                DummyData?.slice(2, DummyData?.length)?.map?.((item) => <View style={styles.rowCol} >
                  <Text style={styles.header} >{item?.header}</Text>
                  <Text style={[styles.subheader, { width: 180, alignSelf: 'center' }]} >{item?.subText}</Text>
                </View>)
              }
            </View>
          </View>
          {/* </ScrollView> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = () => {
  return (
    <View style={styles.headerView} >
      <Text style={styles.headerText} >{'Benifits'}</Text>
    </View>
  )
};

const DummyData = [
  {
    id: 1,
    header: `Refundable security`,
    subText: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail.'
  },
  {
    id: 2,
    header: `As good as new`,
    subText: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail.'
  },
  {
    id: 3,
    header: `Quick Responses`,
    subText: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail.'
  },
  {
    id: 4,
    header: `Use first, pay later`,
    subText: 'Filler text is text that shares some characteristics of a real written text, but is random or otherwise generated. It may be used to display a sample of fonts, generate text for testing, or to spoof an e-mail.'
  },
]

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerView: {
    flex: 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOffset: { width: -2, height: 5 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500'
  },
  scrollView: {
    // flex: 1
  },
  upperView: {
    // borderWidth: 1,
    // flex: 0.3
    height: 300
  },
  imageStyle: {
    flex: 1,
    marginLeft: -85,
  },
  imageOverlayView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50
  },
  overlayHeader: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700'
  },
  overlaySubText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 10,
    marginTop: 20,
    fontWeight: '300'
  },
  bottomView: {
    flex: 0.7
  },
  tabView: {
    flexDirection: 'row',
    height: 50
  },
  tabText: {
    fontSize: 10,
    fontWeight: '500',
    color: 'grey'
  },
  tabHolder: {
    width: Dimensions?.get('window')?.width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 3,
    // borderColor: 'lightgrey',
  },
  promiseView: {

  },
  header: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: 'grey',
    fontWeight: '500'
  },
  subheader: {
    textAlign: 'center',
    marginTop: 10,
    color: 'grey',
    fontSize: 11

  },
  rowHolderView: {
    flexDirection: 'row',
    paddingBottom: 30,
    alignItems: 'center'
  },
  rowCol: {
    width: Dimensions?.get('window')?.width / 2,
  }
});

export default App;