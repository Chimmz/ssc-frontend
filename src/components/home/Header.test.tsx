import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from './Header';

test('Shows images, heading and join button', () => {
  render(<Header />);

  // Shows images
  const images = within(screen.getByTestId('img-box')).queryAllByRole('img');
  expect(images.length).toBe(5);

  // Shows heading
  const h1 = screen.getByRole('heading', { name: /Empowering Entrepreneurs in Korea/i });
  expect(h1).toBeInTheDocument();

  // Shows join link
  const btnLink = within(screen.getByRole('link')).getByText(/Join our community of active/i);
  expect(btnLink).toBeInTheDocument();
});
