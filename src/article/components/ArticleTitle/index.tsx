"use client";

import { useParams, useSearchParams } from "next/navigation";

import { useEffect } from "react";

import { useQueries } from "@tanstack/react-query";

import TitleSection from "@shared/components/TitleSection";

import { getArticleQueryOptions } from "@article/remotes/getArticleQueryOptions";

import { getArticleWithWorkbookQueryOptions } from "@article/remotes/getArticleWithWorkbookQueryOptions";
import { ArticleDetail, ArticleWithWorkbookDetail } from "@article/types";
import { ARTICLE_INFO_TYPE } from "@common/constants/articleCase";
import { useProblemIdsViewModel } from "@common/models/useProblemIdsViewModel";
import ArticleSkeleton from "../ArticleSkeleton";
import WriterInfo from "../WriterInfo";
import { Mixpanel } from "@shared/utils/mixpanel";
import { EVENT_NAME } from "@shared/constants/mixpanel";

export default function ArticleTitle() {
  const { articleId } = useParams<{ articleId: string }>();
  const { setProblemIds, getDayText } = useProblemIdsViewModel();

  const params = useSearchParams();
  const workbookId = params.get("workbookId");

  const results = useQueries({
    queries: [
      {
        ...getArticleQueryOptions({ articleId }),
        enabled: !workbookId,
      },
      {
        ...getArticleWithWorkbookQueryOptions({
          workbookId,
          articleId,
        }),
        enabled: Boolean(workbookId),
      },
    ],
  });

  const { data, isLoading, isError } = workbookId
    ? results[ARTICLE_INFO_TYPE.ARTICLE_WITH_WORKBOOK]
    : results[ARTICLE_INFO_TYPE.ONLY_ARTICLE];

  const articleInfo = data as ArticleDetail | ArticleWithWorkbookDetail;

  useEffect(
    function setProblemIdsData() {
      if (articleInfo)
        setProblemIds({
          problemIds: articleInfo.problemIds,
          articleId,
          day: "day" in articleInfo ? articleInfo.day : undefined,
        });
    },
    [articleInfo],
  );

  Mixpanel.track({
    name: EVENT_NAME.ARTICLE_APPREAR,
    property: { id: articleId },
  });

  if (isLoading || isError) return <ArticleSkeleton.TitleSkeleton />;
  if (isError || !articleInfo) return <div>에러</div>;

  const { category, title, writer } = articleInfo;
  const dayText = getDayText();

  const titleSectionData = {
    tagTexts: dayText ? [category, dayText] : [category],
    title,
    editorComponent: <WriterInfo {...writer} />,
  };

  return <TitleSection {...titleSectionData} />;
}
