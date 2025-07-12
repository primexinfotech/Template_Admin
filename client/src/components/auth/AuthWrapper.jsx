import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Route, Switch } from 'wouter';
import { SidebarProvider } from '@/contexts/SidebarContext';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import AdminLayout from '@/components/layout/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Orders from '@/pages/Orders';
import NotFound from '@/pages/not-found';

function AuthWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <SidebarProvider>
      <AdminLayout>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/orders" component={Orders} />
          <Route component={NotFound} />
        </Switch>
      </AdminLayout>
    </SidebarProvider>
  );
}

export default AuthWrapper;