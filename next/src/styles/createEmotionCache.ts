import createCache, { EmotionCache } from "@emotion/cache";

export default function createEmotioncache(): EmotionCache {
  return createCache({ key: "css" });
}
