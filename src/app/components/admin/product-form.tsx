"use client";

import {
  Button,
  Container,
  FileInput,
  Group,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import classes from "./create-form.module.css";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { ProductType, addProduct, deleteProduct } from "@/lib/actions";
import Image from "next/image";
import { sanitizeString } from "@/lib/utils";

type Props = {
  product?: ProductType;
};

const uploadProduct = async (
  values: {
    title: string;
    price: number;
    discountedPrice: number;
    stock: number;
    description: string;
  },
  file: File | string,
  rating?: {
    rate: number;
    count: number;
  }
) => {
  let fileURL = "";
  if (typeof file === "string") {
    fileURL = file;
  } else {
    const storageRef = ref(storage, sanitizeString(values.title));
    const fileSnapshot = await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(fileSnapshot.ref);
  }

  if (!rating) {
    rating = { rate: 0, count: 0 };
  }

  await addProduct({ ...values, rating, image: fileURL });
};

export default function ProductForm({ product }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([""]);
  const [file, setFile] = useState<File>();
  const router = useRouter();
  const [values, setValues] = useState({
    title: "",
    category: "",
    price: 0,
    discountedPrice: 0,
    stock: 0,
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/categories", {
      next: { revalidate: 60 },
    })
      .then((res) => res.json())
      .then((categories) => {
        setCategories(
          categories.map((category: { id: string }) => {
            return category.id;
          })
        );
      });

    if (product) {
      setValues({
        title: product.title,
        category: product.category,
        price: product.price,
        discountedPrice: product.discountedPrice,
        stock: product.stock,
        description: product.description,
      });
    }
  }, [product]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handlePriceChange = (value: string | number) => {
    setValues({
      ...values,
      price: parseFloat(value.toString()),
    });
  };

  const handleDiscountedPriceChange = (value: string | number) => {
    setValues({
      ...values,
      discountedPrice: parseFloat(value.toString()),
    });
  };

  const handleStockChange = (value: string | number) => {
    setValues({
      ...values,
      stock: parseFloat(value.toString()),
    });
  };

  const handleCategoryChange = (value: string | null) => {
    if (value) setValues({ ...values, category: value });
  };

  const handleFileChange = (file: File | null) => {
    if (file) setFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      if (product) {
        await uploadProduct(values, file, product.rating);
      } else {
        await uploadProduct(values, file);
      }
    } else if (product) {
      await uploadProduct(values, product.image, product.rating);
    } else {
      setError("Se requiere una imagen");
      open();
    }
    router.push("/admin/products");
    router.refresh();
  };

  const handleDelete = async () => {
    if (product) {
      await deleteProduct(product.id);
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <div>
      <Container>
        <Modal opened={opened} onClose={close} title="Error">
          <p>{error}</p>
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
        <form className={classes.form} onSubmit={handleSubmit}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              name="title"
              label="Título"
              placeholder="Título"
              required
              onChange={handleChange}
              {...(product && { defaultValue: product.title })}
              {...(product && { disabled: true })}
            />
            <Select
              label="Categoría"
              placeholder="Categoría"
              data={categories}
              onChange={handleCategoryChange}
              required
              {...(product && { defaultValue: product.category })}
            />
          </SimpleGrid>

          <SimpleGrid mt="md" cols={{ base: 1, xs: 3 }}>
            <NumberInput
              name="price"
              label="Precio"
              placeholder="$0.00"
              prefix="$"
              required
              decimalScale={2}
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              onChange={handlePriceChange}
              fixedDecimalScale
              {...(product && { defaultValue: product.price })}
            />
            <NumberInput
              name="discountedPrice"
              label="Precio en Descuento"
              placeholder="$0.00"
              prefix="$"
              decimalScale={2}
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              onChange={handleDiscountedPriceChange}
              fixedDecimalScale
              {...(product && { defaultValue: product.discountedPrice })}
            />
            <NumberInput
              name="stock"
              label="Stock"
              placeholder="0"
              allowDecimal={false}
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              required
              onChange={handleStockChange}
              fixedDecimalScale
              {...(product && { defaultValue: product.stock })}
            />
          </SimpleGrid>

          {product && (
            <div className="flex w-full justify-center">
              <Image
                className="m-4"
                width={400}
                height={400}
                src={product.image}
                alt={product.title}
              />
            </div>
          )}
          <FileInput
            label="Imagen del Producto"
            mt="md"
            placeholder="Seleccionar archivo"
            onChange={handleFileChange}
            {...(!product && { required: true })}
          />

          <Textarea
            name="description"
            mt="md"
            label="Descripción"
            placeholder="Por favor incluya toda la información relevante"
            autosize
            required
            onChange={handleChange}
            {...(product && { defaultValue: product.description })}
          />

          <Group justify="flex-end" mt="md">
            {product && (
              <Button
                color="red"
                className={classes.control}
                onClick={handleDelete}
              >
                Eliminar Producto
              </Button>
            )}
            <Button type="submit" className={classes.control}>
              {product ? "Editar Producto" : "Crear Producto"}
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
}
