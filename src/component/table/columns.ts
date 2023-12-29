import { ColumnType } from "antd/lib/table";

export interface DefTableColumnType<T>
  extends Omit<ColumnType<T>, "width" | "title" | "fixed"> {
  title: string;
  /**
   * Chiều rộng cố định của cột
   */
  width?: number;
  /**
   * Chiều rộng của cột, hữu dụng đối với trường hợp tổng chiều rộng các cột nhỏ hơn chiều rộng của màn hình
   * Với trường hợp này thì ít nhất một cột phải có minWidth
   */
  minWidth?: number;

  fixed?: "left" | "right" | boolean;

}

export interface DefTableColumnGroupType<T>
  extends Omit<DefTableColumnType<T>, "dataIndex"> {
  children: DefTableColumnsType<T>;
}

export type DefTableColumnsType<T> = (
  | DefTableColumnGroupType<T>
  | DefTableColumnType<T>
)[];
