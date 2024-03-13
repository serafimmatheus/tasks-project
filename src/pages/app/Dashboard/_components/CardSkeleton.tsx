import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>
          <Skeleton className='w-100 h-3' />
        </CardTitle>
      </CardHeader>
      <CardContent className='h-24 overflow-y-auto'>
        <p className='text-sm gap-3 flex flex-col'>
          <Skeleton className='w-2/4 h-3' />
          <Skeleton className='w-1/4 h-3' />
          <Skeleton className='w-2/4 h-3' />
          <Skeleton className='w-3/4 h-3' />
          <Skeleton className='w-2/4 h-3' />
        </p>
      </CardContent>
      <CardFooter className='flex gap-2 pt-2 justify-between'>
        <div>
          <Skeleton className='w-1/4' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='w-8 h-8 rounded' />

          <Skeleton className='w-8 h-8 rounded' />
        </div>
      </CardFooter>
    </Card>
  )
}

export default CardSkeleton
