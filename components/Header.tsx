import React from "react";

const Header = ({ logout }: { logout: () => Promise<void> }) => {
  return (
    <header className="w-full flex justify-end p-4 bg-privy-light-blue">
      <button
        onClick={logout}
        className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 mr-5 rounded-md text-violet-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
