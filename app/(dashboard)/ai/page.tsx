import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Mic,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { getAiSignals, getAiUserContext } from "@/lib/ai";

export const dynamic = "force-dynamic";

export default async function AiCommandCenterPage() {
  const session = await getSession();
  if (!session) return null;

  const [context, signals] = await Promise.all([
    getAiUserContext({ userId: session.userId, role: session.role }),
    getAiSignals(),
  ]);
  const isManagement = context.mode === "MANAGEMENT";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-7 text-white shadow-xl shadow-zinc-900/10 sm:px-8">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-300/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              AI command center
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              One operating system for every decision.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
              StockSense maps the right intelligence to your role, turning live warehouse signals into clear, reviewable next steps.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Active mode</span>
            <span className="mt-1 block font-medium">{isManagement ? "Management intelligence" : "Logistics intelligence"}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Low-stock signals", value: signals.lowStockCount, href: "/stock?filter=low" },
          { label: "Receipts to review", value: signals.pendingReceipts, href: "/orders/receipts" },
          { label: "Deliveries to review", value: signals.pendingDeliveries, href: "/orders/deliveries" },
        ].map((signal) => (
          <Link key={signal.label} href={signal.href} className="rounded-2xl border border-zinc-200 bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <p className="text-xs font-medium text-zinc-500">{signal.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-900">{signal.value}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white/75 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Mapped for you</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
                {isManagement ? "Management AI" : "Logistics AI"}
              </h2>
            </div>
            <div className="rounded-xl bg-zinc-100 p-3">
              {isManagement ? <BriefcaseBusiness className="h-5 w-5 text-zinc-700" /> : <Route className="h-5 w-5 text-zinc-700" />}
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-zinc-500">
            {isManagement
              ? "See the health of operations, identify trends, and prepare high-confidence decisions for your team."
              : "Focus on stock movement, warehouse priorities, and the next action that keeps work flowing."}
          </p>
          <div className="mt-6 rounded-xl bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Current signal</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">{signals.topRisk}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white/75 p-6 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Safety by design</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">Human approval stays in control.</h2>
          <div className="mt-5 space-y-4">
            {[
              { icon: ShieldCheck, text: "No AI action changes stock without approval." },
              { icon: Bot, text: "Agents will leave an auditable activity trail." },
              { icon: CheckCircle2, text: "Voice actions will confirm before execution." },
            ].map((item) => {
              const Icon = item.icon;
              return <div key={item.text} className="flex gap-3 text-sm leading-5 text-zinc-600"><Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{item.text}</div>;
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Roadmap modules</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">Capabilities arriving in stages</h2>
          </div>
          <span className="hidden text-xs text-zinc-400 sm:block">Built around your workflow</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {context.capabilities.map((capability) => (
            <div key={capability.id} className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white/75 p-5 shadow-sm">
              <div className="rounded-xl bg-zinc-100 p-3">
                {capability.id === "voice-commands" ? <Mic className="h-5 w-5 text-zinc-700" /> : <Bot className="h-5 w-5 text-zinc-700" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium text-zinc-900">{capability.name}</h3>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${capability.status === "ready" ? "text-emerald-600" : "text-zinc-400"}`}>
                    {capability.status}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-5 text-zinc-500">{capability.description}</p>
                {capability.status === "planned" && <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-zinc-500">Coming next <ArrowRight className="h-3 w-3" /></span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
