import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div
      className="
   "
    >
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive" size="sm">
        Destructive
      </Button>
      <Button variant="ghost" size="sm">
        Ghost
      </Button>
      <Button variant="muted">Muted</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="teritary">Teritary</Button>
    </div>
  );
}
