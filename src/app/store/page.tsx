import { ProductType, mockData } from "../mock-data";
import ProductList from "../components/product-list/product-list";

export const metadata = {
  title: "Productos",
};

async function getProducts(category?: string): Promise<ProductType[]> {
  const products = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  }).then((res) => res.json());

  if (category) {
    return products.filter(
      (product: ProductType) => product.category === category
    );
  } else {
    return products;
  }
}

export default async function Home() {
  return <ProductList products={await getProducts()} />;
}
