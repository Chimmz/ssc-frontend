import cls from 'classnames';
import styles from './styles.module.scss';
import { Icon } from '@iconify/react';
import { CSSProperties } from 'react';

const StepsIndicator = (props: { stepNames: string[]; currentStep: number }) => {
  const { stepNames, currentStep } = props;

  const renderIndicator = (stepName: string, step: number) => {
    const circleAttrs = {
      style: { width: '18px', height: '18px', border: '1px solid #ACA5B5', key: stepName }
    };
    const nameText = (
      <span
        className="d-block fs-5 fw-bold position-absolute"
        style={{ minWidth: 'max-content', top: 'calc(100% + 5px)' }}
      >
        {stepName}
      </span>
    );

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <div className="d-flex flex-column align-items-center position-relative z-5">
          {children}
        </div>
      );
    };

    const indicators = {
      completedStep: (
        <Wrapper>
          <Icon
            icon="ep:success-filled"
            color="#7600ff"
            width={21}
            className="position-relative"
          />
          {nameText}
        </Wrapper>
      ),
      currentStep: (
        <Wrapper>
          <span
            className={cls(
              styles.currentStepCircle,
              'd-block rounded-circle bg-white border-pry'
            )}
            {...circleAttrs}
          ></span>
          {nameText}
        </Wrapper>
      ),
      futureStep: (
        <Wrapper>
          <span className="d-block rounded-circle bg-white" {...circleAttrs}></span>
          {nameText}
        </Wrapper>
      )
    };
    if (step < currentStep) return indicators.completedStep;
    if (step === currentStep) return indicators.currentStep;
    return indicators.futureStep;
  };

  return (
    <div className={cls(styles.container, 'd-flex align-items-center mb-8')}>
      {stepNames.map((name, i, arr) => renderIndicator(name, i))}
    </div>
  );
};

export default StepsIndicator;
