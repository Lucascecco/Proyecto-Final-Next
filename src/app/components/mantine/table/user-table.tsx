"use client";

import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
  keys,
  Container,
  Button,
  Checkbox,
  Modal,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./table.module.css";
import { UserData, setUserAdmin } from "@/lib/actions";
import { useDisclosure } from "@mantine/hooks";
import { useAuthContext } from "../../context/auth-context";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../../modals/confirmation-modal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  initialData: RowData[];
};

export interface RowData extends UserData {}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
  styles?: string;
}

function Th({ children, reversed, sorted, onSort, styles }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={styles}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key]?.toString().toLowerCase().includes(query)
    )
  );
}

function sortData(data: RowData[], payload: { search: string }) {
  return filterData(data, payload.search);
}

export function UserTable({ initialData }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAuthContext();
  const [selectedUid, setSelectedUid] = useState("");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setData(sortData(initialData, { search: value }));
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const rows = data.map((row) => (
    <Table.Tr key={row.uid}>
      <Table.Td>{row.uid}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
      <Table.Td>
        {row.administrator ? (
          <Group>
            {row.uid != user?.uid ? (
              <Button
                color="red"
                variant="outline"
                onClick={() => {
                  setUserAdmin(row.uid, false);
                  //router.push("/admin");
                  router.refresh();
                }}
              >
                Remover Administrador
              </Button>
            ) : (
              <p>Administrador</p>
            )}
          </Group>
        ) : (
          <Button
            color="red"
            onClick={() => {
              setSelectedUid(row.uid);
              open();
            }}
          >
            Otorgar Administrador
          </Button>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <ConfirmationModal
        title="¿Estás seguro de que quieres otorgarle permisos de administrador a
          este usuario?"
        opened={opened}
        close={close}
        handleConfirmation={() => {
          if (selectedUid) {
            setUserAdmin(selectedUid, true);
            router.refresh();
            close();
          }
        }}
      />
      <Container className="my-6">
        <TextInput
          placeholder="Busca por cualquier campo"
          mb="md"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
      </Container>
      <ScrollArea>
        <Table miw={700} striped highlightOnHover>
          <Table.Thead className={classes.header}>
            <Table.Tr>
              <Table.Th>UID</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>E-mail</Table.Th>
              <Table.Th>Administrador</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
