import { Pagination } from "antd";
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export interface PaginateResult<T> {
  docs: T[];
  count: number;
}
export const DEFAULT_PAGE_SIZE = 50;
interface Sorting {
  field: string;
  dir: "asc" | "desc";
}

export interface DefPaginationProps<T> {
  data?: any[];
  onQuery?: (
    pageIndex: number,
    pageSize: number,
    sort?: Sorting
  ) => Promise<PaginateResult<T>>;
  render: (data: T[], loading: boolean) => ReactNode;
  defaultPageSize?: number;
  defaultSort?: Sorting;
  isLoading?: boolean;
  defaultPaginationMode?: boolean;
  showSizeChanger?: boolean;
}

export interface DefPaginationRef {
  search(): void;
}

function DefPaginationInner<T>(
  {
    render,
    data,
    onQuery,
    defaultPageSize,
    defaultSort,
    defaultPaginationMode,
    showSizeChanger,
  }: DefPaginationProps<T>,
  ref: ForwardedRef<DefPaginationRef>
) {
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(
    defaultPageSize || DEFAULT_PAGE_SIZE
  );
  const [sorting, setSorting] = useState<Sorting | undefined>(defaultSort);
  const [totalItems, setTotalItems] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (newPageSize: number) => {
      setPageIndex(newPageSize);
      if (onQuery) {
        setLoading(true);
        const { docs, count } = await onQuery(newPageSize, pageSize, sorting);
        setCurrentPageData(docs);
        setTotalItems(count);
        setLoading(false);
      } else if (data) {
        const currPage = data.slice(
          newPageSize * pageSize,
          (newPageSize + 1) * pageSize
        );
        setCurrentPageData(currPage);
        setTotalItems(data.length);
      } else {
        setCurrentPageData([]);
        setTotalItems(0);
      }
    },
    [data, onQuery, pageSize, sorting]
  );

  useImperativeHandle(
    ref,
    () => {
      return {
        search: async () => {
          fetchData(1);
        },
        refresh: () => {
          fetchData(pageIndex);
        },
      };
    },
    [fetchData, pageIndex]
  );

  useEffect(() => {
    if (data) {
      const currPage = data.slice(0, pageSize);
      setCurrentPageData(currPage);
      setTotalItems(data.length);
    }
  }, [data, pageSize]);

  return (
    <div>
      {render(currentPageData, loading)}
      <div className="flex justify-end pt-2 pr-2">
        {defaultPaginationMode ? (
          <Pagination
            showSizeChanger={showSizeChanger}
            defaultPageSize={defaultPageSize}
            total={totalItems}
            pageSize={pageSize}
            current={pageIndex}
            size="small"
            onChange={fetchData}
            hideOnSinglePage
          />
        ) : undefined}
      </div>
    </div>
  );
}

export const DefPagination = forwardRef(DefPaginationInner) as <T>(
  props: DefPaginationProps<T> & { ref?: ForwardedRef<DefPaginationRef> }
) => ReturnType<typeof DefPaginationInner>;
