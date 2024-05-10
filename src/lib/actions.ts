"use server";

import { type ClassValue, clsx } from "clsx";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { revalidatePath, revalidateTag } from "next/cache";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  stock: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type UserData = {
  logged: boolean;
  uid: string;
  email: string | null;
  name: string | null;
  administrator: boolean;
};

export async function createUser(user: UserData) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    email: user.email,
    administrator: false,
    name: user.name,
  });
}

export async function getUser(uid: string): Promise<UserData> {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);

  return userSnapshot.data() as UserData;
}

export async function getUsers(): Promise<UserData[]> {
  const usersRef = collection(db, "users");
  const usersSnapshot = await getDocs(usersRef);
  const docs = usersSnapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as UserData[];

  return docs;
}

export async function setUserAdmin(uid: string, admin: boolean) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, { administrator: admin });

  revalidatePath("/admin/users", "page");
}

export async function changeUsername(user: UserData, username: string) {
  const userRef = doc(db, "users", user.uid);
  await updateDoc(userRef, {
    name: username,
  });
}

export async function addProduct(product: {
  title: string;
  price: number;
  discountedPrice: number;
  stock: number;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}) {
  await fetch("http://localhost:3000/api/admin/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  revalidateTag("products");
}

export async function getProduct(slug: string): Promise<ProductType> {
  return await fetch(`http://localhost:3000/api/products/${slug}`, {
    cache: "no-store",
  }).then((res) => res.json());
}

export async function getProducts(category?: string): Promise<ProductType[]> {
  return await fetch(
    `http://localhost:3000/api/products${
      category ? "?category=" + category : ""
    }`,
    { next: { revalidate: 60, tags: ["products"] } }
  ).then((res) => res.json());
}

export async function deleteProduct(slug: string) {
  await fetch(`http://localhost:3000/api/products/${slug}`, {
    method: "DELETE",
    next: { revalidate: 60, tags: ["products"] },
  });

  revalidateTag("products");
}

export async function makeOrder(order: {
  products: { slug: string; quantity: number }[];
  user: {
    uid: string;
    email: string;
    name: string;
  };
  total: number;
}) {
  await fetch("http://localhost:3000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  revalidateTag("products");
}

export async function getOrders() {
  return await fetch("http://localhost:3000/api/orders", {
    next: { revalidate: 60, tags: ["orders"] },
  }).then((res) => res.json());
}

export async function deleteOrders(orderIds: string[]) {
  const orderCol = collection(db, "orders");
  orderIds.forEach(async (id) => {
    const orderRef = doc(orderCol, id);
    await deleteDoc(orderRef);
  });

  revalidatePath("/admin/orders", "page");
}

export async function getCategories(): Promise<
  { id: string; link: string; label: string }[]
> {
  return await fetch("http://localhost:3000/api/categories", {
    next: { revalidate: 60, tags: ["categories"] },
  }).then((res) => res.json());
}

export async function createCategory(category: { id: string; label: string }) {
  const docRef = doc(db, "categories", category.id);
  await setDoc(docRef, { label: category.label });

  revalidateTag("categories");
}

export async function updateCategory(categoryId: string, newLabel: string) {
  const docRef = doc(db, "categories", categoryId);
  await updateDoc(docRef, { label: newLabel });

  revalidateTag("categories");
}

export async function deleteCategories(categories: string[]) {
  const categoryCol = collection(db, "categories");
  categories.forEach(async (category) => {
    const categoryRef = doc(categoryCol, category);
    await deleteDoc(categoryRef);
  });

  revalidateTag("categories");
}
