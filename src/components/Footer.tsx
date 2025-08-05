import {JSX} from "react";

export function Footer(): JSX.Element {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4 py-8 text-center">
            <p className="text-sm">
                &copy; 2024-{new Date().getFullYear()} おかゆグループ. All rights reserved.
            </p>
        </footer>
    );
}