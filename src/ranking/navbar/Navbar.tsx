import { Bars3Icon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GOLF_URL } from "../../constant";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="app">
      <nav className="h-[102px] items-center top-0 fixed z-50 w-full bg-white shadow">
        <div className="max-w-7xl mx-auto h-full flex">
          <div className="flex mx-auto justify-between w-5/6 ">
            {/* Primary menu and logo */}
            <div className="flex items-center gap-16">
              {/* logo */}
              <div>
                <Link
                  className="flex gap-1 font-bold text-gray-700 items-center "
                  to={"/ranking"}
                >
                  <img src={logo} />
                </Link>
              </div>
              {/* primary */}
              <div className="hidden lg:flex gap-8 "></div>
            </div>
            {/* secondary */}
            <div className="flex gap-6">
              <div className="hidden xs:flex items-center gap-10">
                <div className="hidden lg:flex items-center gap-8">
                  <Link to={GOLF_URL.RANKING} className="hover:text-primary">
                    Bảng xếp hạng
                  </Link>
                  <Link
                    to={GOLF_URL.RANKING_TOURNAMENT}
                    className="hover:text-primary"
                  >
                    Giải đấu
                  </Link>
                  <Link
                    to={GOLF_URL.RANKING_NEWS}
                    className="hover:text-primary"
                  >
                    Tin tức
                  </Link>
                </div>
                <div>
                  <button className="px-10 py-3 hover:shadow-lg rounded-lg outline-none focus:outline-none shadow bg-primary text-white  text-sm leading-4">
                    Đăng nhập
                  </button>
                </div>
              </div>
              {/* Mobile navigation toggle */}
              <div className="lg:hidden flex items-center">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  <Bars3Icon className="h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        <div
          className={`fixed z-40 w-full  bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
            !toggleMenu ? "h-0" : "h-full"
          }`}
        >
          <div className="px-8">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <a href="#" className="border-l-4 ">
                Bảng xếp hạng
              </a>
              <a href="#"> Giải đấu</a>
              <a href="#">Tin tức</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
