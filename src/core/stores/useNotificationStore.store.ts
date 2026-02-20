import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface AppNotification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'info' | 'success' | 'warning' | 'error';
}

export const useNotificationStore = defineStore('notifications', () => {
    const isOpen = ref(false);

    const notifications = ref<AppNotification[]>([
        {
            id: '1',
            title: 'New job match',
            message: 'A new Senior Frontend Developer role matches your profile.',
            time: '2 min ago',
            read: false,
            type: 'info',
        },
        {
            id: '2',
            title: 'Application viewed',
            message: 'Stripe viewed your application for Staff Engineer.',
            time: '1 hour ago',
            read: false,
            type: 'success',
        },
        {
            id: '3',
            title: 'Interview reminder',
            message: 'You have an interview with Vercel tomorrow at 10:00 AM.',
            time: '3 hours ago',
            read: false,
            type: 'warning',
        },
        {
            id: '4',
            title: 'Application rejected',
            message: 'Unfortunately your application to Netflix was not selected.',
            time: 'Yesterday',
            read: true,
            type: 'error',
        },
        {
            id: '5',
            title: 'Profile completed',
            message: 'Your profile is 100% complete. Great work!',
            time: '2 days ago',
            read: true,
            type: 'success',
        },
    ]);

    const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

    const toggle = () => { isOpen.value = !isOpen.value; };
    const close = () => { isOpen.value = false; };

    const markAsRead = (id: string) => {
        const notification = notifications.value.find(n => n.id === id);
        if (notification) notification.read = true;
    };

    const markAllAsRead = () => {
        notifications.value.forEach(n => { n.read = true; });
    };

    return { isOpen, notifications, unreadCount, toggle, close, markAsRead, markAllAsRead };
});
