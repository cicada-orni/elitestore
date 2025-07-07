import * as React from 'react'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'

export function SearchInput() {
  return (
    <div className="relative flex w-full max-w-sm items-center">
      <Input type="search" placeholder="Search products..." className="pr-12" />
      <Button
        type="submit"
        size="icon"
        className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  )
}
