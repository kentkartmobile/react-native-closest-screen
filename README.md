# Closest-Point

This component is similar to [interactable](https://github.com/wix/react-native-interactable) but with different characteristics. 

## Installation
 

```bash
$ npm install react-native-gesture-responder --save

$ npm install react-native-kk-closest-point --save
```

## Usage

```JavaScript
import ClosestScreen from 'react-native-kk-closest-point'
  items[];
 ... 
  <ClosestScreen
    data={items}                
    maxHeight={500} 
    minHeight={0}        
    renderItemWith={this.renderItem}        
    style={styles.closestScreen}          
    searchBarStyle={styles.searchBar}         
    searchBar={this.searchBarPress}            
    initialState={300}        
    scrollSpeed={2} 
    scrollStyle={styles.scroll}
    />
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
