import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.HASURA_GRAPHQL_ENDPOINT ?? "http://localhost:8080/v1/graphql"]: {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET ?? "",
        },
      },
    },
  ],
  documents: ["src/**/*.{ts,tsx,graphql}"],
  generates: {
    "src/generated/graphql.ts": {
			plugins: ["typescript", "typescript-operations", "typed-document-node"],
			config: {
				fetcher: "graphql-request",
				exposeDocument: true,
				exposeQueryKeys: true,
				exposeMutationKeys: true,
				scalars: {
					uuid: "string",
					timestamptz: "string",
					jsonb: "Record<string, any>",
					numeric: "number",
				},
			},
		},
  },
}

export default config;