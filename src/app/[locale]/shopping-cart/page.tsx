import { getTranslations } from "next-intl/server";

async function ShoppingCart() {
  const t = await getTranslations("Primary");
  return <h1>ShoppingCart Page</h1>;
}

export default ShoppingCart;
