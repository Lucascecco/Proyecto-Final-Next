"use client";

import { FormEvent, useEffect, useState } from "react";
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
import {
  createCategory,
  deleteCategories,
  deleteOrders,
  updateCategory,
} from "@/lib/actions";
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
  label: string;
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

function CreateModal({
  opened,
  close,
  handleSubmit,
  handleChange,
}: {
  opened: boolean;
  close: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Crear Categoría">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            name="id"
            label="ID"
            placeholder="ID"
            required
            onChange={handleChange}
          />
          <TextInput
            name="label"
            label="Nombre"
            placeholder="Nombre"
            mb="md"
            required
            onChange={handleChange}
          />
        </Stack>
        <div className="flex flex-row justify-between gap-4 m-4">
          <Button
            onClick={() => {
              close();
            }}
            className="grow"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() => {
              close();
            }}
            className="grow"
          >
            Crear
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EditModal({
  initialValue,
  opened,
  close,
  handleEdit,
}: {
  initialValue: { id: string; label: string };
  opened: boolean;
  close: () => void;
  handleEdit: (categoryId: string, label: string) => void;
}) {
  const [value, setValue] = useState(initialValue.label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleEdit(initialValue.id, value);
  }

  useEffect(() => {
    setValue(initialValue.label);
  }, [initialValue]);

  return (
    <Modal opened={opened} onClose={close} title="Cambiar nombre">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Nuevo nombre"
            defaultValue={value}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={() => {
              close();
            }}
            className="grow"
          >
            Cambiar nombre
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export function CategoriesTable({ initialData }: Props) {
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);
  const [openedCreate, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialData);
  const [selection, setSelection] = useState<string[]>([]);
  const [editSelected, setEditSelected] = useState({
    id: "",
    label: "",
  });
  const router = useRouter();
  const [values, setValues] = useState({
    id: "",
    label: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await createCategory(values);
    router.refresh();
  };

  const handleEdit = async (categoryId: string, label: string) => {
    if (categoryId && label) {
      await updateCategory(categoryId, label);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    if (selection.length > 0) {
      await deleteCategories(selection);
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
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.label}</Table.Td>
      <Table.Td className="flex w-full justify-center items-center">
        <Button
          variant="outline"
          onClick={() => {
            setEditSelected({
              id: row.id,
              label: row.label,
            });
            openEdit();
          }}
        >
          Editar
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <ConfirmationModal
        title="¿Está seguro de eliminar las categorías seleccionadas?"
        opened={openedDelete}
        close={closeDelete}
        handleConfirmation={handleDelete}
      />
      <CreateModal
        opened={openedCreate}
        close={closeCreate}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <EditModal
        initialValue={editSelected}
        opened={openedEdit}
        close={closeEdit}
        handleEdit={handleEdit}
      />
      <Button m={"md"} onClick={openCreate}>
        Crear Categoría
      </Button>
      <Button
        color="red"
        m={"md"}
        onClick={openDelete}
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
        <Table miw={700}>
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
              <Table.Th>ID</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Editar</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </div>
  );
}
