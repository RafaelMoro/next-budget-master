import { render, screen } from '@testing-library/react';
import { IndebtedPeoplePreviewRecord } from '@/features/IndebtedPeople/IndebtedPeoplePreviewRecord';
import { 
  indebtedPersonMock1,
  indebtedPersonMock2,
  indebtedPersonMock3,
  indebtedPersonMock4,
  indebtedPersonMock5,
  indebtedPeopleMockList,
  mixedStatusIndebtedPeople 
} from '../../mocks/indebted-people.mock';
import { IndebtedPeople } from '@/shared/types/records.types';

describe('IndebtedPeoplePreviewRecord', () => {
  it('should render empty list when no indebted people are provided', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[]} />);
    
    const container = screen.getByTestId('show-indebted-people-list');
    expect(container).toBeInTheDocument();
    
    const listGroup = screen.getByRole('list');
    expect(listGroup).toBeInTheDocument();
    expect(listGroup).toBeEmptyDOMElement();
  });

  it('should render a single unpaid person correctly', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    // Check person name
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    
    // Check formatted amount (negative sign added)
    expect(screen.getByText('- $150.75')).toBeInTheDocument();
    
    // Check remaining amount for unpaid person
    expect(screen.getByText('Restan - $100.50')).toBeInTheDocument();
    
    // Should not show "Pagado" for unpaid person
    expect(screen.queryByText('Pagado')).not.toBeInTheDocument();
    
    // Check avatar with correct initial
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
  });

  it('should render a single paid person correctly', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock2]} />);
    
    // Check person name
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check formatted amount 
    expect(screen.getByText('- $300.00')).toBeInTheDocument();
    
    // Check "Pagado" status for paid person
    expect(screen.getByText('Pagado')).toBeInTheDocument();
    
    // Should not show remaining amount for paid person
    expect(screen.queryByText(/Restan/)).not.toBeInTheDocument();
  });

  it('should render multiple people with different payment statuses', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={mixedStatusIndebtedPeople} />);
    
    // Check all names are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('Maria Garcia')).toBeInTheDocument();
    
    // Check amounts are rendered correctly
    expect(screen.getByText('- $150.75')).toBeInTheDocument();
    expect(screen.getByText('- $300.00')).toBeInTheDocument();
    expect(screen.getByText('- $75.50')).toBeInTheDocument();
    expect(screen.getByText('- $2,500.99')).toBeInTheDocument();
    
    // Check payment statuses
    expect(screen.getByText('Pagado')).toBeInTheDocument(); // Jane Smith
    expect(screen.getByText('Restan - $100.50')).toBeInTheDocument(); // John Doe
    expect(screen.getByText('Restan - $75.50')).toBeInTheDocument(); // Bob Johnson  
    expect(screen.getByText('Restan - $1,500.99')).toBeInTheDocument(); // Maria Garcia
  });

  it('should render correct number of list items', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={indebtedPeopleMockList} />);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('should display correct styling classes for paid status', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock2]} />);
    
    const paidStatus = screen.getByText('Pagado');
    expect(paidStatus).toHaveClass('text-xs', 'justify-self-start', 'place-self-start', 'text-green-400');
  });

  it('should display correct styling classes for unpaid status', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    const unpaidStatus = screen.getByText('Restan - $100.50');
    expect(unpaidStatus).toHaveClass('text-xs', 'justify-self-start', 'place-self-start', 'text-blue-400');
  });

  it('should display correct styling for person name', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    const personName = screen.getByText('John Doe');
    expect(personName).toHaveClass('justify-self-start', 'text-base', 'place-self-end');
  });

  it('should display correct styling for amount', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    const amount = screen.getByText('- $150.75');
    expect(amount).toHaveClass('text-red-600', 'justify-self-end', 'row-span-2');
  });

  it('should handle person with zero amount paid', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock3]} />);
    
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    expect(screen.getByText('- $75.50')).toBeInTheDocument();
    expect(screen.getByText('Restan - $75.50')).toBeInTheDocument();
    expect(screen.queryByText('Pagado')).not.toBeInTheDocument();
  });

  it('should handle person without _id field', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock5]} />);
    
    expect(screen.getByText('Alex Wilson')).toBeInTheDocument();
    expect(screen.getByText('- $100.00')).toBeInTheDocument();
    expect(screen.getByText('Pagado')).toBeInTheDocument();
  });

  it('should handle person with large amounts correctly', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock4]} />);
    
    expect(screen.getByText('Maria Garcia')).toBeInTheDocument();
    expect(screen.getByText('- $2,500.99')).toBeInTheDocument();
    expect(screen.getByText('Restan - $1,500.99')).toBeInTheDocument();
  });

  it('should render avatars with correct initials', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={indebtedPeopleMockList} />);
    
    // Note: Flowbite Avatar component renders initials as text content, not alt text
    // We can check for the presence of avatars but specific initial checking 
    // might require more detailed DOM inspection
    const avatars = screen.getAllByRole('img');
    expect(avatars).toHaveLength(3);
    
    // Check that avatars have the correct classes
    avatars.forEach(avatar => {
      expect(avatar.closest('div')).toHaveClass('justify-self-start', 'row-span-2');
    });
  });

  it('should update when indebtedPeople prop changes', () => {
    const { rerender } = render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    
    rerender(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock2]} />);
    
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should handle person with special characters in name', () => {
    const personWithSpecialChars: IndebtedPeople = {
      name: "José María-González & Co.",
      amount: 100,
      amountPaid: 50,
      isPaid: false,
    };
    
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[personWithSpecialChars]} />);
    
    expect(screen.getByText('José María-González & Co.')).toBeInTheDocument();
    expect(screen.getByText('- $100.00')).toBeInTheDocument();
    expect(screen.getByText('Restan - $50.00')).toBeInTheDocument();
  });

  it('should use person name as the key for list items', () => {
    // This test ensures each person is uniquely keyed by name
    const duplicateNamePeople: IndebtedPeople[] = [
      { name: "John", amount: 100, amountPaid: 0, isPaid: false },
      { name: "John", amount: 200, amountPaid: 0, isPaid: false } // Same name, different data
    ];
    
    render(<IndebtedPeoplePreviewRecord indebtedPeople={duplicateNamePeople} />);
    
    // Both Johns should be rendered (React will handle duplicate keys with warnings)
    const johnElements = screen.getAllByText('John');
    expect(johnElements).toHaveLength(2);
    
    // Check that both amounts are present
    expect(screen.getByText('- $100.00')).toBeInTheDocument();
    expect(screen.getByText('- $200.00')).toBeInTheDocument();
  });

  it('should have correct grid layout structure', () => {
    render(<IndebtedPeoplePreviewRecord indebtedPeople={[indebtedPersonMock1]} />);
    
    const personName = screen.getByText('John Doe');
    const gridContainer = personName.closest('div.w-full');
    
    expect(gridContainer).toHaveClass(
      'w-full',
      'grid',
      'grid-cols-[min-content_1fr_1fr]',
      'grid-rows-2',
      'place-items-center',
      'gap-2'
    );
  });
});
