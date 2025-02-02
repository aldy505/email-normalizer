import { expect, test } from "vitest";
import { normalizeEmail } from "../src";

test.each([
	["john.doe+github@fastmail.com", "john.doe@fastmail.com"],
	["john.doe@fastmail.com", "john.doe@fastmail.com"],
	["john.doe+github@messagingengine.com", "john.doe@messagingengine.com"],
	["john.doe@messagingengine.com", "john.doe@messagingengine.com"],
	["john.doe+github@fastmail.fm", "john.doe@fastmail.fm"],
	["john.doe@fastmail.fm", "john.doe@fastmail.fm"],
	["John.Doe+123@icloud.com", "john.doe@icloud.com"],
	["John.Doe@icloud.com", "john.doe@icloud.com"],
	["John.Doe+123@me.com", "john.doe@me.com"],
	["John.Doe@me.com", "john.doe@me.com"],
	["john.doe+github@mac.com", "john.doe@mac.com"],
	["john.doe@mac.com", "john.doe@mac.com"],
	["john.doe@gmail.com", "johndoe@gmail.com"],
	["John.Doe+123@gmail.com", "johndoe@gmail.com"],
])("normalizeEmail('%s') returns '%s'", async (input, expected) => {
	await expect(normalizeEmail(input)).resolves.toStrictEqual(expected);
});

test.each([
	["github-actions+ignore@reinaldyrafli.com", "github@reinaldyrafli.com"],
	["david.cramer+github@sentry.io", "davidcramer@sentry.io"],
	["john.doe+github@lever.co", "john.doegithub@lever.co"],
	["john.doe@instagram.com", "john.doe@instagram.com"],
])(
	"normalizeEmail('%s', { resolveMX: true }) returns '%s'",
	async (input, expected) => {
		await expect(
			normalizeEmail(input, { resolveMX: true }),
		).resolves.toStrictEqual(expected);
	},
);
