"use client";

import { ReactorView } from "@reactor-team/js-sdk";

type OrbisPlayerProps = {
  connected: boolean;
  muted: boolean;
  runStarted: boolean;
  status: string;
};

export function OrbisPlayer({ connected, muted, runStarted, status }: OrbisPlayerProps) {
  return (
    <div className="player">
      {connected ? (
        <>
          <ReactorView
            track="main_video"
            audioTrack="main_audio"
            muted={muted}
            videoObjectFit="contain"
          />
          {!runStarted && (
            <div className="player-idle-overlay">Configure and start a run</div>
          )}
        </>
      ) : (
        <div className="player-placeholder">Connect to Orbis Stable</div>
      )}
      <span className={`status status-${status}`}>{status}</span>
    </div>
  );
}
