"use client";

import { getLinks } from "../_lib/db-actions";
import { use } from "react";

type Props = {
  promise: Promise<Awaited<ReturnType<typeof getLinks>>>;
};

export function LinksList({ promise }: Props) {
  const links = use(promise);
  return null;
}
