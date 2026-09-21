"use client";

import { ReactorProvider } from "@reactor-team/js-sdk";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GardenCanvas } from "@/components/garden-canvas";
import { OrbisControls } from "@/components/orbis-controls";
import { OrbisPlayer } from "@/components/orbis-player";
import { ProofGardenMark } from "@/components/proofgarden-mark";
import { useOrbisSession } from "@/hooks/use-orbis-session";
import { useWalletGarden } from "@/hooks/use-wallet-garden";
import { BASE_SEPOLIA, shortAddress } from "@/lib/wallet";
import { ORBIS_MODEL_NAME, ORBIS_TRACKS, requestReactorJwt } from "@/lib/orbis";

export function ProofGardenApp() {
  const wallet = useWalletGarden();
  const [seed, setSeed] = useState(3);
  const [studioOpen, setStudioOpen] = useState(false);
  const gardenPrompt = useMemo(() => {
    const identity = wallet.connected ? `verified wallet ${shortAddress(wallet.address)}` : "an unconnected visitor";
    return `A continuous living botanical world representing ${identity}. Warm mineral soil, sculptural native plants, subtle water channels and soft atmospheric light. The garden has vitality ${wallet.vitality} out of 100, transaction count ${wallet.nonce}, and current observed block ${wallet.block}. Growth should feel ecological, tactile and cinematic. No text, no logos, no interface elements. Slow camera drift, natural movement, grounded premium art direction.`;
  }, [wallet.address, wallet.block, wallet.connected, wallet.nonce, wallet.vitality]);

  return (
    <main className="site-shell">
      <nav className="topbar">
        <a href="#top" className="brand-link"><ProofGardenMark /></a>
        <div className="nav-links">
          <a href="#garden">Garden</a><a href="#how">How it works</a><a href="#about">About</a>
          <button className="nav-wallet" onClick={wallet.connect} disabled={wallet.busy}>{wallet.connected ? shortAddress(wallet.address) : "Connect wallet"}</button>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-index">PG / 001</div>
        <div className="hero-copy">
          <p className="kicker">A living record of onchain participation</p>
          <h1>Your history<br /><em>leaves roots.</em></h1>
          <p className="hero-lede">ProofGarden turns wallet activity into a living ecosystem. Connect a wallet, verify its state, then let Orbis translate that activity into a world that grows with you.</p>
          <div className="hero-actions">
            <a className="primary-link" href="#garden">Enter the garden <span>↘</span></a>
            <a className="text-link" href="#about">Read the field notes</a>
          </div>
        </div>
        <div className="hero-specimen" aria-hidden="true">
          <div className="orbital orbital-one" /><div className="orbital orbital-two" />
          <div className="seed-core"><ProofGardenMark compact /></div>
          <span className="specimen-label label-a">identity / activity</span>
          <span className="specimen-label label-b">growth / memory</span>
        </div>
        <div className="scroll-note">Scroll to cultivate</div>
      </section>

      <section className="manifesto" id="how">
        <p className="section-number">01 / PRINCIPLE</p>
        <h2>A wallet should tell a story,<br />not read like a spreadsheet.</h2>
        <div className="manifesto-grid">
          <p>ProofGarden treats onchain activity as material. Transactions become growth signals. Verification becomes provenance. The result is an explorable record that feels personal without hiding the data beneath it.</p>
          <div className="event-key"><span>TRANSFER</span><b>forms pathways</b><span>CONTRACT</span><b>builds structure</b><span>VERIFICATION</span><b>deepens roots</b><span>ACTIVITY</span><b>raises vitality</b></div>
        </div>
      </section>

      <section className="garden-lab" id="garden">
        <div className="lab-heading">
          <div><p className="section-number">02 / LIVE SPECIMEN</p><h2>Grow from proof.</h2></div>
          <p>Real wallet state shapes the specimen. Orbis gives it motion.</p>
        </div>
        <div className="lab-grid">
          <div className="garden-stage">
            <GardenCanvas vitality={wallet.vitality} active={wallet.connected} seed={seed} />
            <div className="stage-top"><span>SPECIMEN {wallet.connected ? shortAddress(wallet.address) : "UNCLAIMED"}</span><span>VITALITY {wallet.vitality}%</span></div>
            <div className="stage-bottom"><span>BLOCK {wallet.block || "WAITING"}</span><button onClick={() => setSeed((value) => value + 1)}>Recompose habitat</button></div>
          </div>
          <aside className="wallet-panel">
            <div className="panel-head"><span>PROVENANCE CONSOLE</span><i className={wallet.connected ? "live-dot active" : "live-dot"} /></div>
            <div className="identity-card"><small>IDENTITY</small><strong>{wallet.connected ? shortAddress(wallet.address) : "No wallet connected"}</strong><span>{wallet.chainId ? `Chain ${wallet.chainId}` : "Connect to begin"}</span></div>
            <div className="metric-grid"><div><small>ACTIVITY</small><strong>{wallet.nonce}</strong><span>account nonce</span></div><div><small>BALANCE</small><strong>{wallet.balance}</strong><span>ETH</span></div><div><small>VITALITY</small><strong>{wallet.vitality}</strong><span>growth index</span></div><div><small>PROOF</small><strong>{wallet.verified ? "SIGNED" : "OPEN"}</strong><span>wallet signature</span></div></div>
            {!wallet.connected ? <button className="panel-action" onClick={wallet.connect} disabled={wallet.busy}>Connect wallet</button> : !wallet.onTargetTestnet ? <button className="panel-action" onClick={wallet.switchToTestnet} disabled={wallet.busy}>Switch to Base Sepolia</button> : !wallet.verified ? <button className="panel-action" onClick={wallet.verify} disabled={wallet.busy}>Sign garden proof</button> : <button className="panel-action" onClick={() => void wallet.refresh()} disabled={wallet.busy}>Refresh onchain state</button>}
            <a className="faucet-link" href="https://www.coinbase.com/faucets/base-ethereum-goerli-faucet" target="_blank" rel="noreferrer">Need test ETH? Open a Base faucet ↗</a>
            {wallet.error && <p className="wallet-error">{wallet.error}</p>}
            <div className="network-note"><span>TEST NETWORK</span><b>{BASE_SEPOLIA.name}</b><p>ProofGarden reads live wallet state. It does not fake mining or transactions. Testnet funds are only needed when you choose to interact with testnet apps.</p></div>
          </aside>
        </div>
      </section>

      <section className="orbis-section">
        <div className="orbis-intro"><p className="section-number">03 / ORBIS WORLD ENGINE</p><h2>Turn the specimen<br />into a living world.</h2><p>The garden state becomes a grounded visual prompt. Connect to Orbis, start the world, then steer it while it runs.</p><button className="primary-link button-link" onClick={() => setStudioOpen(true)}>Open world engine <span>↗</span></button></div>
        <div className="orbis-visual"><div className="world-window"><GardenCanvas vitality={Math.min(100, wallet.vitality + 18)} active seed={seed + 9} /><div className="world-caption">ORGANIC STATE / CONTINUOUS</div></div></div>
      </section>

      <section className="roots" id="about">
        <div className="root-line root-line-a" /><div className="root-line root-line-b" />
        <p className="section-number">04 / BELOW THE SURFACE</p><h2>The roots are<br />the architecture.</h2>
        <div className="architecture"><div><span>01</span><b>Wallet</b><p>EIP-1193 connection reads identity, network, balance and account activity.</p></div><div><span>02</span><b>Proof</b><p>A wallet signature establishes user controlled provenance without moving funds.</p></div><div><span>03</span><b>Garden state</b><p>Activity becomes a deterministic vitality model and procedural visual system.</p></div><div><span>04</span><b>Orbis</b><p>The state is translated into a continuous world prompt that can evolve live.</p></div></div>
        <div className="about-copy"><h3>About ProofGarden</h3><p>ProofGarden explores a more human interface for Web3 history. Instead of reducing participation to rows, hashes and balances, it makes activity spatial, memorable and inspectable. The live experience combines real wallet state, a procedural garden and the Orbis continuous generation engine.</p><p>Connect a wallet, switch to Base Sepolia if you want a safe test environment, sign the proof, inspect your live state, then open the Orbis engine. No transaction is required to explore the core experience.</p></div>
      </section>

      <footer><ProofGardenMark /><p>Onchain history, cultivated.</p><a href="https://github.com/Instators/proofgarden-orbis" target="_blank" rel="noreferrer">Repository ↗</a></footer>

      {studioOpen && <OrbisStudio prompt={gardenPrompt} onClose={() => setStudioOpen(false)} />}
    </main>
  );
}

function OrbisStudio({ prompt, onClose }: { prompt: string; onClose: () => void }) {
  const jwtPromise = useRef<Promise<string> | null>(null);
  const currentJwt = useRef<string | null>(null);
  const getJwt = useCallback(async () => {
    const pending = (jwtPromise.current ??= requestReactorJwt());
    try { const jwt = await pending; currentJwt.current = jwt; return jwt; }
    catch (error) { if (jwtPromise.current === pending) jwtPromise.current = null; throw error; }
  }, []);
  const getCurrentJwt = useCallback(() => currentJwt.current, []);
  const clearJwt = useCallback(() => { jwtPromise.current = null; currentJwt.current = null; }, []);
  return <div className="studio-overlay"><div className="studio-modal"><button className="studio-close" onClick={onClose}>Close ×</button><ReactorProvider apiUrl="https://api.reactor.inc" modelName={ORBIS_MODEL_NAME} modelTracks={[...ORBIS_TRACKS]} connectOptions={{ autoConnect: false }} jwtToken={getJwt}><StudioSession clearJwt={clearJwt} getCurrentJwt={getCurrentJwt} initialPrompt={prompt} /></ReactorProvider></div></div>;
}

function StudioSession({ clearJwt, getCurrentJwt, initialPrompt }: { clearJwt: () => void; getCurrentJwt: () => string | null; initialPrompt: string }) {
  const session = useOrbisSession(clearJwt, getCurrentJwt);
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      session.setPrompt(initialPrompt);
      initialized.current = true;
    }
  }, [initialPrompt, session]);
  return <><div className="studio-heading"><span>PROOFGARDEN / ORBIS</span><h3>World Engine</h3></div><div className="session-grid"><OrbisPlayer connected={session.connected} muted={session.muted} runStarted={session.runStarted} status={session.status} /><OrbisControls session={session} /></div></>;
}
