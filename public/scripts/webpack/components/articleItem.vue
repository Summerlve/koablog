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
                        <!-- <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                Operations
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                <li><a href="#">Change</a></li>
                                <li><a href="#">Delete</a></li>
                            </ul>
                        </div> -->
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
