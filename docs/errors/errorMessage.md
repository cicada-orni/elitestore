$ npx prisma db seed
Environment variables loaded from .env
Running seed command `ts-node --project prisma/tsconfig.seed.json prisma/seed.ts` ...
C:\Users\ranaf\Documents\Full-Stack-Development\elitestore\node_modules\.prisma\client\default.js:43
throw new Error('@prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.');
^
Error: @prisma/client did not initialize yet. Please run "prisma generate" and try to import it again.
at new PrismaClient (C:\Users\ranaf\Documents\Full-Stack-Development\elitestore\node_modules\.prisma\client\default.js:43:11)
at Object.<anonymous> (C:\Users\ranaf\Documents\Full-Stack-Development\elitestore\prisma\seed.ts:7:16)
at Module.\_compile (node:internal/modules/cjs/loader:1554:14)
at Module.m.\_compile (C:\Users\ranaf\Documents\Full-Stack-Development\elitestore\node_modules\ts-node\src\index.ts:1618:23)  
 at node:internal/modules/cjs/loader:1706:10
at Object.require.extensions.<computed> [as .ts] (C:\Users\ranaf\Documents\Full-Stack-Development\elitestore\node_modules\ts-node\src\index.ts:1621:12)
at Module.load (node:internal/modules/cjs/loader:1289:32)
at Function.\_load (node:internal/modules/cjs/loader:1108:12)
at TracingChannel.traceSync (node:diagnostics_channel:322:14)
at wrapModuleLoad (node:internal/modules/cjs/loader:220:24)

An error occurred while running the seed command:
Error: Command failed with exit code 1: ts-node --project prisma/tsconfig.seed.json prisma/seed.ts
