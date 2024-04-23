import Cart from "@/app/components/cart/cart";

export const metadata = {
  title: "Carrito",
};

type Props = {};

export default function CartPage({}: Props) {
  return (
    <section className="bg-gray-100 py-20 h-screen">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-center">
          <h1 className="title">Carrito</h1>
        </div>

        <div className="mx-auto mt-12">
          <div className="bg-white shadow">
            <div className="px-8 py-10">
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
