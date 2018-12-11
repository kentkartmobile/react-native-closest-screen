import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native'; 
import ClosestScreen from 'react-native-kk-closest-point'
const items=["1","2","3","4","5","6","1","2","3","4","5","6",
             "1","2","3","4","5","6","1","2","3","4","5","6",
             "1","2","3","4","5","6","1","2","3","4","5","6",
             "1","2","3","4","5","6","1","2","3","4","5","6",
             "1","2","3","4","5","6","1","2","3","4","5","6",]; 
 
export default class App extends Component  {

  renderScroll(item){
    return(
     <View style={styles.rectangle}>
       <Text style={{color:'red'}}>
         {item}
       </Text>
     </View>
    );
  } 
  render() {
    return (
      <View style={styles.main}>
       <ClosestScreen 
         
         data={items}
         renderItemWith={this.renderScroll}
         style={styles.closestScreen} 
         maxHeight={460}
         minHeight={20}
         initialState={300} />
      
      </View>
    );
  }
}

 const styles= StyleSheet.create({
   main:{
     flex:1 ,
     backgroundColor:'grey' ,
     justifyContent:'center'
    },
    closestScreen:{
      width:350,
      height:600,
      backgroundColor:'white',
      borderRadius: 20
    },
   rectangle:{
     height :60,
     width:300,
     backgroundColor:'white',
     borderRadius:15
   }
 })
