import { redirect } from "next/navigation";

type OfficerShortRouteProps = {
  params: Promise<{
    hex: string;
  }>;
};

const OfficerShortRoutePage = async ({ params }: OfficerShortRouteProps) => {
  const { hex } = await params;
  redirect(`/officers/${hex.toLowerCase()}`);
};

export default OfficerShortRoutePage;
