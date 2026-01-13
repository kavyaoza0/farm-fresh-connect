import { CustomerHome } from '@/pages/CustomerHome';

// Landing page always shows customer view - no role selection
// Role-based dashboards are accessed via hamburger menu
const Index = () => {
  return <CustomerHome />;
};

export default Index;
