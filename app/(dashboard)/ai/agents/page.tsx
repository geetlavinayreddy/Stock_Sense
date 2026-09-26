import Link from "next/link";
import { ArrowRight, Bot, Clock3, ShieldCheck } from "lucide-react";

const agents = [
  { name: "Replenishment scout", description: "Find low-stock products and prepare a replenishment review.", status: "Ready for approval", cadence: "On demand" },
  { name: "Delivery coordinator", description: "Group pending deliveries by urgency and warehouse.", status: "Ready for approval", cadence: "Daily" },
  { name: "Ledger guardian", description: "Flag unusual movements for a manager to inspect.", status: "Monitoring", cadence: "Continuous" },
];

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">Supervised automation</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-900">Task agents that never run unattended.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">Agents prepare work, explain their reasoning, and wait for an authorized person before changing the system.</p></div>
      <div className="grid gap-4">
        {agents.map((agent) => <div key={agent.name} className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white/75 p-6 shadow-sm sm:flex-row sm:items-center"><div className="rounded-xl bg-zinc-100 p-3"><Bot className="h-5 w-5 text-zinc-700" /></div><div className="flex-1"><h2 className="font-semibold text-zinc-900">{agent.name}</h2><p className="mt-1 text-sm text-zinc-500">{agent.description}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-400"><span className="inline-flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />{agent.status}</span><span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{agent.cadence}</span></div></div><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50">Review scope <ArrowRight className="h-4 w-4" /></button></div>)}
      </div>
      <Link href="/ai" className="text-sm font-medium text-zinc-600 hover:text-zinc-950">Back to AI Center</Link>
    </div>
  );
}
