
import UserTable from './UserTable';
import { Suspense } from 'react';

export default async function  User() {
  return (
    <div className=''>
      <Suspense fallback={<div>Loading users…</div>}>
        <UserTable />
      </Suspense>
    </div>
  )
}

