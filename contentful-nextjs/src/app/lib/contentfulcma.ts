import { createClient } from "contentful-management";

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN as string,
});

export default managementClient;
