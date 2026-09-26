"use client";

import { Mic, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export default function VoiceAssistantPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  function startListening() {
    const SpeechRecognition = (window as typeof window & { SpeechRecognition?: new () => { start: () => void; stop: () => void; onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void } }).SpeechRecognition;
    if (!SpeechRecognition) {
      setTranscript("Voice capture is not supported in this browser. Try Chrome or Edge.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => setTranscript(event.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    setTranscript("");
    setListening(true);
    recognition.start();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600"><Sparkles className="h-3.5 w-3.5" />Voice AI</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-900">Talk to your operations.</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">Ask for stock, summaries, or a guided action. Nothing changes inventory without your confirmation.</p>
      </div>
      <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center text-white shadow-xl">
        <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full border ${listening ? "border-violet-300 bg-violet-300/20 shadow-[0_0_60px_rgba(196,181,253,0.35)]" : "border-white/15 bg-white/5"}`}>
          <Mic className={`h-9 w-9 ${listening ? "animate-pulse text-violet-200" : "text-zinc-300"}`} />
        </div>
        <p className="mt-6 text-sm text-zinc-400">{listening ? "Listening..." : "Press and speak a command"}</p>
        <button type="button" onClick={startListening} disabled={listening} className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-60">
          {listening ? "Listening..." : "Start voice command"}
        </button>
        {transcript && <div className="mx-auto mt-7 max-w-lg rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-zinc-300">{transcript}</div>}
      </div>
      <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"><ShieldCheck className="h-5 w-5 shrink-0" /> Voice is a guided interface. The assistant must show the proposed action before any stock or order mutation.</div>
    </div>
  );
}
