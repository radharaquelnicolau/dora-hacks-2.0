import { Button } from "../../../components/ui/Button";

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return <main><h1>Welcome</h1><Button onClick={onNext}>Get started</Button></main>;
}
