import { FC } from "react";
import { Link } from "react-router-dom";
import { GOLF_URL } from "../constant";

// components
interface HomePageProps {}
export const HomePage: FC<HomePageProps> = () => {
  return (
    <>
      <main>
        <div className="relative pt-16 flex content-center items-center justify-center min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white lg:text-5xl font-bold">
                    VIETNAM JUNIOR
                  </h1>
                  <h1 className="mt-4 text-white font-bold lg:text-5xl">
                    GOLF RANKING
                  </h1>
                  <p className="mt-6 text-lg text-white">
                    Bảng xếp hạng quốc gia
                  </p>
                  <div className="mt-12">
                    <Link
                      className="min-h-[140px] text-white font-bold px-10 py-4 hover:bg-primary  hover:border-primary hover:text-white border border-white rounded-lg  mb-1 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 mr-8"
                      to={GOLF_URL.RANKING}
                    >
                      Ranking
                    </Link>
                    <Link
                      className="min-h-[140px] text-white font-bold px-10 py-4 hover:bg-primary hover:text-white hover:border-primary border border-white rounded-lg mr-1 mb-1 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                      to={GOLF_URL.RANKING}
                    >
                      Ranking
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
