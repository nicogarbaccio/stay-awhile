'use client';

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react";
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
    icon: IconType;
    label: string;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {

    // Hooks for handling URL navigation and query params
    const router = useRouter();
    const params = useSearchParams();

    // A callback function to handle click events on the component
    const handleClick = useCallback(() => {

        // Retrieve the current query params and parse them into an object
        let currentQuery = {};
        if (params) {
          currentQuery = qs.parse(params.toString())
        }

        // Update the `category` property in the query params
        const updatedQuery: any = {
          ...currentQuery,
          category: label
        }

        // If the selected category is already in the URL, remove it
        if (params?.get('category') === label) {
          delete updatedQuery.category;
        }

        // Generate a URL with the updated query params
        const url = qs.stringifyUrl({
          url: '/',
          query: updatedQuery
        }, { skipNull: true });

        // Navigate to the new URL
        router.push(url);

      }, [label, router, params]);

    // Return the rendered component with dynamic styling based on `selected` prop
    return (
        <div onClick={handleClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'} ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
            <Icon size={26} />
            <div className="font-medium text-sm">
                {label}
            </div>
        </div>
    )
}

export default CategoryBox;
