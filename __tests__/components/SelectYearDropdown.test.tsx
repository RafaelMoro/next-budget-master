import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectYearDropdown } from "@/shared/ui/atoms/SelectYearDropdown";
import { useSelectYear } from "@/shared/hooks/useSelectYear";
import { getDateInfo } from "@/shared/utils/getDateInfo";

// Wrapper component that integrates useSelectYear and SelectYearDropdown
const SelectYearDropdownWrapper = () => {
  const { selectedYear, updateSelectYear } = useSelectYear();

  return (
    <SelectYearDropdown
      selectedYear={selectedYear}
      changeSelectedYear={updateSelectYear}
    />
  );
};

describe("SelectYearDropdown", () => {
  const { year, years } = getDateInfo();

  it("should render the dropdown with the current year selected", () => {
    render(<SelectYearDropdownWrapper />);

    expect(screen.getByTestId("select-year-dropdown-button")).toHaveTextContent(year);
  });

  it("should display all years in the dropdown when clicked", async () => {
    render(<SelectYearDropdownWrapper />);

    const dropdownButton = screen.getByTestId("select-year-dropdown-button");
    await userEvent.click(dropdownButton);

    const dropdownItems = screen.getAllByRole("menuitem");
    expect(dropdownItems).toHaveLength(years.length);

    years.forEach((year, index) => {
      expect(dropdownItems[index]).toHaveTextContent(year);
    });
  });

  it("should update the selected year when a new year is clicked", async () => {
    render(<SelectYearDropdownWrapper />);

    const dropdownButton = screen.getByTestId("select-year-dropdown-button");
    await userEvent.click(dropdownButton);

    const newYear = years[1]; // Select the second year
    const newYearOption = screen.getByText(newYear);
    await userEvent.click(newYearOption);

    expect(screen.getByTestId("select-year-dropdown-button")).toHaveTextContent(newYear);
  });
});