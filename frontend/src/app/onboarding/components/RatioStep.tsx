import { Button } from "../../../components/ui/Button";

export function RatioStep({ onComplete }: { onComplete: () => void }) {
  return <main><h1>Set your spending ratio</h1><Button onClick={onComplete}>Finish</Button></main>;
}
