"use client";

import { Eye, EyeOff, Loader2, Package2 } from "lucide-react";
import { useState, useRef } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f7f6f2] selection:bg-zinc-900 selection:text-white">
      {/* Left Pane - Visual */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative hidden w-0 flex-1 overflow-hidden bg-[#101111] lg:block group cursor-default"
      >
        <div className="absolute left-12 top-10 z-10 flex items-center gap-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-lg shadow-black/20 backdrop-blur">
            <Package2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">StockSense</span>
        </div>
        {/* Base dim pattern */}
        <div 
          className="absolute inset-0 h-full w-full opacity-20 transition-opacity duration-700 group-hover:opacity-10" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
        
        {/* Interactive glowing pattern revealed by mouse mask */}
        <div 
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            WebkitMaskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
            maskImage: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          }}
        />

        {/* Soft radial glow blob behind the pattern */}
        <div
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 50%)`
          }}
        />

        {/* Bottom gradient fade so text is readable */}
        <div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-emerald-300/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="absolute -left-24 bottom-28 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101111] via-[#101111]/45 to-transparent pointer-events-none" />
        
        {/* Text Content */}
        <div className="absolute bottom-12 left-12 right-12 z-10 text-white transition-transform duration-500 ease-out group-hover:-translate-y-2 pointer-events-none">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 transition-colors duration-500 group-hover:bg-white/10 group-hover:border-white/20">
            <Package2 className="h-6 w-6 text-white transition-transform duration-500 group-hover:scale-110" />
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">Operational clarity</p>
          <h2 className="text-4xl font-medium tracking-[-0.04em]">Supply chain, simplified.</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400 transition-colors duration-500 group-hover:text-zinc-300">
            StockSense brings clarity to your warehouse operations with real-time stock ledgers and modular inventory control.
          </p>
          <div className="mt-8 flex gap-8 border-t border-white/10 pt-5 text-xs text-zinc-400">
            <span><strong className="block text-lg font-medium text-white">Live</strong>stock visibility</span>
            <span><strong className="block text-lg font-medium text-white">100%</strong>auditable movements</span>
          </div>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="relative flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="relative mx-auto w-full max-w-[380px] lg:w-[380px]">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 shadow-lg shadow-zinc-950/10">
              <Package2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-zinc-950">StockSense</span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">Secure access</span>
          </div>

          <div className="animate-[auth-enter_500ms_ease-out_both]">
            <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">Welcome to StockSense</span>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{title}</h2>
            {subtitle && (
              <p className="mt-3 max-w-sm text-[14px] leading-6 text-zinc-500">{subtitle}</p>
            )}
          </div>

          <div className="mt-9 animate-[auth-enter_600ms_100ms_ease-out_both]">
            <div>
              {children}
            </div>
            
            {footer && (
              <div className="mt-9 text-center text-[13px] text-zinc-500">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const authInputClass =
  "block w-full appearance-none rounded-xl border border-zinc-200/90 bg-white/75 px-3.5 py-3 text-[14px] text-zinc-900 placeholder-zinc-400 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all focus:bg-white focus:border-zinc-950 focus:outline-none focus:ring-4 focus:ring-zinc-950/10 hover:border-zinc-300 hover:bg-white sm:text-[14px]";

export const authButtonClass =
  "flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(24,24,27,0.16)] hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-950/20 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_12px_24px_rgba(24,24,27,0.2)] active:translate-y-0 active:shadow-sm";

export const authLabelClass = "mb-2 block text-[12px] font-semibold tracking-wide text-zinc-700";

export function PasswordInput({
  id,
  className = authInputClass,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input {...props} id={id} type={visible ? "text" : "password"} className={`${className} pr-11`} />
      <button
        type="button"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={() => setVisible((current) => !current)}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-900 focus:outline-none focus:text-zinc-900"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function AuthLoadingIcon() {
  return <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />;
}
