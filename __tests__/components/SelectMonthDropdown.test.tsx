import { render, screen, fireEvent } from "@testing-library/react";
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown";
import { useSelectMonth } from "@/shared/hooks/useSelectMonth";
import { MONTHS } from "@/shared/types/global.types";

// Wrapper component that integrates useSelectMonth and SelectMonthDropdown
const SelectMonthDropdownWrapper = () => {
  const { selectedMonth, updateSelectMonth } = useSelectMonth();

  return (
    <SelectMonthDropdown
      selectedMonth={selectedMonth}
      changeSelectedMonth={updateSelectMonth}
    />
  );
};

describe("SelectMonthDropdown", () => {
  it("should render the dropdown with the current month selected", () => {
    render(<SelectMonthDropdownWrapper />);

    expect(screen.getByTestId('select-month-dropdown-button')).toBeInTheDocument();
  });

  it("should display all months in the dropdown when clicked", () => {
    render(<SelectMonthDropdownWrapper />);

    const dropdownButton = screen.getByRole("button", { name: /Mes:/i });
    fireEvent.click(dropdownButton);

    MONTHS.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });

  it("should update the selected month when a new month is clicked", () => {
    render(<SelectMonthDropdownWrapper />);

    const dropdownButton = screen.getByRole("button", { name: /Mes:/i });
    fireEvent.click(dropdownButton);

    const newMonth = MONTHS[1]; // Select the second month
    const newMonthOption = screen.getByText(newMonth);
    fireEvent.click(newMonthOption);

    expect(screen.getByText(`Mes: ${newMonth}`)).toBeInTheDocument();
  });
});