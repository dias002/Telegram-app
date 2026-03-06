import { ProfilePage } from "../api/users";
import BudgetPage from "../components/budget";
import ErrorMessage from "../components/ErrorMessage";

function Profile({ setError }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-zinc-950 px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 items-start">

        {/* Sidebar – profile info */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 lg:sticky lg:top-24">
          <ProfilePage />
        </div>

        {/* Main – budget */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
          <BudgetPage setError={setError} />
        </div>

      </div>
      <ErrorMessage />
    </div>
  );
}

export default Profile;
