# ProofGarden

**Onchain history, cultivated.**

ProofGarden turns verifiable wallet activity into a living ecosystem, then uses Orbis to transform that state into a continuously evolving visual world.

## Vision

Most blockchain interfaces reduce identity to addresses, balances, hashes and tables. ProofGarden explores a more human interface. Wallet state becomes growth, provenance becomes roots, and activity becomes an evolving habitat that remains connected to the data underneath it.

## Core experience

1. Connect an EIP-1193 browser wallet such as MetaMask.
2. Inspect live chain ID, balance, account nonce and latest observed block.
3. Switch to Base Sepolia for a safe test environment.
4. Sign a ProofGarden verification message. This does not move funds.
5. Watch the procedural specimen respond to verified state and activity.
6. Open the Orbis World Engine.
7. Connect to Orbis and generate a continuous world grounded in the current garden state.
8. Steer, pause, resume and reset the live Orbis generation.

## Architecture

```text
Browser wallet
    |
    v
EIP-1193 live state
    |
    v
ProofGarden vitality model
    |                 |
    v                 v
Procedural garden   Orbis prompt
                      |
                      v
                 Reactor API
                      |
                      v
               Continuous world
```

### Wallet layer

ProofGarden uses the browser wallet provider directly. The current build reads account identity, network, balance, transaction count and current block. A personal signature can be used to mark the specimen as verified.

### Testnet

The interactive test environment targets **Base Sepolia**, chain ID `84532`. The core experience does not require a transaction. ProofGarden does not pretend to mine tokens or fabricate onchain events. Test ETH is only needed if the user independently chooses to interact with testnet applications.

### Orbis

The original Orbis starter session architecture is preserved. Reactor JWT creation remains server side through `/api/token`. The live World Engine uses `reactor/visko-orbis-stable` and supports start, steer, pause, resume, reset, optional image conditioning and resolution selection.

## Design system

ProofGarden avoids the familiar neon Web3 dashboard language. Its visual system is inspired by botanical field notes, mineral pigments, archival paper and living terrain. Moss, clay, straw and soil tones create an identity that belongs to the product story.

Motion is tied to meaning. The procedural habitat breathes and sways as a representation of a living record. The hero specimen floats like an archived biological sample. Scroll moves the user from identity, to specimen, to world engine, then below the surface into the technical roots.

## Local setup

Requirements:

- Node.js 20 or newer
- npm
- A Reactor API key
- A browser wallet for the wallet experience

Install dependencies:

```bash
npm install
```

Create the local environment file:

```bash
cp .env.example .env.local
```

Add your Reactor key:

```env
REACTOR_API_KEY=your_reactor_api_key
```

`GEMINI_API_KEY` is optional and is only required by the optional Nano Banana starter routes.

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run typecheck
npm run build
npm start
```

## Vercel deployment

1. Import `Instators/proofgarden-orbis` into Vercel.
2. Add `REACTOR_API_KEY` under Project Settings, Environment Variables.
3. Add `GEMINI_API_KEY` only if the optional Gemini routes are used.
4. Deploy.
5. Update `metadataBase` in `app/layout.tsx` if your final production domain differs from the placeholder domain.

Never commit `.env.local` or API keys.

## Repository

GitHub: https://github.com/Instators/proofgarden-orbis

## Built for Orbis

ProofGarden is built from the official Orbis Online Challenge starter and keeps the Reactor integration central to the product experience.
