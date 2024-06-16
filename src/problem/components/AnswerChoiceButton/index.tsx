import React, { useContext, useEffect, useState } from "react";

import { useMutationState } from "@tanstack/react-query";

import { Button } from "@shared/components/ui/button";
import { cn } from "@shared/utils/cn";

import ChoiceFillCircleSvg from "../ChoiceFillCircleSvg";
import { ANSWER_CHOICHE_BUTTON_INFO } from "@problem/constants/problemInfo";
import ProblemContext from "@problem/context/problemContext";
import { QUERY_KEY } from "@problem/remotes/api";
import { AnswerCheckInfo, AnswerChoiceInfo } from "@problem/types/problemInfo";

interface AnswerChoiceButtonProps extends Pick<AnswerChoiceInfo, "content"> {}

export default function AnswerChoiceButton({
  content,
}: AnswerChoiceButtonProps) {
  const [className, setClassName] = useState(
    ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className,
  );
  const {
    states: { choiceAnswer },
    actions: { updateChoiceAnswer },
  } = useContext(ProblemContext);

  const problemAnswerInfo = useMutationState({
    filters: {
      mutationKey: [QUERY_KEY.POST_PROBLEM_ANSWER],
    },
    select: (mutation) => mutation.state.data as AnswerCheckInfo,
  });

  const onClickAnswerChoice = () => {
    if (problemAnswerInfo.length === 0) updateChoiceAnswer(content);
  };

  useEffect(
    function setButtonClassName() {
      if (!problemAnswerInfo.length) {
        if (choiceAnswer === content)
          setClassName(
            ANSWER_CHOICHE_BUTTON_INFO.CURRENT_CHOICE_ANSWER.className,
          );

        if (choiceAnswer !== content)
          setClassName(ANSWER_CHOICHE_BUTTON_INFO.INIT_CHOICE_ANSWER.className);
      }

      if (problemAnswerInfo.length) {
        const problemAnswerData = problemAnswerInfo[0];
        if (problemAnswerData) {
          if (problemAnswerData.answer === content)
            setClassName(
              ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_CORRECT.className,
            );
          if (
            problemAnswerData.isSolved === false &&
            choiceAnswer === content
          ) {
            setClassName(
              ANSWER_CHOICHE_BUTTON_INFO.CHOICE_ANSWER_FAIL.className,
            );
          }
        }
      }
    },
    [choiceAnswer, content, problemAnswerInfo],
  );

  if (!problemAnswerInfo) return <div>정답제출 실패</div>;
  const problemAnswerData = problemAnswerInfo[0];

  return (
    <Button
      className={cn(
        "flex w-full justify-between rounded-s border-[1px] border-text-gray3 px-3",
        className,
      )}
      onClick={onClickAnswerChoice}
    >
      <span className="sub2-bold">{content}</span>
      <ChoiceFillCircleSvg
        fill={
          (!problemAnswerData && choiceAnswer === content && "white") ||
          (!problemAnswerData && choiceAnswer !== content && "#A5A5A5") ||
          (problemAnswerData &&
            problemAnswerData.answer === content &&
            "#0166B3") ||
          (problemAnswerData &&
            problemAnswerData.isSolved === false &&
            choiceAnswer === content &&
            "#B00020") ||
          "#A5A5A5"
        }
      />
    </Button>
  );
}
