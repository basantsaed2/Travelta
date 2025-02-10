import { Link, useLocation, Outlet } from "react-router-dom";


const SettingLayout = () => {
  const location = useLocation();
  
  // Extracting the active tab from the URL, default to 'countries'
  const pathParts = location.pathname.split('/');
  const activeTab = pathParts.length > 3 ? pathParts[3] : 'countries';
  const isSubPage = location.pathname.includes('/add') || location.pathname.includes('/edit'); // Check if on add/edit page

  return (
    <>
 
      
      {/* Render tabs only if not on add/edit page */}
      {!isSubPage && (
        <div className= "border-b overflow-x-auto mt-10 border-gray-200 mb-4">
          <nav className="flex justify-between text-lg">
            {['countries', 'city', 'zone', 'payment','payment_method','currency','tour_type'].map((tab) => (
              <Link key={tab} to={`/super_admin/settings/${tab}`}>
                <button
                  className={`px-4 py-2 text-xl font-medium ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Page content */}
      <div className="p-4 bg-transparent rounded">
        <Outlet />
      </div>
    </>
  );
};

export default SettingLayout;
