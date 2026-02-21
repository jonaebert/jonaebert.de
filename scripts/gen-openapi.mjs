import "dotenv/config";
import { execSync } from "node:child_process";

// Determine the base URL for the API from environment variables
const base =
  process.env.VITE_JE_API_BASE_URL ??
  "";

if (!base) {
  console.error(
    "Missing VITE_JE_API_BASE_URL in .env"
  );
  process.exit(1);
}

// Construct the full URL to the OpenAPI JSON
const url = new URL("openapi.json", base.endsWith("/") ? base : base + "/").toString();

console.log("Generating OpenAPI types from:", url);

// Execute the openapi-typescript command to generate the types
execSync(
  `npx openapi-typescript "${url}" -o src/lib/api/openapi.ts`,
  { stdio: "inherit" }
);
