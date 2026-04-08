import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "./env";

export function getSanityClient() {
  if (!projectId) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
  });
}
