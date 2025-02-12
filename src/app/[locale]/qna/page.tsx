import { getTranslations } from "next-intl/server";

async function QnA() {
  const t = await getTranslations("Primary");
  return <h1>Q&A Page</h1>;
}

export default QnA;
