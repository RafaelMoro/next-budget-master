For the unit tests, consider the following instructions:

- If the component has a hook useDashboardStore, it means it has a zustand store, then take as reference the file \_\_tests\_\_/feature/Dashboard/Dashboard.test.tsx and wrap
  the component with DashboardStoreProvider and use mockAccounts
- If in the terminal has an error related to the cookies, take as reference \_\_tests\_\_/home.test.tsx to mock the cookies like shown in lines 13 to 18 using jest.mock of next/headers
- If the tests fails because of the router or if the component uses router from next, take as reference \_\_tests\_\_/home.test.tsx to wrap the component in AppRouterContextProviderMock like shown there
- If the test fail because it needs a query provider due tanstack query usage of mutation or query, takes as reference \_\_tests\_\_/home.test.tsx to wrap the component in QueryProviderMock like shown there
