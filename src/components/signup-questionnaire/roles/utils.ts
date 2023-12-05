import EntrepreneurialImg from './Entrepreneurial.svg';
import MentorImg from './Mentor.svg';
import EnablersImg from './Enablers.svg';

export enum RoleTypes {
  ENTREPRENEURIAL = 'Entrepreneurial Roles/Aspiring Entrepreneurs',
  MENTOR_OR_PROVIDER = 'Startup Mentor/Service providers',
  ECOSYSTEM_ENABLERS = 'Startup Ecosystem Enablers'
}

export const roleTypes = [
  { img: EntrepreneurialImg.src, value: RoleTypes.ENTREPRENEURIAL },
  { img: MentorImg.src, value: RoleTypes.MENTOR_OR_PROVIDER },
  { img: EnablersImg.src, value: RoleTypes.ECOSYSTEM_ENABLERS }
];
('Founder');
('Co-founder');
('CEO');
('Startup team member');
('Student');
('Employee');
('Pre-Entrepreneur');
('Entrepreneur');
('Other');
export const classifiedRoles = {
  [RoleTypes.ENTREPRENEURIAL]: [
    'Founder',
    'Co-founder',
    'CEO',
    'Startup team member',
    'Student',
    'Employee',
    'Freelancer',
    'Pre-Entrepreneur',
    'Entrepreneur'
  ],
  [RoleTypes.MENTOR_OR_PROVIDER]: [
    'Startup Consultant',
    'Startup Mentor',
    'Startup book author',
    'Lawyer',
    'Accountant',
    'Translator',
    'Freelancer',
    'Developer',
    'Biz Owner',
    'Other'
    // 'Other Service Provider'
  ],
  [RoleTypes.ECOSYSTEM_ENABLERS]: [
    'Venture Capital Representative',
    'Startup Support Program Rep.',
    'Government Representative',
    'Investment Firm Representative ',
    'Individual Investor',
    'Startup School Representative',
    'Event Organizer',
    'Startup Community Representative',
    'Accelerator Program Representative'
  ]
};
