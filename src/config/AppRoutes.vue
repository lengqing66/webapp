<script>
import Home from '../pages/Home.vue'
import Standard from '../pages/standard/Standard.vue'
import Student from '../pages/student/Student.vue'
import i18n from '../common/plugins/vue-i18n'

const routes = [
  { path: '*', redirect: '/standard' },
  { path: '/home', component: Home, name:i18n.t("GENERAL.Home") },
    {path:'/standard', component: Standard, name:i18n.t("GENERAL.Standard")},
    {path:'/home2', component: Home, name:i18n.t("GENERAL.Home2")},
    {path:'/student', component: Student, name:i18n.t("GENERAL.Student")}
]

export default routes;
</script>
