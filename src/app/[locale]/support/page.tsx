import { getTranslations } from "next-intl/server";

async function Support() {
  const t = await getTranslations("Primary");
  return <h1>Support Page</h1>;
}

export default Support;
