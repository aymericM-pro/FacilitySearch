<template>
    <header class="flex justify-between items-center px-8 py-6 bg-white border-b border-gray-200">
        <div class="flex items-center gap-10">
            <slot name="left" />
        </div>
        <div class="flex items-center gap-4">
            <slot name="right" />
        </div>
    </header>
</template>
