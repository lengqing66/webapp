<script>
import Home from '../pages/Home.vue'
import Standard from '../pages/standard/Standard.vue'
import Student from '../pages/student/Student.vue'
import Case from '../pages/case/Case.vue'
import Login from '../pages/Login.vue'

const routes = [
  { path: '*', redirect: '/home' },
  { path: '/home', component: Home, name:'Home' },
    {path:'/standard', component: Standard, name:'Standard'},
    {path:'/home2', component: Home, name:'Home2'},
    {path:'/student', component: Student, name:'Student'},
    {path:'/case', component: Case, name:'Case'},
    {path:'/login', component: Login, name:'Login'}
]

export default routes;
</script>
