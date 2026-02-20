<script lang="ts" setup>
import { useNotificationStore } from '@/core/stores/useNotificationStore.store';

const store = useNotificationStore();

const typeConfig = {
    info:    { icon: 'mdi-information-outline',  bg: 'bg-blue-100',  text: 'text-blue-600'  },
    success: { icon: 'mdi-check-circle-outline', bg: 'bg-green-100', text: 'text-green-600' },
    warning: { icon: 'mdi-alert-outline',        bg: 'bg-amber-100', text: 'text-amber-600' },
    error:   { icon: 'mdi-close-circle-outline', bg: 'bg-red-100',   text: 'text-red-600'   },
};
</script>

<template>
    <!-- Backdrop -->
    <Transition name="fade">
        <div
            v-if="store.isOpen"
            class="fixed inset-0 bg-black/40 z-50"
            @click="store.close()"
        />
    </Transition>

    <!-- Panel -->
    <Transition name="slide-right">
        <div
            v-if="store.isOpen"
            class="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
        >
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div class="flex items-center gap-3">
                    <h2 class="text-lg font-semibold text-gray-800">Notifications</h2>
                    <span
                        v-if="store.unreadCount > 0"
                        class="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-semibold"
                    >
                        {{ store.unreadCount }}
                    </span>
                </div>

                <div class="flex items-center gap-2">
                    <button
                        v-if="store.unreadCount > 0"
                        class="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition"
                        @click="store.markAllAsRead()"
                    >
                        Mark all as read
                    </button>
                    <button
                        class="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                        @click="store.close()"
                    >
                        <i class="mdi mdi-close text-xl"></i>
                    </button>
                </div>
            </div>

            <!-- List -->
            <div class="flex-1 overflow-y-auto divide-y divide-gray-50">
                <button
                    v-for="notif in store.notifications"
                    :key="notif.id"
                    :class="notif.read ? 'bg-white' : 'bg-indigo-50/40'"
                    class="w-full text-left flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition"
                    @click="store.markAsRead(notif.id)"
                >
                    <div
                        :class="[typeConfig[notif.type].bg, typeConfig[notif.type].text]"
                        class="mt-0.5 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                        <i :class="typeConfig[notif.type].icon" class="mdi text-lg"></i>
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between gap-2">
                            <p
                                :class="notif.read ? 'font-medium text-gray-700' : 'font-semibold text-gray-900'"
                                class="text-sm leading-snug"
                            >
                                {{ notif.title }}
                            </p>
                            <span
                                v-if="!notif.read"
                                class="mt-1 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"
                            />
                        </div>
                        <p class="text-xs text-gray-500 mt-0.5 leading-relaxed">{{ notif.message }}</p>
                        <p class="text-xs text-gray-400 mt-1">{{ notif.time }}</p>
                    </div>
                </button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
