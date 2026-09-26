export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DocumentStatus, DocumentType } from "@prisma/client";
import { 
  ArrowRight,
  Package,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  Activity
} from "lucide-react";

async function getStats() {
  const [productCount, balances, pendingReceipts, pendingDeliveries] = await Promise.all([
    prisma.product.count(),
    prisma.stockBalance.findMany({ include: { product: true } }),
    prisma.stockDocument.count({
      where: { type: DocumentType.RECEIPT, status: DocumentStatus.DRAFT },
    }),
    prisma.stockDocument.count({
      where: { type: DocumentType.DELIVERY, status: DocumentStatus.DRAFT },
    }),
  ]);

  const lowStock = balances.filter((b) => b.quantity <= Math.max(20, b.product.reorderLevel)).length;

  return { productCount, lowStock, pendingReceipts, pendingDeliveries };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const metrics = [
    { label: "Total Products", value: stats.productCount, icon: Package, href: "/stock", color: "text-blue-600", bg: "bg-blue-100/50" },
    { label: "Low Stock Items", value: stats.lowStock, icon: AlertTriangle, href: "/stock?filter=low", color: "text-amber-600", bg: "bg-amber-100/50" },
    { label: "Pending Receipts", value: stats.pendingReceipts, icon: ArrowDownToLine, href: "/orders/receipts", color: "text-emerald-600", bg: "bg-emerald-100/50" },
    { label: "Pending Deliveries", value: stats.pendingDeliveries, icon: ArrowUpFromLine, href: "/orders/deliveries", color: "text-indigo-600", bg: "bg-indigo-100/50" },
  ];

  const shortcuts = [
    { href: "/stock", title: "View Stock Levels", desc: "Check real-time quantities across all warehouses", icon: Package },
    { href: "/orders/receipts/new", title: "Receive Goods", desc: "Log incoming vendor shipments", icon: ArrowDownToLine },
    { href: "/orders/deliveries/new", title: "Dispatch Delivery", desc: "Process outgoing customer orders", icon: ArrowUpFromLine },
    { href: "/history", title: "Audit Ledger", desc: "Trace every stock movement", icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-7 text-white shadow-xl shadow-zinc-900/10 sm:px-8">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute -bottom-32 right-32 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">Operations overview</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Good morning, let&apos;s keep stock moving.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">Your inventory operations snapshot for today, with the signals that need attention first.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.label}
              href={metric.href}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/75 p-5 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${metric.bg}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <p className="text-3xl font-semibold tracking-[-0.04em] text-zinc-900">{metric.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="pt-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Shortcuts</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900">Quick Actions</h2>
          </div>
          <span className="hidden text-xs text-zinc-400 sm:block">Move faster with one click</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-50 border border-zinc-100 group-hover:bg-white transition-colors">
                  <Icon className="h-5 w-5 text-zinc-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-zinc-900">{item.title}</p>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
                <div className="pr-2 text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-zinc-600">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
