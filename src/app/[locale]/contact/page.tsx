import { getTranslations } from "next-intl/server";

async function Contact() {
  const t = await getTranslations("Primary");
  return <h1>Contact Page</h1>;
}

export default Contact;
