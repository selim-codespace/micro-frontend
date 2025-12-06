// Module Federation Remote Declarations
// These declarations allow TypeScript to recognize dynamically loaded modules

declare module 'auth/LoginForm' {
  const LoginForm: React.ComponentType<{ onSuccess?: () => void }>;
  export default LoginForm;
}

declare module 'auth/RegisterForm' {
  const RegisterForm: React.ComponentType<{ onSuccess?: () => void }>;
  export default RegisterForm;
}

declare module 'dashboard/DashboardPage' {
  const DashboardPage: React.ComponentType;
  export default DashboardPage;
}

declare module 'dashboard/DashboardWidget' {
  interface DashboardWidgetProps {
    label: string;
    value: string;
    change: string;
    positive: boolean;
    icon: string;
  }
  const DashboardWidget: React.ComponentType<DashboardWidgetProps>;
  export default DashboardWidget;
}

declare module 'analytics/AnalyticsPage' {
  const AnalyticsPage: React.ComponentType;
  export default AnalyticsPage;
}

declare module 'analytics/AnalyticsChart' {
  const AnalyticsChart: React.ComponentType;
  export default AnalyticsChart;
}

declare module 'billing/BillingPage' {
  const BillingPage: React.ComponentType;
  export default BillingPage;
}

declare module 'admin/AdminPage' {
  const AdminPage: React.ComponentType;
  export default AdminPage;
}

declare module 'notifications/NotificationsPage' {
  const NotificationsPage: React.ComponentType;
  export default NotificationsPage;
}
