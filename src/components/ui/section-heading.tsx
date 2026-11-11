export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10 xl:gap-20">
      <h2 className="min-w-0 flex-1 text-h2 font-medium whitespace-pre-line uppercase">
        {title}
      </h2>
      {description ? (
        <p className="min-w-0 text-lead whitespace-pre-line text-muted lg:w-[min(560px,42%)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
