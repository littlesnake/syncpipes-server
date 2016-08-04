import { kernel } from './bootstrap';
kernel.boot().then(() => {
    kernel.worker();
});
