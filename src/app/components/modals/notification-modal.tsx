import { Button, Modal } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
    opened: boolean;
    close: () => void;
    title: string;
    children: ReactNode[];
}

export default function NotificationModal({ opened, close, title, children }: Props) {
  return (
    <Modal opened={opened} onClose={close} title={title}>
      {children}
      <div className="flex flex-row justify-between gap-4 m-4">
        <Button
          onClick={() => {
            close();
          }}
          className="grow"
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
}
