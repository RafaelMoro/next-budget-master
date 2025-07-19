import { IndebtedPeople } from "@/shared/types/records.types";

// Mock data for IndebtedPeoplePreviewRecord component tests
export const indebtedPersonMock1: IndebtedPeople = {
  _id: "indebted_001",
  name: "John Doe",
  amount: 150.75,
  amountPaid: 50.25,
  isPaid: false,
};

export const indebtedPersonMock2: IndebtedPeople = {
  _id: "indebted_002", 
  name: "Jane Smith",
  amount: 300.00,
  amountPaid: 300.00,
  isPaid: true,
};

export const indebtedPersonMock3: IndebtedPeople = {
  _id: "indebted_003",
  name: "Bob Johnson",
  amount: 75.50,
  amountPaid: 0,
  isPaid: false,
};

export const indebtedPersonMock4: IndebtedPeople = {
  _id: "indebted_004",
  name: "Maria Garcia",
  amount: 2500.99,
  amountPaid: 1000.00,
  isPaid: false,
};

export const indebtedPersonMock5: IndebtedPeople = {
  name: "Alex Wilson", // No _id to test optional field
  amount: 100.00,
  amountPaid: 100.00,
  isPaid: true,
};

// Collection of mock data for different test scenarios
export const indebtedPeopleMockList = [
  indebtedPersonMock1,
  indebtedPersonMock2,
  indebtedPersonMock3,
];

export const mixedStatusIndebtedPeople = [
  indebtedPersonMock1, // Partially paid
  indebtedPersonMock2, // Fully paid
  indebtedPersonMock3, // Unpaid
  indebtedPersonMock4, // Partially paid with large amounts
];
