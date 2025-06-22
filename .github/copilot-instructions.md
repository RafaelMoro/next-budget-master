For the unit tests, consider the following instructions:

- If the component has a hook useDashboardStore, it means it has a zustand store, then take as reference the file \_\_tests\_\_/feature/Dashboard/Dashboard.test.tsx and wrap the component with DashboardStoreProvider and use mockAccounts

- If in the terminal has an error related to the cookies, take as reference \_\_tests\_\_/home.test.tsx to mock the cookies like shown in lines 13 to 18 using jest.mock of next/headers

- If the tests fails because of the router like this error "invariant expected app router to be mounted" or if the component uses router from next, take as reference \_\_tests\_\_/home.test.tsx to wrap the component in AppRouterContextProviderMock like shown there. Add the function push as jest.fn()

- If the test fail like this error "No QueryClient set, use QueryClientProvider to set one" because it needs a query provider due tanstack query usage of mutation or query, takes as reference \_\_tests\_\_/home.test.tsx to wrap the component in QueryProviderMock like shown there

- If the test has an error related to "ResizeObserver is not defined", then use the mock of the file \_\_tests\_\_/feature/Dashboard/Overview/StatisticsSubscreen.test.tsx

- Do not Mock the component to avoid rendering its internals

- Make sure the tests are passing. Iterate until the tests are passing. Apply the changes into the file if needed. To be sure these are passing run the command: pnpm test -- tests/feature/Accounts/CreateAccButton.test.tsx
