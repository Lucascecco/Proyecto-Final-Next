import { Text } from "@mantine/core";

type Props = {};

export default function SuccessPage({}: Props) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Text c="dimmed" size="lg" ta="center">
        Su solicitud ha sido enviada correctamente, nos contactaremos con usted
        a la brevedad.
      </Text>
    </div>
  );
}
