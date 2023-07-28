import dynamic from "next/dynamic";

const App = dynamic(() => import("../admin/App"), { ssr: false });

const AdminPage = () => <App />;

export default AdminPage;
