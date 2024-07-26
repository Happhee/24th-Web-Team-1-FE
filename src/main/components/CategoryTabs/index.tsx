"use client";
import { getWorkbookCategoryQueryOptions } from "@main/remotes/getWorkbookCategoryQueryOptions";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { cn } from "@shared/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
interface CategoryTabsProps {
  type: "WORKBOOK" | "ARTICLE";
  category: string;
  handleCategory: (category: string) => void;
}
export default function CategoryTabs({
  type,
  category,
  handleCategory,
}: CategoryTabsProps) {
  const {
    data: categoryList,
    refetch,
    isLoading,
  } = useQuery({
    ...getWorkbookCategoryQueryOptions(),
    enabled: type !== "ARTICLE",
  });
  // MEMO : msw에서 모킹을 처음에 실패해서 일부러 넣은코드..! 실서버 연결시에는 삭제필요
  useEffect(() => {
    setTimeout(() => refetch(), 200);
  }, []);

  useEffect(
    function setInitCategory() {
      if (categoryList) handleCategory(categoryList[0].displayName);
    },
    [categoryList],
  );
  if (isLoading) return <></>;

  if (categoryList)
    return (
      <Tabs
        defaultValue={categoryList[0].displayName}
        className="overflow-x-auto"
      >
        <TabsList className="sub2-bold flex gap-3 py-[10px]">
          {categoryList.map(({ parameterName, displayName }) => (
            <TabsTrigger
              key={`${parameterName}-${type}`}
              value={displayName}
              className={cn(
                category !== displayName && "text-text-gray2",
                "box-border flex flex-col gap-[10px] pt-[10px]",
                "min-w-[48px]",
              )}
              name={displayName}
              onClick={() => handleCategory(displayName)}
            >
              <span className="flex w-full items-center justify-center">
                {displayName}
              </span>
              {category === displayName && (
                <span className="w-full border-b-2 border-black"></span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
}
