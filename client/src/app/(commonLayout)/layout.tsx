import PublicFooter from "@/shared/publicFooter/PublicFooter";
import PublicNavbar from "@/shared/publicNavbar/PublicNavbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  );
}
