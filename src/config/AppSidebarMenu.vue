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
        },
        // {
        //     url: '/home2',
        //     icon: 'fa fa-home',
        //     text: i18n.t('GENERAL.Home2')
        // },
        {
            url: '/standard',
            icon: 'fa fa-home',
            text: i18n.t('GENERAL.Standard')
        },
        {
            url: '/student',
            icon: 'fa fa-user',
            text: i18n.t('GENERAL.Student')
        },
        {
            url: '/case',
            icon: 'fa fa-user',
            text: i18n.t('GENERAL.Case')
        },
        {
            url: '/email/',        // menu with submenu
            icon: 'fa fa-envelope',
            text: 'Email',
            children: [
                { url: '/email/inbox', text: 'Inbox' },
                { url: '/email/compose', text: 'Compose' },
                { url: '/email/detail', text: 'Detail' }
            ]
        },
    ];

    export default appSidebarMenu;
</script>
