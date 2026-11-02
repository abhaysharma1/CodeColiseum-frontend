import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/features/authentication/auth-context";
import { useTabFocus } from "@/hooks/useTabFocus";
import { fetchNotifications } from "@/features/notifications/api/notifications";
import { useNotificationStore } from "@/stores/notification-store";

/**
 * Polls the unread notification count and publishes it to the shared Zustand
 * store so the bell badge and dropdown stay in sync.
 */
export function useUnreadCount(pollIntervalMs: number = 30000) {
  const { user, loading: authLoading } = useAuth();
  const isTabFocused = useTabFocus();
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const resetUnread = useNotificationStore((state) => state.reset);
  const [loading, setLoading] = useState(false);

  const canFetch = !!user && !authLoading;
  const canPoll = canFetch && isTabFocused;

  const load = useCallback(async () => {
    if (!canFetch) return;
    try {
      setLoading(true);
      const res = await fetchNotifications({ page: 1, limit: 1 });
      setUnreadCount(res.unreadCount);
    } catch (err) {
      console.error("Failed to fetch unread notification count", err);
    } finally {
      setLoading(false);
    }
  }, [canFetch, setUnreadCount]);

  useEffect(() => {
    if (!canFetch) {
      resetUnread();
      return;
    }
    load();
  }, [canFetch, load, resetUnread]);

  useEffect(() => {
    if (!canPoll || !pollIntervalMs) return;

    const id = setInterval(() => {
      load();
    }, pollIntervalMs);

    return () => clearInterval(id);
  }, [canPoll, pollIntervalMs, load]);

  return { unreadCount, loading, refresh: load };
}
