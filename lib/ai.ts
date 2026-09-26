import { prisma } from "@/lib/prisma";

export type AiMode = "LOGISTICS" | "MANAGEMENT";

export type AiCapability = {
  id: string;
  name: string;
  description: string;
  status: "ready" | "planned";
  requiresApproval: boolean;
};

export type AiUserContext = {
  userId: string;
  role: "ADMIN" | "STAFF";
  mode: AiMode;
  capabilities: AiCapability[];
};

export const aiCapabilities: AiCapability[] = [
  {
    id: "stock-risk",
    name: "Stock risk detection",
    description: "Prioritize low-stock products and warehouse bottlenecks.",
    status: "ready",
    requiresApproval: false,
  },
  {
    id: "operations-plan",
    name: "Operations planning",
    description: "Turn inventory signals into a focused daily action plan.",
    status: "ready",
    requiresApproval: true,
  },
  {
    id: "voice-commands",
    name: "Voice commands",
    description: "Ask for stock levels, summaries, and guided actions by voice.",
    status: "ready",
    requiresApproval: true,
  },
  {
    id: "autonomous-tasks",
    name: "Supervised task agents",
    description: "Prepare repeatable tasks for approval before anything changes stock.",
    status: "planned",
    requiresApproval: true,
  },
  {
    id: "growth-insights",
    name: "Account growth insights",
    description: "Understand adoption, team momentum, and the next best workflow.",
    status: "ready",
    requiresApproval: false,
  },
];

export async function getAiUserContext(user: {
  userId: string;
  role: string;
}): Promise<AiUserContext> {
  const role = user.role === "ADMIN" ? "ADMIN" : "STAFF";
  return {
    userId: user.userId,
    role,
    mode: role === "ADMIN" ? "MANAGEMENT" : "LOGISTICS",
    capabilities: aiCapabilities.filter(
      (capability) => role === "ADMIN" || capability.id !== "operations-plan",
    ),
  };
}

export async function getAiSignals() {
  const [balances, receipts, deliveries] = await Promise.all([
    prisma.stockBalance.findMany({ include: { product: true, warehouse: true } }),
    prisma.stockDocument.count({ where: { type: "RECEIPT", status: "DRAFT" } }),
    prisma.stockDocument.count({ where: { type: "DELIVERY", status: "DRAFT" } }),
  ]);

  const lowStock = balances.filter(
    (balance) => balance.quantity <= Math.max(20, balance.product.reorderLevel),
  );

  return {
    lowStockCount: lowStock.length,
    pendingReceipts: receipts,
    pendingDeliveries: deliveries,
    topRisk: lowStock[0]
      ? `${lowStock[0].product.name} at ${lowStock[0].warehouse.name}`
      : "No immediate stock risks",
  };
}
