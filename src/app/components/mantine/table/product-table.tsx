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
  Box,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./table.module.css";
import Link from "next/link";

type Props = {
  initialData: RowData[];
};

export interface RowData {
  id: string;
  title: string;
  category: string;
  price: string;
  discountedPrice: string;
  stock: string;
  rating: string;
  ratingCount: string;
}

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
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data: RowData[], payload: { search: string }) {
  return filterData(data, payload.search);
}

export function ProductTable({ initialData }: Props) {
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
    <Table.Tr key={row.id}>
      <Table.Td>
        <Link className="underline" href={`/store/products/id/${row.id}`}>
          {row.title}
        </Link>
      </Table.Td>
      <Table.Td>{row.category}</Table.Td>
      <Table.Td>${row.price}</Table.Td>
      <Table.Td>${row.discountedPrice}</Table.Td>
      <Table.Td>{row.stock}</Table.Td>
      <Table.Td>{row.rating}</Table.Td>
      <Table.Td>{row.ratingCount}</Table.Td>
      <Table.Td className="flex w-full justify-center items-center">
        <Link className="underline" href={`/admin/products/edit/${row.id}`}>
          <Button variant="outline">Editar</Button>
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
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
          <Table.Thead
            className={classes.header}
          >
            <Table.Tr>
              <Table.Th>Título</Table.Th>
              <Table.Th>Categoría</Table.Th>
              <Table.Th>Precio</Table.Th>
              <Table.Th>Precio Descontado</Table.Th>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Rating</Table.Th>
              <Table.Th>Rates</Table.Th>
              <Table.Th>Editar</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
