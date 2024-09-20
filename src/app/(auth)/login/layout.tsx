import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
        <Content>{children}</Content>
  </Layout>
  );
}
