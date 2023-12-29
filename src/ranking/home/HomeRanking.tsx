import { Tabs, TabsProps, message } from "antd";
import { useForm } from "antd/es/form/Form";
import clsx from "clsx";
import { FC, useCallback, useEffect, useState } from "react";
import { apiLv1 } from "../../api";
import { Golfer } from "../../model";
import Banner from "../banner/Banner";
import { Footer } from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import styles from "./style.module.scss";
import TableComp from "./table/TableComp";

interface HomeRankingProps {}
const HomeRanking: FC<HomeRankingProps> = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataTable, setDataTable] = useState<{
    data: Golfer[];
    count: number;
  }>({
    data: [],
    count: 0,
  });

  const fetchData = useCallback(async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);

      const filterValues = await form.getFieldsValue();

      const dataGolfer = await apiLv1.get({
        ...filterValues,
        page,
      });
      setDataTable(dataGolfer);
      setLoading(false);
    } catch (error) {
      message.error("Error!!!!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Bảng tổng hợp",
      children: (
        <TableComp
          dataTable={dataTable}
          loading={loading}
          onSearch={(page) => fetchData(page)}
        />
      ),
    },
    {
      key: "2",
      label: "Bảng U18 nam",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Bảng U18 nữ",
      children: "Content of Tab Pane 3",
    },
    {
      key: "4",
      label: "Bảng U15 nam",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "Bảng U12 nam",
      children: "Content of Tab Pane 3",
    },
    {
      key: "6",
      label: "Bảng U12 nữ",
      children: "Content of Tab Pane 3",
    },

    {
      key: "7",
      label: "Bảng U12 tổng",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <>
      <Navbar />
      <Banner />
      <Search form={form} onSearch={fetchData} />
      <div className="container max-w-7xl mx-auto h-full flex hidden md:flex">
        <div className="flex mx-auto justify-between w-5/6 ">
          <Tabs
            className={clsx(styles.tabBar, "w-full")}
            defaultActiveKey="1"
            items={items}
            onChange={() => {}}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeRanking;
