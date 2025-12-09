'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Category {
    value: string;
    label: string;
}

interface BlogCategoryFilterProps {
    categories: Category[];
    currentCategory: string;
    categoryCounts: Record<string, number>;
}

export default function BlogCategoryFilter({
    categories,
    currentCategory,
    categoryCounts,
}: BlogCategoryFilterProps) {
    const searchParams = useSearchParams();

    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
                const count = categoryCounts[category.value] || 0;
                const isActive = currentCategory === category.value;

                return (
                    <Link
                        key={category.value}
                        href={category.value === 'all' ? '/blog' : `/blog?category=${category.value}`}
                    >
                        <Button
                            variant={isActive ? 'default' : 'outline'}
                            className={`${
                                isActive
                                    ? 'bg-brand-navy text-white hover:bg-brand-dark'
                                    : 'hover:bg-brand-navy/10'
                            }`}
                        >
                            {category.label}
                            {count > 0 && (
                                <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                                    isActive ? 'bg-white/20' : 'bg-brand-navy/10'
                                }`}>
                                    {count}
                                </span>
                            )}
                        </Button>
                    </Link>
                );
            })}
        </div>
    );
}

