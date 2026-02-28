import { ProfilePage } from "../api/users";

import BudgetPage from "../components/budget";
import ErrorMessage from "../components/ErrorMessage";

function Profile({ setError }) {
  return (
    <div className="flex flex-col items-center min-h-[60vh] bg-gradient-to-br from-blue-50 to-blue-200 py-10 md:py-20 md:min-h-[80vh]">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <ProfilePage />
        <BudgetPage setError={setError }/>
        <ErrorMessage/>
      </div>
        
      </div>
    );
  }
  
  export default Profile;
 