import LoadingButton from '@/components/ui/LoadingButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import cls from 'classnames';
import { ComponentType, Dispatch, SetStateAction, useState } from 'react';

interface Step {
  name: string;
  isMandatory: boolean;
  component: ComponentType<{
    onGoBack: (() => void) | undefined;
    onGoNext: (() => void) | undefined;
    userClickedBack: boolean;
    userClickedNext: boolean;
    setUserClickedNext?: Dispatch<SetStateAction<boolean>>;
    showNextButton?: () => void;
  }>;
}

export interface StepComponentProps {
  onGoBack: (() => void) | undefined;
  onGoNext: (() => void) | undefined;
  userClickedBack: boolean;
  userClickedNext: boolean;
  setUserClickedNext?: Dispatch<SetStateAction<boolean>>;
  showNextButton: () => void;
}

interface Options {
  isFirstStep: boolean;
  isLastStep: boolean;
  goBack: () => void;
  goNext: () => void;
}

const withStepNavigation = (step: Step, options: Options) => {
  const ComponentWithStepNavigation: React.FC = props => {
    const { goBack, goNext, isFirstStep, isLastStep } = options;
    const [btnNextShown, setShowNextButton] = useState(!step.isMandatory);

    const [userClickedBack, setUserClickedBack] = useState(false);
    const [userClickedNext, setUserClickedNext] = useState(false);

    return (
      <>
        <step.component
          onGoBack={goBack}
          onGoNext={goNext}
          userClickedBack={userClickedBack}
          userClickedNext={userClickedNext}
          setUserClickedNext={setUserClickedNext}
          showNextButton={setShowNextButton.bind(null, true)}
        />

        <div className={cls('d-flex align-items-center gap-3 mt-7')}>
          <button className={cls('btn', isFirstStep && 'd-none')} onClick={goBack}>
            Back
          </button>

          <button
            // loading={!!props.loading}
            // loadingMsg="Saving"
            // withSpinner
            className={cls('btn btn-pry', !btnNextShown && 'd-none')}
            onClick={setUserClickedNext.bind(null, true)}
          >
            {!isLastStep ? (
              <>
                Next Step <Icon icon="heroicons:arrow-long-right-20-solid" />
              </>
            ) : (
              'Finish'
            )}
          </button>
        </div>
      </>
    );
  };
  return <ComponentWithStepNavigation />;
};

export default withStepNavigation;
