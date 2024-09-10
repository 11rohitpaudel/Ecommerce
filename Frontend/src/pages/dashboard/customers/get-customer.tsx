import React from 'react'
import useSWR from 'swr'
import { getAllUser } from '../../../Api/userAPI'
import { useAuth } from '../../../hooks/useAuth'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../@/components/ui/table'

const CustomerPage = () => {
  
  const { data: users } =useSWR('/users',  getAllUser)
  console.log(users);
  return (
    <div>
       <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead> Phone </TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, idx) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{user.userDetail.firstName}</TableCell>
            <TableCell>{user.userDetail.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userDetail.phoneNumber}</TableCell>
            <TableCell>{user.userDetail.address}</TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default CustomerPage
