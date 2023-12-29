import { Pagination } from "antd";
import { FC, useMemo, useState } from "react";
import { DefTable } from "../../../component/table/DefTable";
import { DefTableColumnsType } from "../../../component/table/columns";
import { PAGE_SIZE } from "../../../constant";
import { desc, inc } from "../../../icons";
import { Golfer } from "../../../model";

interface Props {
  dataTable: {
    data: Golfer[];
    count: number;
  };
  onSearch: (page?: number) => void;
  loading?: boolean;
}

const TableComp: FC<Props> = ({ dataTable, onSearch, loading }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const columns: DefTableColumnsType<Golfer> = useMemo(() => {
    return [
      {
        title: "Xếp hạng",
        dataIndex: "rank",
        align: "center",
        width: 100,
        key: "rank",
        render: (text: string, record: Golfer, index) => {
          return (
            <span className="text-center text-ellipsis w-[95%] whitespace-nowrap overflow-hidden block">
              {index + 1 + (currentPage - 1) * PAGE_SIZE}
            </span>
          );
        },
      },
      {
        title: "Mã VJGR",
        dataIndex: "code",
        key: "code",
        align: "center",
        width: 130,
        render: (text: string, record: Golfer) => {
          return (
            <span className="text-center text-ellipsis w-[95%] whitespace-nowrap overflow-hidden block">
              {record.code}
            </span>
          );
        },
      },
      {
        title: "Thành viên",
        dataIndex: "name",
        key: "name",
        render: (text: string, record: Golfer) => {
          return (
            <span className="text-left text-ellipsis w-[95%] whitespace-nowrap overflow-hidden block">
              {record.name}
            </span>
          );
        },
      },
      {
        title: "Độ tuổi",
        dataIndex: "age",
        key: "age",
        render: (_text: any, _record: any, index: any) => <span> -</span>,
      },
      {
        title: "Tăng giảm",
        dataIndex: "scoreChanges",
        key: "scoreChanges",
        render: (text: string, record: Golfer) => {
          return (
            <div className="flex flex-row">
              <span
                className="w-10 text-center text-ellipsis whitespace-nowrap overflow-hidden"
                style={{
                  paddingRight: record.scoreChanges < 0 ? 5 : "",
                }}
              >
                {record.scoreChanges}
              </span>
              <span>
                {record.scoreChanges < 0
                  ? desc()
                  : record.scoreChanges === 0
                  ? null
                  : inc()}
              </span>
            </div>
          );
        },
      },
      {
        title: "Điểm thưởng",
        align: "center",
        dataIndex: "totalPoint",
        key: "totalPoint",
        width: 120,
        render: (text: string, record: Golfer) => {
          return (
            <span className="text-center text-ellipsis w-[95%] whitespace-nowrap overflow-hidden block">
              {record.totalPoint?.toFixed(2)}
            </span>
          );
        },
      },
    ];
  }, [currentPage]);
  return (
    <>
      <DefTable data={dataTable.data} loading={loading} columns={columns} />
      <div className="float-right mb-2">
        <Pagination
          current={currentPage}
          defaultPageSize={PAGE_SIZE}
          total={dataTable.count}
          size="small"
          onChange={(page) => {
            setCurrentPage(page);
            onSearch && onSearch(page);
          }}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default TableComp;
