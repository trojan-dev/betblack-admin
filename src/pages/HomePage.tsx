import * as React from "react";
import { Link, Outlet } from "react-router-dom";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <main>
      <aside className="fixed bg-black text-white w-[120px] h-screen top-0 left-0 pt-5 flex flex-col justify-start items-center">
        <Link to="/tournaments">
          <img src="/sword-bold.svg" alt="" />
        </Link>
      </aside>
      <section className="ml-[120px]">
        <Outlet />
      </section>
    </main>
  );
};

export default HomePage;
