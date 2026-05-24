import { useMutation, useQueryClient } from '@tanstack/react-query';
import {markOneNotificationRead, markAllNotificationsRead} from '../services/notificationService';
import toast from 'react-hot-toast';

export const useMarkOneAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string) => markOneNotificationRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success("Notification marked as read successfully")
    },
  });
};

