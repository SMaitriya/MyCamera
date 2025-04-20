import React, { useEffect, useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GalleryScreen from './GalleryScreen';
import { Provider } from 'react-redux';
import store from './store/store'; 
import { useDispatch } from 'react-redux';
import { addPhoto } from './components/photoSlice';



// Créer le Stack Navigator
const Stack = createStackNavigator();

// Définir le composant CameraScreen
function CameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [takePicture, setTakePicture] = useState(false); // Booléen pour gérer la prise de photo
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  
  // Prendre une photo lorsqu'on change takePicture
  useEffect(() => {
    if (takePicture && cameraRef.current) {
      (async () => {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo && photo.uri) {
          dispatch(addPhoto(photo.uri));
        }
      })();
      setTakePicture(false); // Réinitialiser l'état pour éviter de prendre plusieurs photos à la fois
    }
  }, [takePicture]);
  
  if (!permission) {
    // Si les permissions sont en train de se charger
    return <View />;
  }
  
  if (!permission.granted) {
    // Si les permissions ne sont pas accordées
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }
  
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setTakePicture(true)}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Gallery')}
          >
            <Text style={styles.text}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

// Composant principal App
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera">
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen} 
          options={{ title: "Photos" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  photoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
});