import { Spin, Table, TableProps } from "antd";
import clsx from "clsx";
import _ from "lodash";
import React, {
  ForwardedRef,
  Key,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import {
  DefPagination,
  DefPaginationProps,
  DefPaginationRef,
} from "./DefPagination";
import { useDefTableViewManager } from "./DefTableViewManager";
import {
  DefTableColumnGroupType,
  DefTableColumnType,
  DefTableColumnsType,
} from "./columns";
import styles from "./def-table.module.scss";
import { emptyIcon, logoIconLoading } from "./icons";

export interface DefTableRef extends DefPaginationRef {}

interface Props<T>
  extends Omit<
      TableProps<T>,
      "size" | "dataSource" | "locale" | "scroll" | "columns"
    >,
    Pick<
      DefPaginationProps<T>,
      | "data"
      | "onQuery"
      | "defaultPageSize"
      | "defaultSort"
      | "isLoading"
      | "defaultPaginationMode"
      | "showSizeChanger"
    > {
  scroll?: {
    y?: number | string;
  };
  columns?: DefTableColumnsType<T>;
  emptyData?: React.ReactNode;
  loadingOverlay?: boolean;
}

function DefTableInner<T extends object>(
  {
    isLoading,
    loadingOverlay,
    columns,
    data,
    defaultPageSize,
    defaultSort,
    onQuery,
    defaultPaginationMode,
    showSizeChanger,
    emptyData,
    pagination,
    ...props
  }: Props<T>,
  ref: ForwardedRef<DefTableRef>
) {
  const { columns: clm, views, currentView } = useDefTableViewManager<T>();

  let iconLoading: JSX.Element;
  let iconEmpty: JSX.Element;
  iconLoading = logoIconLoading;
  iconEmpty = emptyIcon;

  const clms = useMemo(() => {
    if (columns) return columns;
    if (clm && views && currentView) {
      const view = views.find((v) => v.name === currentView);
      if (view) {
        if (view.columns.length === 0) return clm;
        return clm.filter((c) => c.key && view.columns.includes(c.key));
      }
      return clm;
    }
    return [];
  }, [clm, columns, currentView, views]);

  const calcColumnWidth = useCallback(
    (col: DefTableColumnGroupType<T> | DefTableColumnType<T>): number => {
      if (
        (col as DefTableColumnGroupType<T>).children &&
        (col as DefTableColumnGroupType<T>).children.length > 0
      ) {
        return _.sumBy((col as DefTableColumnGroupType<T>).children, (c: any) =>
          calcColumnWidth(c)
        );
      }
      return (col.width || 0) + (col.minWidth || 0);
    },
    []
  );

  const scrollX = useMemo(() => {
    return _.sumBy(clms, (c: any) => calcColumnWidth(c));
  }, [calcColumnWidth, clms]);

  return (
    <div className={clsx(styles.defTableCss, "!mdlm:ml-0")}>
      <DefPagination
        ref={ref}
        data={data}
        onQuery={onQuery}
        defaultPageSize={defaultPageSize}
        defaultSort={defaultSort}
        defaultPaginationMode={defaultPaginationMode}
        showSizeChanger={showSizeChanger}
        render={(pageData, loading) => (
          <Spin spinning={isLoading || loading} indicator={iconLoading}>
            {isLoading || loading ? (
              <div
                className={clsx(styles.defTableCss, "ml-[16px] mdlm:ml-0")}
              />
            ) : (
              <Table
                loading={{
                  spinning: loading || !!loadingOverlay,
                  indicator: <></>,
                }}
                {...props}
                size="large"
                scroll={
                  isLoading
                    ? undefined
                    : {
                        x: scrollX,
                        y: props.scroll?.y,
                      }
                }
                columns={clms}
                dataSource={pageData}
                pagination={pagination || false}
                locale={{
                  emptyText:
                    isLoading || loading ? <div /> : emptyData || iconEmpty,
                }}
              />
            )}
          </Spin>
        )}
      />
    </div>
  );
}

export const DefTable = forwardRef(DefTableInner) as <T>(
  props: Props<T> & { ref?: ForwardedRef<DefTableRef> }
) => ReturnType<typeof DefTableInner>;

export interface Sorter {
  order?: "descend" | "ascend" | null;
  field?: Key | readonly Key[];
}
