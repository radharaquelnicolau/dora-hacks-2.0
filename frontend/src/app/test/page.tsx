import Donut from "@/components/ui/Donut";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "@/components/ui/Button";

export default function TestPage() {
  return (
    <div className="p-8 space-y-6 max-w-sm mx-auto">
      <Donut ratios={{ needs: 45, wants: 20, savings: 20, debt: 15 }} />
      <Card><Pill category="wants" /></Card>
      <ProgressBar value={60} max={100} color="#6c63ff" />
      <Button>Get started</Button>
    </div>
  );
}