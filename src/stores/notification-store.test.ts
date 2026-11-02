import { beforeEach, describe, expect, it } from "vitest";
import { useNotificationStore } from "@/stores/notification-store";

describe("notification store", () => {
  beforeEach(() => {
    useNotificationStore.getState().reset();
  });

  it("never goes below zero", () => {
    useNotificationStore.getState().decrementUnread(3);
    expect(useNotificationStore.getState().unreadCount).toBe(0);
  });

  it("stores a valid unread count", () => {
    useNotificationStore.getState().setUnreadCount(7);
    expect(useNotificationStore.getState().unreadCount).toBe(7);

    useNotificationStore.getState().decrementUnread();
    expect(useNotificationStore.getState().unreadCount).toBe(6);
  });

  it("ignores invalid counts", () => {
    useNotificationStore.getState().setUnreadCount(Number.NaN);
    expect(useNotificationStore.getState().unreadCount).toBe(0);
  });
});
