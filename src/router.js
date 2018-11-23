import Vue from "vue";
import Router from "vue-router";

import Login from './pages/Login.vue';
import Logout from './components/Logout.vue';
import TodolistIndex from './pages/TodolistIndex.vue';
import TodoIndex from './pages/TodoIndex.vue';
import TodolistEdit from './pages/TodolistEdit.vue';
import TodolistEmail from './pages/TodolistEmail.vue';
import TodolistImage from './pages/TodolistImage.vue';
import TodoEdit from './pages/TodoEdit.vue';

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ name: 'dashboard', path: '/', component: TodolistIndex },
		{ name: 'login', path: '/login', component: Login },
		{ name: 'logout', path: '/logout', component: Logout },
		{ name: 'todolist_new', path: '/todolist/new',
			component: TodolistEdit },
		{ name: 'todos', path: '/todolist/:id', component: TodoIndex },
		{ name: 'todolist_edit', path: '/todolist/edit/:id',
			component: TodolistEdit },
		{ name: 'todolist_email', path: '/todolist/email/:id',
			component: TodolistEmail },
		{ name: 'todolist_image', path: '/todolist/image/:id',
			component: TodolistImage },
		{ name: 'todo_new', path: '/todo/new/:todo_list_id', component: TodoEdit },
		{ name: 'todo_edit', path: '/todo/edit/:id', component: TodoEdit },
	]
});
