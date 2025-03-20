import { defineAsyncComponent } from 'vue';

export default (type: number) => {
    switch (type) {
      case 0:
        return defineAsyncComponent(() => import('@/components/icons/IconGreen.vue'));
      case 1:
        return defineAsyncComponent(() => import('@/components/icons/IconPurple.vue'));
      case 2:
        return defineAsyncComponent(() => import('@/components/icons/IconGallery.vue'));
      default:
        return null;
    }
  };