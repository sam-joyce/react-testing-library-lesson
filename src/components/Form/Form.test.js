import Form from './Form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


it("should render the form", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  const form = screen.getByRole("form");

  // 3. Assert
  expect(form).toBeInTheDocument();
})

it("should render the basic input fields", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  // getBy....
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  // const emailInput = screen.getByRole("textbox", { name: /email/i });
  const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/i);

  // 3. Assert
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeTruthy();


  // getAllBy...
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach(input => {
    expect(input).toBeInTheDocument();
  })
})

it("should not render error message on load", () => {
  render(<Form />)
  const errorMessage = screen.queryByText(/sorry something went wrong/i)
  console.log(errorMessage);
  // 2 ways of doing the same thing, both not required
  expect(errorMessage).toBeFalsy();
  expect(errorMessage).not.toBeInTheDocument();
})


it("should not submit the form with invalid fields", () => {
  // Arrange
  render(<Form />)

  // Act
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "notvalidemail");

  const button = screen.getByRole("button", { name: /sign in/i });
  userEvent.click(button);

  // Assert
  // expect the error text to be displayed
  // expect the success text to not be displayed
})
