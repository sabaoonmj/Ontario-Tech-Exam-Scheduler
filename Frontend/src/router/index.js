import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ExamPage from '../pages/ExamPage.vue';
import SearchExams from '../components/SearchExams.vue';
import Contact from '../components/Contact.vue';
import ExamCalendar from '../components/ExamCalendar.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/search', name: 'SearchExams', component: SearchExams },
  { path: '/calendar', name: 'ExamCalendar', component: ExamCalendar },
  { path: '/exams', name: 'ExamPage', component: ExamPage },
  { path: '/contact', name: 'Contact', component: Contact }
];

export default createRouter({
  history: createWebHistory(),
  routes
});