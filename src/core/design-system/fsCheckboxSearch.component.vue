<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps<{
    items: string[];
    modelValue: string[];
    loading?: boolean;
    searchPlaceholder?: string;
    emptyText?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>();

const search = ref('');

const filtered = computed(() => {
    if (!search.value) return props.items;
    return props.items.filter((i) =>
        i.toLowerCase().includes(search.value.toLowerCase()),
    );
});

const toggle = (item: string) => {
    const current = props.modelValue;
    emit(
        'update:modelValue',
        current.includes(item)
            ? current.filter((i) => i !== item)
            : [...current, item],
    );
};
</script>

<template>
    <div class="space-y-3">
        <input
            v-model="search"
            :placeholder="searchPlaceholder ?? t('common.search.placeholder')"
            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            type="text"
        />

        <div v-if="loading" class="text-xs text-slate-400 py-2">
            {{ t('common.search.loading') }}
        </div>

        <div v-else class="max-h-56 overflow-y-auto">
            <label
                v-for="item in filtered"
                :key="item"
                class="flex items-center gap-3 w-full px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-slate-100"
            >
                <input
                    :checked="modelValue.includes(item)"
                    class="w-4 h-4 accent-slate-900"
                    type="checkbox"
                    @change="toggle(item)"
                />
                <span class="text-sm font-medium tracking-wide">{{ item }}</span>
            </label>

            <div v-if="filtered.length === 0" class="text-xs text-slate-400 px-4 py-2">
                {{ emptyText ?? t('common.search.noResults') }}
            </div>
        </div>
    </div>
</template>
