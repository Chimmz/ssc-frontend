import { Icon } from '@iconify/react';
import React, { ComponentType, FC, useMemo, useState, useEffect, useCallback } from 'react';
import StepsIndicator from './StepsIndicator';
import cls from 'classnames';
import LoadingButton from '../../ui/LoadingButton';

interface Props {
  steps: Array<{ name: string; component: ComponentType; isMandatory: boolean | undefined }>;
  defaultStep?: number;
  onFinish: () => void;
  loading?: boolean;
}

const MultiStepComponent: FC<Props> = function (props) {
  const [step, setStep] = useState<number>(props.defaultStep || 0);

  const goNext = useMemo(() => setStep.bind(null, h => h + 1), [setStep]);
  const goBack = useMemo(() => setStep.bind(null, h => h - 1), [setStep]);

  const Component = useMemo(() => props.steps[step].component, [props.steps, step]);

  const [isCurrentStepFirst, isCurrentStepLast] = useMemo(() => {
    return [step === 0, step === props.steps.length - 1];
  }, [step, props.steps]);

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

      <Component />

      <div className={cls('d-flex align-items-center gap-3 mt-7')}>
        <button className={cls('btn', isCurrentStepFirst && 'd-none')} onClick={goBack}>
          Back
        </button>

        <LoadingButton
          loading={!!props.loading}
          loadingMsg="Saving"
          withSpinner
          className={cls('btn btn-pry', props.steps[step].isMandatory && 'd-none')}
          onClick={!isCurrentStepLast ? goNext : props.onFinish}
        >
          {!isCurrentStepLast ? (
            <>
              Next Step <Icon icon="heroicons:arrow-long-right-20-solid" />
            </>
          ) : (
            'Finish'
          )}
        </LoadingButton>
      </div>
    </>
  );
};

const withNavButtons = () => {};

// The Machine Learning Specialisation from Andrew Ng (the instructor) will be the first actual Data Science/machine learning course I will be taking.
// This machine learning course will expose me to the powerful Python libraries used in the world of Artificial Intelligence which include Sci-kit learn, Keras, Tensorflow, and more. I will also learn how to build powerful prediction models.

// I'm currently a Fullstack developer. One thing I naturally love is creating intelligent things. Learning this course will enable me to incorporate AI in websites and web apps. I've lately been inspired and overwhelmed by the world of data science, data analysis, and machine learning. I want this passion to turn into reality.

// I've heard that Python rules in the data science world. Going deep with Python through this course will stir me up to learn Django and Flask (which is a Python backend framework), thereby adding new technologies to my web dev stack.

// Hope my request is granted.
// Thank you.

// The Machine Learning Specialisation from Andrew Ng (the instructor) will be the first actual Data Science/machine learning course I will be taking.
// This machine learning course will expose me to the powerful Python libraries used in the world of Artificial Intelligence which include Sci-kit learn, Keras, Tensorflow, and more. I will also learn how to build powerful prediction models.

// I'm currently a Fullstack developer. One thing I naturally love is creating intelligent things. Learning this course will enable me to incorporate AI in websites and web apps. I've lately been inspired and overwhelmed by the world of data science, data analysis, and machine learning. I want this passion to turn into reality.

// I've heard that Python rules in the data science world. Going deep with Python through this course will stir me up to learn Django and Flask (which is a Python backend framework), thereby adding new technologies to my web dev stack.

// But after searching on the internet, I began to understand that good understanding of Calculus, Linear Algebra, and statistics are helpful prerequisites to going into machine learning.

// Hope my request is granted.
// Thank you.
export default MultiStepComponent;
