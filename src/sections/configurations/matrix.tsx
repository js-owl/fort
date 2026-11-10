import Image from "next/image";
import { Container } from "@/components/ui/container";
import {
  configurationColumns,
  configurationMatrix,
  configurationRows,
} from "@/content/configurations";
import { cn } from "@/lib/cn";

const rowClass =
  "grid grid-cols-[minmax(190px,380px)_repeat(4,minmax(140px,1fr))] gap-x-5";

const cellClass =
  "flex h-full min-h-12 items-center rounded-[20px] border border-[#4b4b4b] px-5 py-2.5 font-table text-lg leading-[1.4] font-medium";

export function ConfigurationMatrix() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={configurationMatrix.background}
        alt=""
        fill
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-dark from-[4%] to-transparent" />
      <Container className="relative flex flex-col gap-10 py-page lg:gap-[60px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <h2 className="min-w-0 flex-1 text-h2 font-medium whitespace-pre-line uppercase">
            {configurationMatrix.title}
          </h2>
          <p className="text-lead text-muted lg:w-[min(560px,34%)] lg:shrink-0">
            {configurationMatrix.text}
          </p>
        </div>
        <div className="flex flex-col gap-8 rounded-[40px] bg-panel p-5 sm:gap-10 sm:p-10">
          <p
            id="configuration-matrix-title"
            className="text-h3 font-medium text-muted"
          >
            {configurationMatrix.caption}
          </p>
          <div className="overflow-x-auto">
            <div
              role="table"
              aria-labelledby="configuration-matrix-title"
              className="flex min-w-[960px] flex-col gap-2"
            >
              <div role="row" className={rowClass}>
                <div role="columnheader" />
                {configurationColumns.map((column) => (
                  <div
                    key={column.name}
                    role="columnheader"
                    className="flex items-center px-5 py-2 text-h3 font-medium"
                  >
                    {column.name}
                  </div>
                ))}
              </div>
              <div role="row" className={rowClass}>
                <div
                  role="rowheader"
                  className="flex items-center px-5 py-2 font-table text-lg leading-[1.4] font-medium text-brand"
                >
                  Модель угроз
                </div>
                {configurationColumns.map((column) => (
                  <div
                    key={column.name}
                    role="cell"
                    className="flex items-center px-5 py-2 font-table text-lg leading-[1.4] font-medium text-brand"
                  >
                    {column.threat}
                  </div>
                ))}
              </div>
              <div role="row" className={rowClass}>
                <div
                  role="rowheader"
                  className="flex items-center px-5 py-2 font-table text-lg leading-[1.4] font-medium"
                >
                  Платформа управления
                </div>
                {configurationColumns.map((column) => (
                  <div
                    key={column.name}
                    role="cell"
                    className="flex items-center px-5 py-2 font-table text-lg leading-[1.4] font-medium"
                  >
                    {column.platform}
                  </div>
                ))}
              </div>
              {configurationRows.map((row) => (
                <div key={row.label} role="row" className={rowClass}>
                  <div role="rowheader" className={cellClass}>
                    {row.label}
                  </div>
                  {configurationColumns.map((column, index) => (
                    <div
                      key={column.name}
                      role="cell"
                      className={cn(
                        cellClass,
                        row.included[index] && "bg-[rgb(101_101_101/65%)]",
                      )}
                    >
                      <span className="sr-only">
                        {row.included[index] ? "Входит" : "Не входит"}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
