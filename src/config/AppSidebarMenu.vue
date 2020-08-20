<script>
    import i18n from '../common/plugins/vue-i18n'
    const appSidebarMenu = [{
        text: i18n.t('GENERAL.Navigation'),
        is_header: true
    },
        {
            url: '/home',
            icon: 'fa fa-home',
            text: i18n.t('GENERAL.Home')
        },{
            url: '/home2',
            icon: 'fa fa-home',
            text: i18n.t('GENERAL.Home2')
        },
        {
            url: '/standard',
            icon: 'fa fa-home',
            text: i18n.t('GENERAL.Standard')
        },
        {
            url: '/student',
            icon: 'fa fa-user',
            text: i18n.t('STUDENT.Student')
        }
    ];

    export default appSidebarMenu;
</script>
