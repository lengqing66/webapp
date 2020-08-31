<script>
import Home from '../pages/Home.vue'
import Standard from '../pages/standard/Standard.vue'
import Student from '../pages/student/Student.vue'
import Case from '../pages/case/Case.vue'
import Login from '../pages/Login.vue'
import Inbox from '../pages/email/Inbox.vue'
import Compose from '../pages/email/Compose.vue'
import Detail from '../pages/email/Detail.vue'


import i18n from '../common/plugins/vue-i18n'

const routes = [
    {path: '*', redirect: '/home'},
    {path: '/home', component: Home, name: i18n.t('GENERAL.Home')},
    {path: '/standard', component: Standard, name: i18n.t('GENERAL.Standard')},
    {path: '/home2', component: Home, name: i18n.t('GENERAL.Home2')},
    {path: '/student', component: Student, name: i18n.t('GENERAL.Student')},
    {path: '/case', component: Case, name: i18n.t('GENERAL.Case')},
    {path: '/login', component: Login, name: i18n.t('GENERAL.Login')},
    {path: '/email/inbox', component: Inbox, name: Inbox},
    {path: '/email/compose', component: Compose, name: Compose},
    {path: '/email/detail', component: Detail, name: Detail},
]

export default routes;
</script>
