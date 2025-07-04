// src/routes/index.ts
const ProviderNotFound = () => <h2>Not Found Provider</h2>;

const providerRoutes = [
  {
    path: '/f-inspect',
    children: [
      {
        path: '',
        element: <h4>Dashboard Overview</h4>,
      },
      {
        path: 'settings',
        element: <h4>Dashboard Settings</h4>,
      },
    ],
  },
  {
    path:"*",
    element:  <ProviderNotFound />
  },
];

export default providerRoutes;