import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	entries: ["src/index.ts"],
	declaration: "compatible",
	sourcemap: true,
	clean: true,
});
