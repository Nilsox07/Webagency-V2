import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="text-6xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Seite nicht gefunden</h1>
      <p className="prose-text mx-auto mt-4 max-w-md">
        Diese Seite gibt es leider nicht (mehr). Vielleicht findest du, was du suchst, über die
        Startseite oder unsere Pakete.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/" size="lg">
          Zur Startseite
        </Button>
        <Button href="/preise" variant="secondary" size="lg">
          Pakete ansehen
        </Button>
      </div>
    </Container>
  );
}
