
'use client';

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Shield, User, XOctagon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { users as initialUsers } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { useState } from 'react';
import type { User as UserType } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

type ActionType = 'delete' | 'suspend';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType | null>(null);
  const { toast } = useToast();

  const openConfirmationDialog = (user: UserType, action: ActionType) => {
    setSelectedUser(user);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedUser || !actionType) return;

    if (actionType === 'delete') {
      setUsers(users.filter(u => u.id !== selectedUser.id));
      toast({ title: 'User Deleted', description: `User ${selectedUser.name} has been deleted from the system.` });
    } else if (actionType === 'suspend') {
      // In a real app, you'd update the user's status
      toast({ title: 'User Suspended', description: `User ${selectedUser.name} has been suspended.` });
    }

    setDialogOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };
  
  const changeUserRole = (userId: string, newRole: 'customer' | 'admin') => {
    setUsers(users.map(u => u.id === userId ? {...u, role: newRole} : u));
    toast({ title: 'Role Changed', description: `User's role has been successfully changed.` });
  };


  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your customers and administrators.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden sm:table-cell">Orders</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const avatar = placeholderImages.placeholderImages.find(p => p.id === user.avatarId);
                  return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                           {avatar && (
                            <Image
                              src={avatar.imageUrl}
                              alt={user.name}
                              data-ai-hint={avatar.imageHint}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="truncate max-w-32 sm:max-w-none">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{user.orderHistory.length}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                               <DropdownMenuSubContent>
                                  <DropdownMenuItem onClick={() => changeUserRole(user.id, 'admin')}>
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>Admin</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => changeUserRole(user.id, 'customer')}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Customer</span>
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openConfirmationDialog(user, 'suspend')}>
                             <XOctagon className="mr-2 h-4 w-4" />
                             Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => openConfirmationDialog(user, 'delete')}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'delete'
                ? `You are about to permanently delete ${selectedUser?.name}. This action cannot be undone.`
                : `Are you sure you want to suspend ${selectedUser?.name}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmAction}
              className={actionType === 'delete' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
