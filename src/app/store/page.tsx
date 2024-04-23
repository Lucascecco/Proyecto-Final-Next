import ProductList from "../components/product-list/product-list";

export const metadata = {
  title: "Productos",
};

export default async function Home() {
  return <ProductList />;
}
