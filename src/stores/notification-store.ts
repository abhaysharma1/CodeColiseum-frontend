import { create } from "zustand";

interface NotificationUiState {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  decrementUnread: (by?: number) => void;
  reset: () => void;
}

/**
 * Shared client state for the notification badge.
 *
 * The list itself remains server state (API calls); only the derived badge
 * counter is shared between the bell and the dropdown.
 */
export const useNotificationStore = create<NotificationUiState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) =>
    set({ unreadCount: Number.isFinite(count) ? Math.max(0, count) : 0 }),
  decrementUnread: (by = 1) =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - by) })),
  reset: () => set({ unreadCount: 0 }),
}));
