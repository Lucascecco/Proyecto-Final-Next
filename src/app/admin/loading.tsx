import { Loader } from "@mantine/core";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Loader
      className="flex items-center justify-center w-full h-96"
      size={80}
      color="blue"
      type="dots"
    />
  );
}
