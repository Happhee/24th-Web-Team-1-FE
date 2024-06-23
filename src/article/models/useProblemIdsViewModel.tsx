import { useProblemModuleStore } from "@common/stores/problemModuleStore";

export default function useProblemIdsViewModel() {
  const setProblemIds = useProblemModuleStore((state) => state.setProblemIds);
  const problemIds = useProblemModuleStore((state) => state.problemIds);
  const currentIdx = useProblemModuleStore((state) => state.currentIdx);
  const nextProblemId = useProblemModuleStore((state) => state.nextProblemId);
  const prevSetProblemId = useProblemModuleStore(
    (state) => state.prevProblemId,
  );

  const clearProblem = useProblemModuleStore((state) => state.clearProblem);

  const getTagCurrentProblemText = () => {
    return `${currentIdx + 1}/${problemIds.length}`;
  };

  const isExistNextProblem = () => {
    return currentIdx + 1 < problemIds.length;
  };

  const nextSetProblemId = () => {
    nextProblemId();
    return problemIds[currentIdx + 1];
  };

  const currentProblemId = problemIds[currentIdx];

  return {
    setProblemIds,
    clearProblem,
    currentProblemId,
    currentIdx,
    prevSetProblemId,
    getTagCurrentProblemText,
    nextSetProblemId,
    isExistNextProblem,
  };
}
