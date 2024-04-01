import { mockData } from "../mock-data";
import ProductList from "../components/product-list/product-list";

export const metadata = {
  title: 'Productos'	
}

export default function Home() {
  return (
    <ProductList products={mockData()} />
  );
}
