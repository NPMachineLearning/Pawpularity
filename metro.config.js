const { getDefaultConfig } = require("@expo/metro-config");
module.exports = (async () => {
  const defaultConfig = getDefaultConfig(__dirname);
  const { assetExts } = defaultConfig.resolver;
  return {
    resolver: {
      // Add bin to assetExts
      assetExts: [...assetExts, "bin", "tflite"],
    },
  };
})();
