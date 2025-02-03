import { resolveMx } from "node:dns/promises";

function processApple(username: string, domain: string): string {
	// Remove plus subaddressing
	const usernameWithoutSubaddressing = username.indexOf("+");
	if (usernameWithoutSubaddressing > -1) {
		return `${username.toLowerCase().substring(0, usernameWithoutSubaddressing)}@${domain}`;
	}

	return `${username.toLowerCase()}@${domain}`;
}

function processFastmail(username: string, domain: string): string {
	// Remove plus subaddressing
	const usernameWithoutSubaddressing = username.indexOf("+");
	if (usernameWithoutSubaddressing > -1) {
		return `${username.toLowerCase().substring(0, usernameWithoutSubaddressing)}@${domain}`;
	}

	return `${username.toLowerCase()}@${domain}`;
}

function processGoogle(
	username: string,
	domain: string,
	customDomain = false,
): string {
	const finalDomain = customDomain
		? domain
		: domain === "google.com"
			? "google.com"
			: "gmail.com";
	// Remove `.` and `+` subaddressing
	const usernameWithoutSubaddressing = username.indexOf("+");
	if (usernameWithoutSubaddressing > -1) {
		return `${username
			.toLowerCase()
			.substring(0, usernameWithoutSubaddressing)
			.replace(/\./g, "")}@${finalDomain}`;
	}

	return `${username.toLowerCase().replace(/\./g, "")}@${finalDomain}`;
}

function processMicrosoft(username: string, domain: string): string {
	// Remove the `+` sign
	return `${username.toLowerCase().replace(/\+/g, "")}@${domain}`;
}

function processProton(username: string, domain: string): string {
	const usernameWithoutSubaddressing = username.indexOf("+");
	if (usernameWithoutSubaddressing > -1) {
		return `${username
			.toLowerCase()
			.substring(0, usernameWithoutSubaddressing)
			.replace(/[._-]/g, "")}@${domain}`;
	}

	return `${username.toLowerCase().replace(/[._-]/g, "")}@${domain}`;
}

function processYahoo(username: string, domain: string): string {
	const usernameWithoutSubaddressing = username.indexOf("+");
	if (usernameWithoutSubaddressing > -1) {
		return `${username.toLowerCase().substring(0, usernameWithoutSubaddressing)}@${domain}`;
	}

	return `${username.toLowerCase()}@${domain}`;
}

function processYandex(username: string, domain: string): string {
	return `${username.toLowerCase().replace(/[+-]/g, "")}@${domain}`;
}

function processPurelymail(username: string, domain: string): string {
	// Everything after a symbol is ignored
	const usernameWithoutSubaddressing = /[\W]+/.exec(username);
	if (usernameWithoutSubaddressing != null) {
		return `${username.toLowerCase().slice(0, usernameWithoutSubaddressing.index)}@${domain}`;
	}

	return `${username.toLowerCase()}@${domain}`;
}

export type Options = {
	resolveMX: boolean;
};

/**
 * Return a normalized email address from the given input.
 * @param email Raw email input
 */

export async function normalizeEmail(
	email: string,
	options: Options = { resolveMX: false },
): Promise<string> {
	const [username, domain] = email.trim().split("@");
	if (username == null || username === "" || domain == null || domain === "") {
		// Invalid email address, return as it is
		return email;
	}

	switch (domain.toLowerCase()) {
		case "fastmail.com":
		case "messagingengine.com":
		case "fastmail.fm": {
			return processFastmail(username, domain);
		}
		case "icloud.com":
		case "me.com":
		case "mac.com": {
			return processApple(username, domain);
		}
		case "yahoo.com.ar":
		case "yahoo.com.au":
		case "yahoo.at":
		case "yahoo.be":
		case "yahoo.com.br":
		case "ca.yahoo.com":
		case "qc.yahoo.com":
		case "yahoo.com.co":
		case "yahoo.com.hr":
		case "yahoo.cz":
		case "yahoo.dk":
		case "yahoo.fi":
		case "yahoo.fr":
		case "yahoo.de":
		case "yahoo.gr":
		case "yahoo.com.hk":
		case "yahoo.hu":
		case "yahoo.co.in":
		case "yahoo.in":
		case "yahoo.co.id":
		case "yahoo.ie":
		case "yahoo.co.il":
		case "yahoo.it":
		case "yahoo.co.jp":
		case "yahoo.com.my":
		case "yahoo.com.mx":
		case "yahoo.ae":
		case "yahoo.nl":
		case "yahoo.co.nz":
		case "yahoo.no":
		case "yahoo.com.ph":
		case "yahoo.pl":
		case "yahoo.pt":
		case "yahoo.ro":
		case "yahoo.ru":
		case "yahoo.com.sg":
		case "yahoo.co.za":
		case "yahoo.es":
		case "yahoo.se":
		case "yahoo.ch/fr":
		case "yahoo.ch/de":
		case "yahoo.com.tw":
		case "yahoo.co.th":
		case "yahoo.com.tr":
		case "yahoo.co.uk":
		case "yahoo.com":
		case "yahoo.com.vn":
		case "ymail.com":
		case "yahoodns.net": {
			// Yahoo
			return processYahoo(username, domain);
		}
		case "gmail.com":
		case "googlemail.com":
		case "google.com": {
			// Google
			return processGoogle(username, domain);
		}
		case "hotmail.com":
		case "hotmail.at":
		case "hotmail.be":
		case "hotmail.ca":
		case "hotmail.cl":
		case "hotmail.co.il":
		case "hotmail.co.nz":
		case "hotmail.co.th":
		case "hotmail.co.uk":
		case "hotmail.com.ar":
		case "hotmail.com.au":
		case "hotmail.com.br":
		case "hotmail.com.gr":
		case "hotmail.com.mx":
		case "hotmail.com.pe":
		case "hotmail.com.tr":
		case "hotmail.com.vn":
		case "hotmail.cz":
		case "hotmail.de":
		case "hotmail.dk":
		case "hotmail.es":
		case "hotmail.fr":
		case "hotmail.hu":
		case "hotmail.id":
		case "hotmail.ie":
		case "hotmail.in":
		case "hotmail.it":
		case "hotmail.jp":
		case "hotmail.kr":
		case "hotmail.lv":
		case "hotmail.my":
		case "hotmail.ph":
		case "hotmail.pt":
		case "hotmail.sa":
		case "hotmail.sg":
		case "hotmail.sk":
		case "live.com":
		case "live.be":
		case "live.co.uk":
		case "live.com.ar":
		case "live.com.mx":
		case "live.de":
		case "live.es":
		case "live.eu":
		case "live.fr":
		case "live.it":
		case "live.nl":
		case "msn.com":
		case "outlook.com":
		case "outlook.at":
		case "outlook.be":
		case "outlook.cl":
		case "outlook.co.il":
		case "outlook.co.nz":
		case "outlook.co.th":
		case "outlook.com.ar":
		case "outlook.com.au":
		case "outlook.com.br":
		case "outlook.com.gr":
		case "outlook.com.pe":
		case "outlook.com.tr":
		case "outlook.com.vn":
		case "outlook.cz":
		case "outlook.de":
		case "outlook.dk":
		case "outlook.es":
		case "outlook.fr":
		case "outlook.hu":
		case "outlook.id":
		case "outlook.ie":
		case "outlook.in":
		case "outlook.it":
		case "outlook.jp":
		case "outlook.kr":
		case "outlook.lv":
		case "outlook.my":
		case "outlook.ph":
		case "outlook.pt":
		case "outlook.sa":
		case "outlook.sg":
		case "outlook.sk":
		case "passport.com": {
			// Microsoft
			return processMicrosoft(username, domain);
		}
		case "narod.ru":
		case "yandex.ru":
		case "yandex.org":
		case "yandex.net":
		case "yandex.net.ru":
		case "yandex.com.ru":
		case "yandex.ua":
		case "yandex.com.ua":
		case "yandex.by":
		case "yandex.eu":
		case "yandex.ee":
		case "yandex.lt":
		case "yandex.lv":
		case "yandex.md":
		case "yandex.uz":
		case "yandex.mx":
		case "yandex.do":
		case "yandex.tm":
		case "yandex.de":
		case "yandex.ie":
		case "yandex.in":
		case "yandex.qa":
		case "yandex.so":
		case "yandex.nu":
		case "yandex.tj":
		case "yandex.dk":
		case "yandex.es":
		case "yandex.pt":
		case "yandex.kz":
		case "yandex.pl":
		case "yandex.lu":
		case "yandex.it":
		case "yandex.az":
		case "yandex.ro":
		case "yandex.rs":
		case "yandex.sk":
		case "yandex.no":
		case "ya.ru":
		case "yandex.com":
		case "yandex.asia":
		case "yandex.mobi": {
			// Yandex
			return processYandex(username, domain);
		}
		case "protonmail.ch":
		case "protonmail.com":
		case "proton.me":
		case "pm.me": {
			// Proton
			return processProton(username, domain);
		}
		case "purelymail.com":
		case "cheapermail.com":
		case "placeq.com":
		case "rethinkmail.com":
		case "worldofmail.com": {
			return processPurelymail(username, domain);
		}
		default: {
			if (options.resolveMX) {
				const mxRecords = await resolveMx(domain);
				// Sort by highest priority
				const chosenExchange = mxRecords
					.sort((a, b) => a.priority - b.priority)
					.at(0)?.exchange;

				if (chosenExchange != null && chosenExchange !== "") {
					const hostname = chosenExchange
						.split(".")
						.slice(-2)
						.join(".")
						.toLowerCase();

					switch (hostname) {
						case "google.com":
							return processGoogle(username, domain, true);
						case "outlook.com":
						case "office365.us":
							return processMicrosoft(username, domain);
						case "purelymail.com":
							return processPurelymail(username, domain);
						case "protonmail.ch":
							return processProton(username, domain);
						case "messagingengine.com":
							return processFastmail(username, domain);
					}
				}
			}

			return `${username}@${domain.toLowerCase()}`;
		}
	}
}
