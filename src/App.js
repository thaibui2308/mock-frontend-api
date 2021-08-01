import { useEffect, useState } from "react";
import "./styles.css";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    product: Model
  },
  seeds(server) {
    server.create("product", { title: "test product" });
    server.create("product", { title: "test product" });
    server.create("product", { title: "test product" });
  },
  routes() {
    this.get("/api/products", (schema) => {
      return schema.products.all();
    });
  }
});

export default function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();

    console.log(products);
  }, []);

  const getProducts = async () => {
    const products = await fetch("/api/products");
    const result = await products.json();
    setProducts(result);
  };

  return (
    <div>2</div>
    // <ul>
    //   {products.map((product) => (
    //     <li key={product.id}>{product.title}</li>
    //   ))}
    // </ul>
  );
}
