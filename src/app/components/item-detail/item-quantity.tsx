"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

type Props = {
};

export default function ItemQuantity({}: Props) {
  const [counter, setCounter] = useState(1);

  function handleIncrease() {
    setCounter(counter + 1);
  }

  function handleDecrease() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  return (
    <>
      <Button onClick={handleDecrease} variant="outline">
        -
      </Button>
      <Input type="number" min={1} value={counter} disabled/>
      <Button onClick={handleIncrease} variant="outline">
        +
      </Button>
    </>
  );
}
