import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-background/50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 Ashutosh Dash. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://ashutoshdash.in?utm_source=spry-assignment"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Portfolio
            </Link>
            <Link
              href="https://github.com/ashutoshdash1999"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href="https://ashutoshdash.in/Ashutosh_Dash_Frontend_Dev.pdf"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
