import { Button, Modal } from "@mantine/core";

type Props = {
  title: string;
  opened: boolean;
  close: () => void;
  handleConfirmation: () => void;
};

export default function ConfirmationModal({ title, opened, close, handleConfirmation }: Props) {
  return (
    <Modal opened={opened} onClose={close} title="¿Estás seguro?">
      <p>{title}</p>
      <div className="flex flex-row justify-between gap-4 m-4">
        <Button
          onClick={() => {
            close();
          }}
          className="grow"
        >
          No
        </Button>
        <Button
          onClick={() => {
            handleConfirmation();
            close();
          }}
          className="grow"
          variant="outline"
        >
          Sí
        </Button>
      </div>
    </Modal>
  );
}
