import clsx from "clsx";
import React, { FC, useMemo } from "react";
import { iconNext, iconPrevious } from "./icons";

interface Props {
  current?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
  hasNext?: boolean;
  itemRender?: (
    page: number,
    type: "page" | "prev" | "next",
    element: React.ReactNode
  ) => React.ReactNode;
}

export const SimplePagination: FC<Props> = ({
  current,
  pageSize,
  onChange,
  hasNext,
  itemRender,
}) => {
  const prevBtn = useMemo(() => {
    const defaultBtn =
      current !== 1 ? iconPrevious("#595959") : iconPrevious("#D9D9D9");
    if (itemRender) {
      return itemRender(current || 1, "prev", defaultBtn);
    }
    return defaultBtn;
  }, [current, itemRender]);

  const nextBtn = useMemo(() => {
    const defaultBtn = hasNext ? iconNext("#595959") : iconNext("#D9D9D9");
    if (itemRender) {
      return itemRender(current || 1, "next", defaultBtn);
    }
    return defaultBtn;
  }, [current, hasNext, itemRender]);

  const pageBtn = useMemo(() => {
    const defaultBtn = (
      <span className="text-[#035be0] bg-[#f5f5f5] px-2 py-1">{current}</span>
    );
    if (itemRender) {
      return itemRender(current || 1, "page", defaultBtn);
    }
    return defaultBtn;
  }, [current, itemRender]);

  return (
    <div className="flex items-center mx-6">
      <div
        onClick={() =>
          onChange &&
          current !== 1 &&
          onChange((current || 1) - 1, pageSize || 25)
        }
        className={clsx(
          "flex items-center justify-center mx-2 hover:bg-[#f5f5f5]",
          {
            "cursor-pointer": current !== 1,
            "cursor-not-allowed": current === 1,
          }
        )}
      >
        {prevBtn}
      </div>
      <div>{pageBtn}</div>
      <div
        onClick={() =>
          onChange && hasNext && onChange((current || 1) + 1, pageSize || 25)
        }
        className={clsx(
          "flex items-center justify-center mx-2 hover:bg-[#f5f5f5]",
          {
            "cursor-pointer": hasNext,
            "cursor-not-allowed": !hasNext,
          }
        )}
      >
        {nextBtn}
      </div>
    </div>
  );
};
