<script>
import Home from '../pages/Home.vue'
import Standard from '../pages/standard/Standard.vue'
import Student from '../pages/student/Student.vue'

const routes = [
  { path: '*', redirect: '/standard' },
  { path: '/home', component: Home, name:'Home' },
    {path:'/standard', component: Standard, name:'Standard'},
    {path:'/home2', component: Home, name:'Home2'},
    {path:'/student', component: Student, name:'Student'}
]

export default routes;
</script>
