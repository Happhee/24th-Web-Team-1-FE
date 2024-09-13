"use client";
import useWorkbookCardBottomButtonEvent from "@main/hooks/useWorkbookCardBottomButtonEvent";
import { WorkbookCardClientInfo } from "@main/types/workbook";
import { useRouter } from "next/navigation";
import WorkbookCardDetail from "../WorkbookCardDetail";
import { Mixpanel } from "@shared/utils/mixpanel";
import { EVENT_NAME } from "@shared/constants/mixpanel";

export default function WorkbookCard({
  id,
  badgeInfo,
  mainImageUrl,
  isPriorityImage,
  metaComponent,
  title,
  writers,
  personCourse,
  buttonTitle,
  cardType,
  articleId,
}: WorkbookCardClientInfo) {
  const { push } = useRouter();
  const { handleButtonClick } = useWorkbookCardBottomButtonEvent({
    cardType,
    id,
    articleId,
  });

  const onClickWorkbookCard = () => {
    push(`/workbook/${id}`);
    Mixpanel.track({
      name: EVENT_NAME.MAIN_WORKBOOK_TAPPED,
      property: { id },
    });
  };
  return (
    <div
      className="flex h-[390px] min-w-[269px] flex-col"
      onClick={onClickWorkbookCard}
    >
      <WorkbookCardDetail.ImageWrapper>
        <WorkbookCardDetail.MainImage
          mainImageUrl={mainImageUrl}
          isPriorityImage={isPriorityImage}
        />
        {badgeInfo.title && (
          <WorkbookCardDetail.CardBadge badgeInfo={badgeInfo} />
        )}
      </WorkbookCardDetail.ImageWrapper>
      <WorkbookCardDetail.WorkbookDetailInfoWrapper>
        {metaComponent}
        <WorkbookCardDetail.Title title={title} />
        <WorkbookCardDetail.WriterList writers={writers} />
        <WorkbookCardDetail.PersonCourseWithFewLogo
          personCourse={personCourse}
        />
        <WorkbookCardDetail.BottomButton
          buttonTitle={buttonTitle}
          handleClickBottomButton={handleButtonClick}
        />
      </WorkbookCardDetail.WorkbookDetailInfoWrapper>
    </div>
  );
}
