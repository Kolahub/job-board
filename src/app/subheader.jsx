'use client'
import { usePathname } from 'next/navigation';
import SearchBar from "@/components/SearchBar";

export default function SubHeader() {
    const pathName = usePathname();

    return <div className="fixed top-32 left-0 right-0 z-10">
        {pathName === '/' && (
            <div className="container mx-auto px-4">
              <SearchBar />
            </div>
        )}
    </div>
    

    }