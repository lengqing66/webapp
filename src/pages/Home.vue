<template>
    <div id="content" class="app-content">
        <!--content-->
        <ASelect></ASelect>
        <hiddenChange></hiddenChange>
    </div>

</template>

<script>
    import hiddenChange from '../layouts/components/hiddenChange';
    import ASelect from '../layouts/components/ASelect';

    export default {
        components: {
            hiddenChange,
            ASelect,
        }
    }
</script>

