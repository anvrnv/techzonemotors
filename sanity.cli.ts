import { defineCliConfig } from "sanity/cli";

import { dataset, resolveProjectIdForSanityTools } from "./lib/sanity/env";

export default defineCliConfig({
  api: {
    projectId: resolveProjectIdForSanityTools(),
    dataset,
  },
});
