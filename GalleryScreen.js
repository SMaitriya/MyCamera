import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { deletePhoto } from './components/photoSlice';

function GalleryScreen() {
  const navigation = useNavigation();
  const photos = useSelector(state => state.photos);
  const dispatch = useDispatch();

  // Function to delete a photo
  const handleDeletePhoto = (uri) => {
    Alert.alert(
      "Supprimer la photo",
      "Êtes-vous sûr de vouloir supprimer cette photo ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => dispatch(deletePhoto(uri)),
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Photo Gallery</Text>
      </View>

      {photos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.message}>No photos taken yet</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.photoGrid}>
            {photos.map((uri, index) => (
              <View key={index} style={styles.photoFrame}>
                <Image
                  source={{ uri }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePhoto(uri)}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e9dc', // Vintage beige tone
  },
  header: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#8d6e63', // Retro brown
    backgroundColor: '#d7ccc8', // Vintage grayish-beige
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5d4037', // Dark brown
    fontFamily: 'System',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    color: '#8d6e63', // Retro brown
    fontStyle: 'italic',
  },
  scrollContent: {
    padding: 15,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoFrame: {
    width: '48%', // Slightly less than 50% to create space between photos
    marginBottom: 25,
    borderWidth: 10,
    borderColor: '#d7ccc8', // Vintage border
    borderRadius: 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Maintains square aspect ratio
  },
  deleteButton: {
    position: 'absolute',
    top: -20,
    right: -20,
    backgroundColor: '#a1887f', // Medium brown
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 30,
  },
});

export default GalleryScreen;