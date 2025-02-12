import { getTranslations } from "next-intl/server";

async function Guide() {
  const t = await getTranslations("Primary");
  return <h1>Guide Page</h1>;
}

export default Guide;
