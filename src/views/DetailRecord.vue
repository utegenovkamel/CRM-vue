<template>
    <div>
        <Loader v-if="loading" />
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">{{
                    "Menu_History" | localize
                }}</router-link>
                <a @click.prevent class="breadcrumb">
                    {{ record.type === "income" ? "Доход" : "Расход" }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                        class="card"
                        :class="{
                            red: record.type === 'outcome',
                            green: record.type === 'income',
                        }"
                    >
                        <div class="card-content white-text">
                            <div class="card-item">
                                <h6>{{ "Description" | localize }}:</h6>
                                <p>
                                    {{ record.description }}
                                </p>
                            </div>

                            <div class="card-item">
                                <h6>{{ "Amount" | localize }}:</h6>
                                <p>
                                    {{ record.amount | currency }}
                                </p>
                            </div>

                            <div class="card-item">
                                <h6>{{ "Category" | localize }}:</h6>
                                <p>
                                    {{ record.categoryName }}
                                </p>
                            </div>

                            <small>
                                {{ record.date | date("datetime") }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p v-else class="center">
            {{ "RecordingWith" | localize }}id=<strong>{{
                $route.params.id
            }}</strong>
            {{ "NotFound" | localize }}
        </p>
    </div>
</template>

<script>
export default {
    name: "detailRecord",
    metaInfo: {
        title: "Detail Record",
    },
    data: () => ({
        loading: true,
        record: null,
    }),
    async mounted() {
        const id = this.$route.params.id;
        const record = await this.$store.dispatch("fetchRecordById", id);
        const category = await this.$store.dispatch(
            "fetchCategoryById",
            record.categoryId
        );

        this.record = {
            ...record,
            categoryName: category.title,
        };

        this.loading = false;
    },
};
</script>
