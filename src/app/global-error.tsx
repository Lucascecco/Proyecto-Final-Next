"use client";

import { Button } from "@mantine/core";
import React, { useEffect } from "react";

type Props = { error: Error & { digest?: string }; reset: () => void };

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html>
      <body>
        <div>
          <h1>Ocurrió un error inesperado</h1>
          <Button onClick={reset}>Intentar nuevamente</Button>
        </div>
      </body>
    </html>
  );
}
