import Link from "next/link";
import { Container, ShimmerText } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-4 py-24">
      <Container className="flex flex-col items-center text-center">
        <p className="font-display text-7xl font-extrabold text-marigold/30 md:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight md:text-5xl">
          This page <ShimmerText>wandered off</ShimmerText>
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/past-papers" variant="outline">
            Browse past papers
          </Button>
        </div>
        <nav className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/courses" className="text-marigold-deep hover:underline">
            Courses
          </Link>
          <Link href="/books" className="text-marigold-deep hover:underline">
            Books
          </Link>
          <Link href="/examiner-tips" className="text-marigold-deep hover:underline">
            Examiner Tips
          </Link>
          <Link href="/contact" className="text-marigold-deep hover:underline">
            Contact
          </Link>
        </nav>
      </Container>
    </section>
  );
}
