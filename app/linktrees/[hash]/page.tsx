// app/link/[hash]/page.tsx

import LinktreeUX, { LinktreeDocument } from "@/app/components/LinktreeUX/LinktreeUX";
import { getDb } from "@/app/lib/mongodb";
import { redirect, RedirectType } from "next/navigation";


type Props = {
  params: {
    hash: string;
  };
};

export default async function LinkPage({ params }: Props) {
  const { hash } = await params;

  const db = await getDb();

  const pageData = await db.collection('linktree').findOne({ hash });

  if (!pageData) {
    redirect('/redirect-to', RedirectType.replace)

  }
  return <LinktreeUX pageData={pageData as LinktreeDocument} />;
}