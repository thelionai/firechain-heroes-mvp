"use client";
import { useState, useEffect } from "react";
import { X, Wallet, QrCode, Loader2, CheckCircle, Copy, ShieldCheck } from "lucide-react";
import { useAccount, useConnect } from "wagmi";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  nftName: string;
  amountPen: number;
  amountNative: string;
};

type PaymentState = "idle" | "paying" | "verifying" | "minting" | "done";

export default function PaymentModal({ open, onClose, nftName, amountPen, amountNative }: PaymentModalProps) {
  const [method, setMethod] = useState<"wallet" | "yape" | null>(null);
  const [state, setState] = useState<PaymentState>("idle");
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setMethod(null);
      setState("idle");
    }
  }, [open]);

  const handlePayment = async () => {
    setState("paying");
    // Simulate payment process
    setTimeout(() => {
      setState("verifying");
      setTimeout(() => {
        setState("minting");
        setTimeout(() => {
          setState("done");
        }, 2000);
      }, 2000);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-md relative overflow-hidden animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {state === "done" ? (
          /* SUCCESS STATE */
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--fc-teal)]/20 rounded-full flex items-center justify-center mb-6 animate-bounce-small">
              <CheckCircle className="w-10 h-10 text-[var(--fc-teal)]" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Donación Exitosa!</h2>
            <p className="text-[var(--fc-text-muted)] mb-6">
              Has adquirido <strong className="text-white">{nftName}</strong>
            </p>

            <div className="bg-white/5 rounded-xl p-4 w-full mb-6 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-[var(--fc-red)]" />
                <span className="font-bold text-white">Impacto Real</span>
              </div>
              <p className="text-sm text-[var(--fc-text-muted)] text-left">
                Tu donación ha sido destinada directamente al fondo de equipamiento de la estación. ¡Gracias por ser un héroe!
              </p>
            </div>

            <button onClick={onClose} className="btn-primary w-full">
              Ver mi NFT
            </button>
          </div>
        ) : (
          /* PAYMENT FLOW */
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-1">Completar Donación</h2>
            <p className="text-sm text-[var(--fc-text-muted)] mb-6">Estás adquiriendo: {nftName}</p>

            {state === "idle" ? (
              <div className="space-y-4">
                <button
                  onClick={() => setMethod("wallet")}
                  className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${method === "wallet" ? "bg-[var(--fc-teal)]/10 border-[var(--fc-teal)]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--fc-teal)]/20 flex items-center justify-center text-[var(--fc-teal)]">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Wallet (Cripto)</div>
                    <div className="text-xs text-[var(--fc-text-muted)]">{amountNative}</div>
                  </div>
                </button>

                <button
                  onClick={() => setMethod("yape")}
                  className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${method === "yape" ? "bg-[var(--fc-teal)]/10 border-[var(--fc-teal)]" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white">Yape / Plin</div>
                    <div className="text-xs text-[var(--fc-text-muted)]">S/. {amountPen.toFixed(2)}</div>
                  </div>
                </button>

                {method === "yape" && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-center animate-fade-in">
                    <div className="w-32 h-32 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-black" />
                    </div>
                    <p className="text-xs text-[var(--fc-text-muted)] mb-2">Escanea el QR o envía a:</p>
                    <div className="flex items-center justify-center gap-2 bg-black/30 p-2 rounded-lg cursor-pointer hover:bg-black/50 transition-colors">
                      <span className="font-mono text-white font-bold">999 123 456</span>
                      <Copy className="w-3 h-3 text-[var(--fc-text-muted)]" />
                    </div>
                  </div>
                )}

                <button
                  disabled={!method}
                  onClick={handlePayment}
                  className="w-full btn-primary mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {method === "wallet" ? "Pagar con Wallet" : "Ya realicé el pago"}
                </button>
              </div>
            ) : (
              /* PROCESSING STATES */
              <div className="py-12 text-center">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[var(--fc-teal)] rounded-full border-t-transparent animate-spin"></div>
                  <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-[var(--fc-teal)] animate-pulse" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {state === "paying" && "Procesando Pago..."}
                  {state === "verifying" && "Verificando Transacción..."}
                  {state === "minting" && "Minteando tu NFT..."}
                </h3>
                <p className="text-[var(--fc-text-muted)] text-sm max-w-xs mx-auto">
                  {state === "paying" && "Por favor confirma la transacción en tu billetera."}
                  {state === "verifying" && "Estamos confirmando la recepción de los fondos."}
                  {state === "minting" && "Generando tu certificado digital único en la blockchain."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
