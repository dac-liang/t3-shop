import Link from "next/link";
import { AuthShowcase } from "@components";

const Header: React.FC = () => {
  return (
    <header className="body-font text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <nav className="flex flex-wrap items-center text-base md:ml-auto lg:w-2/5">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="hover:text-gray-900">Fourth Link</a>
        </nav>
        <Link
          href="/"
          className="title-font order-first mb-4 flex items-center font-medium text-gray-900 md:mb-0 lg:order-none lg:w-1/5 lg:items-center lg:justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10 rounded-full bg-yellow-500 p-2 text-white"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">プロテインマーケット</span>
        </Link>
        <div className="ml-5 inline-flex lg:ml-0 lg:w-2/5 lg:justify-end">
          <AuthShowcase />
        </div>
      </div>
    </header>
  );
};

export default Header;
