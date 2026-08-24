import Button from "@/components/ui/Button";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 gap-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-display text-cream">Slice your paycheck.</h1>
        <h1 className="text-4xl font-display text-gold">Own your money.</h1>
        <p className="text-muted mt-2 text-sm leading-relaxed">
          Pie helps students with irregular income budget smarter — split every dollar into needs, wants, savings, and debt.
        </p>
      </div>
      <Button onClick={onNext} className="w-full max-w-xs">Get started</Button>
    </main>
  );
}
