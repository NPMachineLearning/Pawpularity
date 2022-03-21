import React, { useEffect, useState } from "react";
import { Button, IconButton, Paragraph, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeNavigatorParamList } from "../../../infrastructure/navigation/home.navigator";
import { Alert } from "react-native";
import {
  ButtonWrapper,
  CardCover,
  CardRoot,
  CardWrapper,
  HomeWrapper,
} from "../components/home.styled";
import * as tf from "@tensorflow/tfjs";
import {
  fetch as tf_fetch,
  decodeJpeg,
  bundleResourceIO,
} from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";

type Props = NativeStackScreenProps<HomeNavigatorParamList, "HomeScreen">;

export const HomeScreen = ({ navigation }: Props) => {
  const [isMeidaPermitted, setIsMediaPermitted] = useState(false);
  const [isCameraPermitted, setIsCameraPermitted] = useState(false);
  const [imageURI, setImageURI] = useState<string | null>(null);
  const [isTFReady, setIsTFReady] = useState(false);
  const [model, setModel] = useState<null | tf.GraphModel>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [preds, setPreds] = useState<
    | null
    | {
        className: string;
        probability: number;
      }[]
  >(null);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      const mediaPermissionResult =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      const cameraPermissionResult =
        await ImagePicker.getCameraPermissionsAsync();

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

  useEffect(() => {
    (async () => {
      await tf.ready();
      setIsTFReady(true);
      console.log("TF is ready");
    })();
  }, []);

  useEffect(() => {
    // (async () => {
    //   const model = await mobilenet.load();
    //   setModel(model);
    //   console.log("model is ready");
    // })();
    (async () => {
      const model_hub_url =
        "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_130_224/classification/3/default/1";

      const model_json = require("../../../assets/imagenet/model.json");
      const weights = [
        require("../../../assets/imagenet/group1-shard1of6.bin"),
        require("../../../assets/imagenet/group1-shard2of6.bin"),
        require("../../../assets/imagenet/group1-shard3of6.bin"),
        require("../../../assets/imagenet/group1-shard4of6.bin"),
        require("../../../assets/imagenet/group1-shard5of6.bin"),
        require("../../../assets/imagenet/group1-shard6of6.bin"),
      ];
      const bundleIO = bundleResourceIO(model_json, weights);
      const model = await tf.loadGraphModel(bundleIO);

      //warm up
      const result = tf.tidy(
        () => model.predict(tf.zeros([1, 224, 224, 3])) as tf.Tensor
      );
      await result.data();
      result.dispose();
      setModel(model);
      console.log("model is ready");
      return () => model.dispose();
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
      quality: ImagePicker.UIImagePickerControllerQualityType.Low,
    });

    if (!result.cancelled) {
      console.log(result);
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
      quality: 0,
    });

    if (!result.cancelled) {
      console.log(result);
      setImageURI(result.uri);
    }
  };

  const chooseMedia = () =>
    Alert.alert("Choose media type", "", [
      { text: "Photo library", onPress: pickImage },
      { text: "Camera roll", onPress: takePhoto },
      { text: "Cancel", style: "cancel" },
    ]);

  const predict = (img_uri: string) => {
    (async () => {
      if (model) {
        setAnalyzing(true);
        const response = await tf_fetch(img_uri, {}, { isBinary: true });
        const imageDataBuffer = await response.arrayBuffer();
        const imageData = new Uint8Array(imageDataBuffer);
        let imageTensor = decodeJpeg(imageData);
        const imageResizedTensor = imageTensor.resizeBilinear([224, 224]);
        const imageNormTensor = imageResizedTensor.div(tf.scalar(255));
        const imageCastTensor = imageNormTensor.cast("float32");
        const imageReshapeTensor = imageCastTensor.reshape([-1, 224, 224, 3]);
        let pred_logits = (await model.execute(
          imageReshapeTensor
        )) as tf.Tensor2D;
        pred_logits = pred_logits.squeeze();
        const pred_proba = pred_logits.softmax();
        const maxIndex = pred_proba.argMax(0);
        const index2label = maxIndex.dataSync()[0];
        const resp = await fetch(
          "https://storage.googleapis.com/download.tensorflow.org/data/ImageNetLabels.txt"
        );
        const labels = (await resp.text()).split("\n");
        const proba = pred_proba.dataSync()[index2label];
        setPreds([{ className: labels[index2label], probability: proba }]);
        setAnalyzing(false);
        imageTensor.dispose();
        pred_logits.dispose();
        pred_proba.dispose();
        maxIndex.dispose();
        imageResizedTensor.dispose();
        imageNormTensor.dispose();
        imageCastTensor.dispose();
        imageReshapeTensor.dispose();
      }
    })();
  };

  return (
    <SafeArea>
      <HomeWrapper>
        {imageURI ? (
          <CardWrapper height="70%">
            <CardRoot>
              <CardCover source={{ uri: imageURI }} />
            </CardRoot>
          </CardWrapper>
        ) : null}
        <ButtonWrapper>
          <IconButton
            icon="camera"
            size={40}
            color={theme.colors.primary}
            onPress={chooseMedia}
          />
        </ButtonWrapper>
        <Paragraph>{isTFReady ? "TF ready" : "TF not ready"}</Paragraph>
        <Paragraph>{model ? "model is ready" : "model not ready"}</Paragraph>
        {imageURI ? (
          <Button mode="contained" onPress={() => predict(imageURI)}>
            Predict
          </Button>
        ) : null}
        {analyzing ? <Paragraph>Analyzing......</Paragraph> : null}
        {preds
          ? preds.map((p) => (
              <Paragraph
                key={p.className}
              >{`${p.className} - ${p.probability}`}</Paragraph>
            ))
          : null}
      </HomeWrapper>
    </SafeArea>
  );
};
