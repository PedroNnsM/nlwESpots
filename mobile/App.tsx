import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


interface ButtonProps{
  title: string;
}

function Button(props: ButtonProps){
  return(
    <TouchableOpacity>
      <Text>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}


export default function App() {
  return (
    //view = div
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello world!
        </Text>

        <Button title="send 1" />
        <Button title="send 2" />
        <Button title="send 3"  />
        <Button title="send 4" />
        <Button title="send 5" />
        
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5c5c5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: '#fff',
    fontSize: 22,
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 35,
  },
});
