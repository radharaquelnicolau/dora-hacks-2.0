import { BottomNav } from "../../components/layout/BottomNav";

export default function TabsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><main>{children}</main><BottomNav /></>;
}
