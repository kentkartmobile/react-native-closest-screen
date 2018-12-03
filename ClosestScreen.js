/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-mixed-operators */

import React from 'react';  
import { Animated, Dimensions, View } from 'react-native'; 
import { createResponder } from 'react-native-gesture-responder';
import PropTypes from 'prop-types';

const window = Dimensions.get('window'); 
let offsett = 0;
const rectangle_height = 50;  
class ClosestScreen extends React.Component {
  constructor(props) {
    super(props);  
   
    this.state = {  
      x: new Animated.Value(0),
      y: new Animated.Value(this.props.initialState),
      pan: new Animated.ValueXY(0, this.props.initialState),
      scroll: new Animated.Value(0), 
      directClose: false, 
     };         
    this.animatedValue = new Animated.Value(0);
    this.DirectClose = this.DirectClose.bind(this);
    this.moveBefore = 0;
    this.moveNow = 0;
    this.moveLast = 0;
    this.Height = 0; 
    this.d_Close = false;
    this.moveEnd = rectangle_height * this.props.data;
    this.speed = 1;  
    this.tolerance = 0;    // scroll içi hareket etmiş vaziyette indirilirse oluşacak düzzeltme payı
    
    this.maxHeight = this.props.maxHeight;     //   en aşağı
    this.minHeight = this.props.minHeight;     //   en yukarı
    }   
       componentWillMount() {
            this.animatedListenerId = this.animatedValue.addListener(
     ({ value }) => { this.scroller.getNode().scrollTo({ y: value, animated: true }); });   

             this.Responder = createResponder({
              onStartShouldSetResponder: () => true,
              onStartShouldSetResponderCapture: () => true,
              onMoveShouldSetResponder: () => true,
              onMoveShouldSetResponderCapture: () => true,
              onResponderMove: (evt, gestureState) => {
                this.pan(gestureState);
              }, 
              onPanResponderTerminationRequest: () => true,
              onResponderRelease: () => {   
               this.moveBefore = 0;     
               this.tolerance = 0;
           if (this.moveNow > 0 && this.Height == this.props.minHeight) {
               Animated.spring(this.animatedValue, {
                toValue: this.moveNow + (this.speed * this.props.scrollSpeed * -100),
                friction: 5,
                tension: 10,  
               }).start();  
               offsett = this.moveNow + (this.speed * this.props.scrollSpeed * -100);
              }  
           if (this.d_Close == true && this.Height == this.maxHeight) {                  
                Animated.spring(this.animatedValue, {
                  toValue: 0,
                  friction: 5,
                  tension: 10,  
                 }).start(); 
                 offsett = 0; 
                 this.moveNow = 0; 
                 this.d_Close_Scroll = false;
                }
           if (this.d_Close == true && this.Height == this.minHeight) {
                  this.d_Close_Scroll = true;
                }
           if (this.Height > this.minHeight && this.Height < this.maxHeight 
                   && this.d_Close == true) {
                this.moveNow = this.moveNow - this.moveBefore;
                offsett = this.moveNow;
                this.d_Close_Scroll = true;
               } 
           if (offsett > this.moveEnd) {
                 offsett = this.moveEnd;
               } 
           if (offsett < 0) {
                 offsett = 0;
               } 
               this.d_Close = false;  
               this.moveLast = offsett;  
              }, 
              });
              }         
          pan = (gestureState) => {
            const { x, y } = this.state;
            // -------------------------------------
            const maxX = 0;
            const minX = 0;                 //    boundaries
            const maxY = this.maxHeight; 
            const minY = this.minHeight;        
            //--------------------------------------
            const xDiff = gestureState.moveX - gestureState.previousMoveX;
            const yDiff = gestureState.moveY - gestureState.previousMoveY;
            let newX = x._value + xDiff;      
            let newY = y._value + yDiff + gestureState.vy * 150;  
            //---------------------------------- ----------------------------------                
            if (newX <= minX) { newX = minX; } else if (newX > maxX) { newX = maxX; }
            if (newY <= minY) {
              newY = minY; 
              //---------------------------------------------------------\\  
              this.moveNow = this.moveLast - gestureState.dy + this.moveBefore - this.tolerance; //>
              //---------------------------------------------------------// 
             } else if (newY > maxY) {
                            newY = maxY;  
              //---------------------------------------------------------\\  
              this.moveNow = this.moveLast - gestureState.dy + this.moveBefore - this.tolerance; //>
              //---------------------------------------------------------// 
             } else if (newY < maxY && newY > minY) {
                                     this.maxHeight = this.props.maxHeight;  
                                     this.moveBefore = gestureState.dy;
                                              }
          
               this.Height = newY;
            
               if (this.d_Close == true) {
              this.maxHeight = this.props.maxHeight;  
              this.animatedValue.setValue(this.moveNow); 
            } else if (this.moveNow > 0 && this.Height == this.props.minHeight) {            
            this.maxHeight = this.minHeight;            
            this.animatedValue.setValue(this.moveNow);                
            } else if (this.moveNow < 0) {
              this.moveNow = 0;
              this.maxHeight = this.props.maxHeight;
            } else if (this.moveNow == 0) {
              this.maxHeight = this.props.maxHeight;
            }   
            this.speed = gestureState.vy; 
            x.setValue(newX);      
             Animated.spring(this.state.y, {
              toValue: newY,
              friction: 7,
              tension: 25,  
            }).start();  
            }                     
      componentWillUnmount() { 
      this.state.pan.y.removeAllListeners(); 
      }  
      DirectClose() {           // Searc bölümüne tıklatılınca direk kapanmasını sağlayan
      this.d_Close = true;  
      }   
      render() {      
       const {
        x, y,
      } = this.state;
      const imageStyle = { left: x, top: y };    
             return (    
        <Animated.View
       {...this.Responder}
        resizeMode={'contain'}
        style={[this.props.style, imageStyle]}
        >
                    <View              // search bar 
                        onTouchStart={this.DirectClose}
                        style={this.props.searchBarStyle}
                        ref={(_direct) => { this.d_Close = _direct; }}
                    > 
                       {this.props.searchBar}   
                    </View>
      
            <Animated.ScrollView
          scrollEnabled={false}
          ref={(scroller) => { this.scroller = scroller; }}
          style={this.props.scrollStyle}
            >
            {this.props.data.map((item) => this.props.renderItemWith(item))}
            </Animated.ScrollView>   
 
    </Animated.View>   
        ); 
}
       }
       ClosestScreen.propTypes = {            // props and functions
        data: PropTypes.array,                
        maxHeight: PropTypes.number,          // boundaries Max
        minHeight: PropTypes.number,          // boundaries Min
        renderItemWith: PropTypes.func,       // Scroll içirisindeki nesne 
        style: PropTypes.any,          // Hareketli penceremiz
        searchBarStyle: PropTypes.any,        // searcBar style 
        searchBar: PropTypes.func,            // SerchBarda fonksiyon    
        initialState: PropTypes.number,       // başlangıç noktası
        scrollSpeed: PropTypes.number,        // scroll hızı 
        scrollStyle: PropTypes.any,
       };
       ClosestScreen.defaultProps = {
        data: null,
        maxHeight: window.height * 0.8,
        minHeight: 50,
        initialState: window.height * 0.4, 
        style: {    
          height: window.height, 
          width: window.width * 0.97,   
          justifyContent: 'flex-end',
          alignItems: 'center',   
          elevation: 15, 
           }, 
        searchBarStyle: {
          borderWidth: 3,
          borderColor: 'white',
          width: window.width * 0.97,
          height: 60,
          backgroundColor: '#f49761',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 1,
          marginLeft: 5,
          elevation: 5,
      },
        scrollStyle: {
          marginTop: 20,
          height: window.height, 
          width: window.width * 0.97,
          elevation: 10, 
        },
         scrollSpeed: 2,
        renderItemWith: () => {},
        searchBar: () => {},
       }; 
   

  module.exports = ClosestScreen;
 

  /*
    data?: array,                
    maxHeight?: number, 
    minHeight?:  number,          
    renderItemWith?: func,        
    style?: any,          
    searchBarStyle?:  any,         
    searchBar?:  func,            
    initialState?:  number,        
    scrollSpeed?:  number,        
    scrollStyle?:  any,
  
 */
