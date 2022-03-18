import React, { useEffect, useState } from "react";
import { Button, Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeNavigatorParamList } from "../../../infrastructure/navigation/home.navigator";
import { Alert } from "react-native";

type Props = NativeStackScreenProps<HomeNavigatorParamList, "HomeScreen">;

export const HomeScreen = ({ navigation }: Props) => {
  const [isMeidaPermitted, setIsMediaPermitted] = useState(false);
  const [isCameraPermitted, setIsCameraPermitted] = useState(false);
  const [imageURI, setImageURI] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const mediaPermissionResult =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      const cameraPermissionResult =
        await ImagePicker.getCameraPermissionsAsync();

      console.log(mediaPermissionResult);
      console.log(cameraPermissionResult);
      if (!mediaPermissionResult.granted) {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setIsMediaPermitted(status.granted);
      } else {
        setIsMediaPermitted(true);
      }
      if (!cameraPermissionResult.granted) {
        const status = await ImagePicker.requestCameraPermissionsAsync();
        setIsCameraPermitted(status.granted);
      } else {
        setIsCameraPermitted(true);
      }
    })();
  }, []);

  const pickImage = async () => {
    if (!isMeidaPermitted) {
      Alert.alert(
        "Permission deny",
        "Required permission to access to your photo library."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  const takePhoto = async () => {
    if (!isCameraPermitted) {
      Alert.alert(
        "Permission deny",
        "Required permission to access to your camera."
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };

  const chooseMedia = () =>
    Alert.alert("Choose media type", "", [
      { text: "Photo library", onPress: pickImage },
      { text: "Camera roll", onPress: takePhoto },
      { text: "Cancel", style: "cancel" },
    ]);

  return (
    <SafeArea>
      {imageURI ? (
        <Card>
          <Card.Cover source={{ uri: imageURI }} />
        </Card>
      ) : null}
      <Button mode="contained" onPress={chooseMedia}>
        Choose media
      </Button>
    </SafeArea>
  );
};
