import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ExamPage from '../pages/ExamPage.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/exams', component: ExamPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
