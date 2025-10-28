import type { CodegenConfig } from "@graphql-codegen/cli";
import { env } from "./env";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [env.HASURA_GRAPHQL_ENDPOINT ?? "http://localhost:8080/v1/graphql"]: {
        headers: {
          "x-hasura-admin-secret": env.HASURA_ADMIN_SECRET ?? "",
        },
      },
    },
  ],
  documents: [
    "src/**/*.{ts,tsx,graphql}",
    "app/**/*.{ts,tsx,graphql}",
    "!src/generated/**",
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/generated/": {
      preset: "client",
			// plugins: ["typescript", "typescript-operations"],
    },
  },
};

export default config;