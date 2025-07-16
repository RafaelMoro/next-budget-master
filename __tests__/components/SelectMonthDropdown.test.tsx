import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown";
import { useSelectMonth } from "@/shared/hooks/useSelectMonth";
import { MONTHS } from "@/shared/types/global.types";
import { getDateInfo } from "@/shared/utils/getDateInfo";

// Wrapper component that integrates useSelectMonth and SelectMonthDropdown
const SelectMonthDropdownWrapper = () => {
  const { selectedMonth, updateSelectMonth, allMonths } = useSelectMonth();

  return (
    <SelectMonthDropdown
      selectedMonth={selectedMonth}
      changeSelectedMonth={updateSelectMonth}
      allMonths={allMonths}
    />
  );
};

describe("SelectMonthDropdown", () => {
  const { completeMonth } = getDateInfo()
  it("should render the dropdown with the current month selected", () => {
    render(<SelectMonthDropdownWrapper />);

    expect(screen.getByTestId('select-month-dropdown-button')).toBeInTheDocument();
  });

  it("should display all months in the dropdown when clicked", async () => {
    render(<SelectMonthDropdownWrapper />);

    const dropdownButton = screen.getByTestId("select-month-dropdown-button");
    await userEvent.click(dropdownButton);

    const dropdownItems = screen.getAllByRole("menuitem");
    expect(dropdownItems).toHaveLength(MONTHS.length);

    MONTHS.forEach((month, index) => {
      expect(dropdownItems[index]).toHaveTextContent(month);
    });
  });

  it("should update the selected month when a new month is clicked", async () => {
    render(<SelectMonthDropdownWrapper />);

    const dropdownButton = screen.getByRole("button", { name: `${completeMonth}`});
    await userEvent.click(dropdownButton);

    const newMonth = MONTHS[1]; // Select the second month
    const newMonthOption = screen.getByText(newMonth);
    await userEvent.click(newMonthOption);

    expect(screen.getByText(`Mes: ${newMonth}`)).toBeInTheDocument();
  });
});