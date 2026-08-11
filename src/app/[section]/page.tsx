import { SectionPage } from "@/components/app/section-page";
import { isSectionId } from "@/lib/routes";
import { notFound } from "next/navigation";

export default async function SectionRoutePage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!isSectionId(section)) {
    notFound();
  }

  return <SectionPage section={section} />;
}