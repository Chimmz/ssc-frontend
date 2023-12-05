import { Icon } from '@iconify/react';
import React, {
  ComponentType,
  FC,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react';
import StepsIndicator from './StepsIndicator';
import cls from 'classnames';
import LoadingButton from '../../ui/LoadingButton';
import withStepNavigation from './withStepNavigation';

interface Step {
  name: string;
  isMandatory: boolean;
  component: ComponentType<{
    onGoBack: (() => void) | undefined;
    onGoNext: (() => void) | undefined;
    userClickedBack: boolean;
    userClickedNext: boolean;
  }>;
}

interface Props {
  steps: Step[];
  defaultStep?: number;
  onFinish: (() => void) | undefined;
  loading?: boolean;
}

const MultiStepComponent: FC<Props> = function (props) {
  const [step, setStep] = useState<number>(props.defaultStep || 0);

  const [isFirstStep, isLastStep] = useMemo(() => {
    return [step === 0, step === props.steps.length - 1];
  }, [step, props.steps]);

  const goNext = useCallback(() => {
    isLastStep ? props.onFinish?.() : setStep(s => s + 1);
  }, [setStep, isLastStep, props.onFinish]);

  const goBack = useCallback(() => {
    if (!isFirstStep) setStep(s => s - 1);
  }, [setStep, isFirstStep]);

  // const Component = useMemo(() => props.steps[step].component, [props.steps, step]);

  const stepNames = useMemo(() => props.steps.map(s => s.name), [props.steps]);

  useEffect(() => {
    if (props.defaultStep) setStep(props.defaultStep);
  }, [props.defaultStep]);

  useEffect(() => {
    const modalBody = document.querySelector('.modal-fullscreen .modal-body');
    if (!modalBody || step === 0) return;
    modalBody.scrollTop = 0; // Scroll to top of modal upon new step
  }, [step]);

  return (
    <>
      <StepsIndicator stepNames={stepNames} currentStep={step} />
      {/* <Component
        onBack={isFirstStep ? undefined : goBack}
        onNext={isLastStep ? undefined : goNext}
      /> */}
      {withStepNavigation(props.steps[step], { isFirstStep, isLastStep, goBack, goNext })}

      {/* <div className={cls('d-flex align-items-center gap-3 mt-7')}>
        <button className={cls('btn', isFirstStep && 'd-none')} onClick={goBack}>
          Back
        </button>

        <LoadingButton
          loading={!!props.loading}
          loadingMsg="Saving"
          withSpinner
          className={cls('btn btn-pry', props.steps[step].isMandatory && 'd-none')}
          onClick={!isLastStep ? goNext : props.onFinish}
        >
          {!isLastStep ? (
            <>
              Next Step <Icon icon="heroicons:arrow-long-right-20-solid" />
            </>
          ) : (
            'Finish'
          )}
        </LoadingButton>
      </div> */}
    </>
  );
};

const withNavButtons = () => {};

export default MultiStepComponent;
