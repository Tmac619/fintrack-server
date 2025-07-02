// start-server.js
import { spawn } from "child_process";

const child = spawn("npx", ["tsx", "server/index.ts"], {
  stdio: "inherit",
  shell: true,
});
