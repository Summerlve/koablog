<template>
    <tr>
        <td>
            <div class="media">
                <div class="media-body">
                    <h3 class="media-heading">
                        <span v-text="article.title" class="h4"></span>
                        <span class="small">By</span>
                        <span v-text="article.author" class="h4"></span>
                        <span class="small">at</span>
                        <span v-text="article.createAt | timeFormat" class=""></span>
                    </h3>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
    module.exports = {
        
        methods: {
            onClick: function (e) {

            }
        }
    };
</script>
