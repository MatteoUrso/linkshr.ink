"use client";

import { getLinks } from "../_lib/queries";
import { LinksListArticle } from "./links-list-article";
import { cn } from "@/lib/utils";
import { use } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  promise: Promise<Awaited<ReturnType<typeof getLinks>>>;
}

export function LinksList({ promise, className, ...props }: Props) {
  const { data, pageCount } = use(promise);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <ol className="flex flex-col gap-4">
        {data.map((link) => {
          return (
            <li key={link.id}>
              <LinksListArticle link={link} />
            </li>
          );
        })}
      </ol>

      {/** TODO: PAGINATION */}
      <p>{pageCount} pages</p>
    </div>
  );
}
