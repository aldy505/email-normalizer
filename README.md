# Email Normalization

Yet another email normalizer library. It occured to me that there are no correct library for NodeJS that does the job really well as I want it to be. This is an attempt to create one.

## Usage

```typescript
import { normalizeEmail } from "./src"; 

const normalizedEmail = normalizeEmail("john.doe+github@fastmail.com");
// john.doe@fastmail.com
```

## Options

### resolveMX

Resolve MX records to get the correct email hosting provider and follow their normalization rules.

```typescript
import { normalizeEmail } from "./src";

const normalizeEmail = normalizeEmail("john.doe+marketing@soundcloud.com", { resolveMX: true });
// johndoe@soundcloud.com -- because they use Google for email hosting
```

## License

[MIT](./LICENSE)