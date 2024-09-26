import React from "react";
import HomeFeature from "./HomeFeature";
import HomeNewest from "./HomeNewest";

export default function HomeFeatureList({ children }) {
  return (
    <div>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </div>
  );
}
