const routes = [
  { path: '/', component: Notes },
  { path: '/note/:id', component: Note, props: true },
  { path: '/new', component: New },
  { path: '/edit/:id', component: Edit, props: true }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: routes
})
