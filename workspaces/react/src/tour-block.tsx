import { useCallback, useMemo, type FC } from "react";
import { type RunningTour, useFlowsContext } from "./flows-context";
import { type Block } from "./types";

interface Props {
  tour: RunningTour;
}

export const TourBlock: FC<Props> = ({ tour }) => {
  const { setCurrentBlockIndex, block, activeStep } = tour;
  const blockId = block.id;

  const { components, transition } = useFlowsContext();

  const isLastStep = useMemo(() => {
    const blocks = tour.block.data.blocks as Block[] | undefined;
    if (!blocks) return false;
    return tour.currentBlockIndex === blocks.length - 1;
  }, [tour.block.data.blocks, tour.currentBlockIndex]);

  const cancel = useCallback(
    () => transition({ exitNode: "cancel", blockId }),
    [blockId, transition],
  );
  const finish = useCallback(
    () => transition({ exitNode: "finish", blockId }),
    [blockId, transition],
  );
  const next = useCallback(() => {
    if (isLastStep) {
      void finish();
      // TODO: hide the tour
    }

    setCurrentBlockIndex((i) => i + 1);
  }, [finish, isLastStep, setCurrentBlockIndex]);
  const prev = useCallback(() => {
    setCurrentBlockIndex((i) => {
      if (i === 0) return i;
      return i - 1;
    });
  }, [setCurrentBlockIndex]);

  if (!activeStep) return null;

  const Component = components[activeStep.type];
  if (!Component) return null;

  return <Component {...activeStep.data} next={next} prev={prev} cancel={cancel} />;
};