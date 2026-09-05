type Heading = { id: string; text: string; depth: number };

function List({ headings }: { headings: Heading[] }) {
  return (
    <ol className="flex flex-col gap-2.5">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${heading.id}`}
            className="type-body-sm text-ink-muted transition-colors hover:text-ink"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** xl 以上：サイドバーに sticky で置く目次 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading">
      <p id="toc-heading" className="type-overline-en text-ink-muted">
        Contents
      </p>
      <div className="mt-4">
        <List headings={headings} />
      </div>
    </nav>
  );
}

/** xl 未満：本文の先頭に折りたたみで置く目次 */
export function CollapsibleTableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;

  return (
    <details className="rounded-[var(--radius-md)] border border-line bg-card px-5 py-4">
      <summary className="cursor-pointer list-none font-semibold text-ink-strong">
        目次
        <span className="sr-only">（開閉できます）</span>
      </summary>
      <div className="mt-4">
        <List headings={headings} />
      </div>
    </details>
  );
}
