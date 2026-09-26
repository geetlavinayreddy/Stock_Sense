import { ArrowUpRight, Gauge, Users, Zap } from "lucide-react";

const insights = [
  { label: "Workflow adoption", value: "68%", note: "Receipts and deliveries are being tracked consistently.", icon: Gauge },
  { label: "Team momentum", value: "+24%", note: "More ledger activity compared with the previous period.", icon: Users },
  { label: "Automation opportunity", value: "3", note: "Repeatable workflows are ready for supervised agents.", icon: Zap },
];

export default function GrowthInsightsPage() {
  return <div className="space-y-8"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-600">Growth intelligence</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-900">Help the operation grow without losing control.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">Understand how your team uses StockSense and where better workflows can unlock the next level of performance.</p></div><div className="grid gap-4 md:grid-cols-3">{insights.map((insight) => { const Icon = insight.icon; return <div key={insight.label} className="rounded-2xl border border-zinc-200 bg-white/75 p-6 shadow-sm"><Icon className="h-5 w-5 text-violet-600" /><p className="mt-6 text-xs font-medium text-zinc-500">{insight.label}</p><p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-900">{insight.value}</p><p className="mt-3 text-sm leading-5 text-zinc-500">{insight.note}</p></div> })}</div><div className="rounded-2xl border border-zinc-200 bg-zinc-950 p-6 text-white"><div className="flex items-start gap-4"><div className="rounded-xl bg-white/10 p-3"><ArrowUpRight className="h-5 w-5 text-emerald-300" /></div><div><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">Next best move</p><h2 className="mt-2 text-xl font-semibold">Start with replenishment reviews.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">Use the Replenishment Scout to turn low-stock signals into a daily, manager-approved workflow.</p></div></div></div></div>;
}
