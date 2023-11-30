import EntrepreneurialImg from './Entrepreneurial.svg';
import MentorImg from './Mentor.svg';
import EnablersImg from './Enablers.svg';

export enum RoleTypes {
  ENTREPRENEURIAL = 'Entrepreneurial Roles/Aspiring Entrepreneurs',
  MENTOR_OR_PROVIDER = 'Startup Mentor/Service providers',
  ECOSYSTEM_ENABLERS = 'Startup Ecosystem Enablers'
}

export const roleTypes = [
  { img: EntrepreneurialImg, value: RoleTypes.ENTREPRENEURIAL },
  { img: MentorImg, value: RoleTypes.MENTOR_OR_PROVIDER },
  { img: EnablersImg, value: RoleTypes.ECOSYSTEM_ENABLERS }
];

export const classifiedRoles = {
  [RoleTypes.ENTREPRENEURIAL]: [
    'Founder',
    'Co-founder',
    'CEO',
    'Startup team member',
    'Student',
    'Employee',
    'Freelancer'
  ],
  [RoleTypes.MENTOR_OR_PROVIDER]: [
    'Startup Consultant',
    'Startup Mentor',
    'Startup book author',
    'Lawyer',
    'Accountant',
    'Translator',
    'Freelancer'
    // 'Other Service Provider'
  ],
  [RoleTypes.ECOSYSTEM_ENABLERS]: [
    'Event Organizer',
    'Venture Capital Representative',
    'Startup Program Representative',
    'Government Representative',
    'Investment Entity',
    'Individual Investor'
  ]
};
