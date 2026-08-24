import { Button } from "../../../components/ui/Button";
import type { PayCadence } from "../../../types";

export function CadenceStep({ onNext, cadence = "monthly" }: { onNext: (cadence?: PayCadence) => void; cadence?: PayCadence }) {
  return <main><h1>Choose your cadence</h1><Button onClick={() => onNext(cadence)}>Continue</Button></main>;
}
