<script>
import Home from '../pages/Home.vue'
import Standard from '../pages/standard/Standard.vue'

const routes = [
  { path: '*', redirect: '/standard' },
  { path: '/home', component: Home, name:'Home' },
    {path:'/standard', component: Standard, name:'Standard'},
    {path:'/home2', component: Home, name:'Home2'}
]

export default routes;
</script>
