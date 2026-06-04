  import { Heart, MessageCircle, UserRoundPlus } from "lucide-react";
import type { NotificationType } from "../types/NotificationTypes";

  
  export const renderIcon = (type: NotificationType) => {
    switch (type) {
      case "LIKE":
        return (
          <Heart />
        );
      case "COMMENT":
        return (
          <MessageCircle />
        );
      case "FOLLOW":
        return (
          <UserRoundPlus />
        );
    }
  };