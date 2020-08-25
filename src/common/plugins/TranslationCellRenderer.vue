<template>
    <div>
        <div class="customHeaderLabel">{{$t(params.displayName)}}</div>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        name: 'TranslationCellRenderer'
    })
</script>
