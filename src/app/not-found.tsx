import NextLink from "next/link";
import { IconChevron } from "src/components/icons/chevron";
import { Button } from "src/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(-100px+100vh)] flex-col items-center justify-center bg-background text-foreground">
      <div className="container mx-auto flex max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          404 - Page Not Found
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed, renamed, or doesn&apos;t exist.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <NextLink href="/">
              <IconChevron className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </NextLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
