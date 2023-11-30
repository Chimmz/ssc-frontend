import { act, render, screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ContactSection from './Contact';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
// const renderContactSection = () => {

// }

const getInTouchFormElements = () => {
  render(<ContactSection />);
  const form = screen.getByRole('form', { name: 'get-in-touch' });
  const inputLabels = [/full name/i, /email address/i, /subject/i, /message/i];

  const [fullNameInput, email, subjectInput, msgInput] = inputLabels.map(label =>
    within(form).getByRole('textbox', { name: label })
  );
  return [form, fullNameInput, email, subjectInput, msgInput];
};

test('shows 2 forms: subscribe and get-in-touch', () => {
  render(<ContactSection />);
  const forms = screen.getAllByRole('form');
  expect(forms.length).toBe(2);
});

test('shows subscribe form input and button', () => {
  render(<ContactSection />);
  const subscribeForm = screen.getByRole('form', { name: 'subscribe' });
  const emailInput = within(subscribeForm).getByRole('textbox');
  const btnSubscribe = screen.getByRole('button', { name: /subscribe/i });
  const elements = [emailInput, btnSubscribe];
  elements.forEach(el => expect(el).toBeInTheDocument());
});

test('shows get-in-touch form inputs and button', () => {
  const [_, ...inputs] = getInTouchFormElements();
  expect(inputs.length).toBe(4);
});

test('shows an error if subscribe form is submitted without email input', async () => {
  render(<ContactSection />);
  const btnSubscribe = screen.getByRole('button', { name: /subscribe/i });
  btnSubscribe.click();
  expect(await screen.findByText(/this field is required/i)).toBeInTheDocument();
});

// test('sends email upon get-in-touch form submission', async () => {
//   const [form, ...inputs] = getInTouchFormElements();
//   const [fullNameInput, email, subjectInput, msgInput] = inputs;
//   const btnSubmit = within(form).getByRole('button');
//   // const mockFn = jest.fn()

//   user.click(fullNameInput);
//   user.keyboard('Joe Linda');

//   user.click(email);
//   user.keyboard('joe@linda.com');

//   user.click(subjectInput);
//   user.keyboard(`Linda's Subject`);

//   user.click(msgInput);
//   user.keyboard(`Linda's message`);

//   user.click(btnSubmit);
//   screen.debug();

//   await act(async () => await waitFor(() => screen.queryByText(/success/)));
// });
