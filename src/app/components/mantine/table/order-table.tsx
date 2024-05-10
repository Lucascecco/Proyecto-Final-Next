"use client";

import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  TextInput,
  rem,
  keys,
  Container,
  Button,
  Checkbox,
  Modal,
  Stack,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "./table.module.css";
import { deleteOrders } from "@/lib/actions";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../../modals/confirmation-modal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  initialData: RowData[];
};

interface RowData {
  id: string;
  products: {
    slug: string;
    quantity: number;
  }[];
  user: {
    uid: string;
    email: string;
    name: string;
  };
  total: number;
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

export function OrderTable({ initialData }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [selection, setSelection] = useState<string[]>([]);
  const router = useRouter();

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setData(sortData(initialData, { search: value }));
  };

  const handleDelete = async () => {
    if (selection.length > 0) {
      await deleteOrders(selection);
      setSelection([]);
      router.refresh();
    }
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>
        <Checkbox
          checked={selection.includes(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      </Table.Td>
      <Table.Td>{row.user.name}</Table.Td>
      <Table.Td>{row.user.email}</Table.Td>
      <Table.Td>{row.products.length}</Table.Td>
      <Table.Td>
        <Stack gap={0}>
          {row.products.map((product) => (
            <p key={product.slug}>
              {product.slug}{" "}
              <span className="font-bold">x {product.quantity}</span>
            </p>
          ))}
        </Stack>
      </Table.Td>
      <Table.Td>${row.total.toFixed(2)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <ConfirmationModal
        title="¿Está seguro de eliminar los pedidos seleccionados?"
        opened={opened}
        close={close}
        handleConfirmation={handleDelete}
      />
      <Button
        color="red"
        m={"md"}
        onClick={open}
        disabled={selection.length === 0}
      >
        Eliminar Seleccionados
      </Button>
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
              <Table.Th style={{ width: rem(40) }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                />
              </Table.Th>
              <Table.Th>Cliente</Table.Th>
              <Table.Th>E-mail</Table.Th>
              <Table.Th>Cantidad</Table.Th>
              <Table.Th>Productos</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
