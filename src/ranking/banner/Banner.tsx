import { FC } from "react";
import banner from "../../assets/banner.png";
interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  return (
    <>
      <img className=" top-0 b-auto right-0 pt-16" src={banner} alt="..." />
    </>
  );
};

export default Banner;
