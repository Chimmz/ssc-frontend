// 'use'
// import Link from 'next/link';
// import MultiStepComponent from '@/components/shared/multistep-component';
// import ContactInfo from '@/components/signup-questionnaire/contact-info/ContactInfo';
// import GoalsAndPreferences from '@/components/signup-questionnaire/goals-and-preferences';
// import PersonalInfo from '@/components/signup-questionnaire/personal-info/PersonalInfo';
// import ChooseRoles from '@/components/signup-questionnaire/roles';
// import { usePostSignupQuestionnaireContext } from '@/contexts/PostSignupQuestionnaireContext';
// import React from 'react';
// import WelcomeModal from '@/components/signup-questionnaire/welcome/WelcomeModal';

// const steps = [
//   { name: 'Personal Information', component: <PersonalInfo />, isMandatory: false },
//   { name: 'Contact Information', component: <ContactInfo />, isMandatory: false },
//   { name: 'Describe your role', component: <ChooseRoles />, isMandatory: false },
//   { name: 'My goals', component: <GoalsAndPreferences />, isMandatory: false }
//   // { name: 'Startup Information', component: <StartupInfo />, isMandatory: false }
// ];

// export default () => {
//   const {
//     isUpdatingUser,
//     overlayShown,
//     setOverlayShown,
//     welcomeModalShown,
//     setShowWelcomeModal
//   } = usePostSignupQuestionnaireContext();

//   return {
//     mainContent: (
//       <MultiStepComponent
//         steps={steps}
//         defaultStep={0}
//         onFinish={setShowWelcomeModal?.bind(null, true)}
//         loading={isUpdatingUser}
//       />
//     ),

//     fixedUI: (
//       <>
//         {/* Backdrop for the component rendered by the <MultiStepComponent /> */}
//         <div
//           className={overlayShown ? 'fade modal-backdrop show' : ''}
//           style={{ zIndex: '1055' }}
//           onClick={setOverlayShown?.bind(null, false)}
//         ></div>

//         <WelcomeModal show={welcomeModalShown} />
//       </>
//     )
//   };
// };
