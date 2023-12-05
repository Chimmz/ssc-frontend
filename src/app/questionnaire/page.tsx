'use client';
import Link from 'next/link';
import Image from 'next/image';
import MultiStepComponent from '@/components/shared/multistep-component';
import ContactInfo from '@/components/signup-questionnaire/contact-info/ContactInfo';
import GoalsAndPreferences from '@/components/signup-questionnaire/goals-and-preferences';
import PersonalInfo from '@/components/signup-questionnaire/personal-info/PersonalInfo';
import ChooseRoles from '@/components/signup-questionnaire/roles';
import { usePostSignupQuestionnaireContext } from '@/contexts/PostSignupQuestionnaireContext';
import React, { useState } from 'react';
import WelcomeModal from '@/components/signup-questionnaire/welcome/WelcomeModal';
import { Modal } from 'react-bootstrap';

const steps = [
  { name: 'Personal Information', component: PersonalInfo, isMandatory: false },
  { name: 'Contact Information', component: ContactInfo, isMandatory: false },
  { name: 'Describe your role', component: ChooseRoles, isMandatory: true },
  { name: 'My goals', component: GoalsAndPreferences, isMandatory: false }
  // { name: 'Startup Information', component: <StartupInfo />, isMandatory: false }
];

export default () => {
  const {
    isUpdatingUser,
    overlayShown,
    setOverlayShown
    // welcomeModalShown,
    // setShowWelcomeModal
  } = usePostSignupQuestionnaireContext();

  const [welcomeModalShown, setShowWelcomeModal] = useState(false);

  return (
    <Modal show fullscreen scrollable={false}>
      <Modal.Header className="bg-pry color-white">
        <Modal.Title className="d-flex flex-grow-1 justify-content-center align-items-center">
          <Link href="/" className="d-flex align-items-center gap-2">
            <Image
              src="/img/ssc-slant-logo-purple.png"
              alt="ssc icon"
              width={50}
              height={50}
            />
            <h1 className="mt-3 fs-5 family-raleway">Seoul Startups Club</h1>
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center p-7">
        <MultiStepComponent
          steps={steps}
          defaultStep={0}
          onFinish={setShowWelcomeModal?.bind(null, true)}
          loading={isUpdatingUser}
        />
      </Modal.Body>

      {/* Backdrop for the component rendered by the <MultiStepComponent /> */}
      <div
        className={welcomeModalShown || overlayShown ? 'fade modal-backdrop show' : ''}
        style={{ zIndex: '1055' }}
        onClick={setOverlayShown?.bind(null, false)}
      ></div>

      <WelcomeModal show={welcomeModalShown} />
    </Modal>
  );
};
