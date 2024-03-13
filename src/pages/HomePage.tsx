import { Button } from "@/components/ui/button";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const navigate = useNavigate();
  return (
    <main>
      <aside className="fixed bg-black text-white w-[120px] h-screen top-0 left-0 pt-5 flex flex-col justify-start items-center gap-5">
        <Link to="/tournaments">
          <img src="/sword-bold.svg" alt="" />
        </Link>
        <Button
          variant="destructive"
          onClick={() => {
            navigate("/login");
            localStorage.removeItem("betblack-admin-token");
          }}
        >
          Logout
        </Button>
      </aside>
      <section className="ml-[120px]">
        <Outlet />
      </section>
    </main>
  );
};

export default HomePage;
