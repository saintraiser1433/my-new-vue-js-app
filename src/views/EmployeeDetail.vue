<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
                <div v-if="!loading">
                    <h1>Id:{{ employeeDetail.id }}</h1>
                    <h1>Name:{{ employeeDetail.name }}</h1>
                    <h1>Language:{{ employeeDetail.language }}</h1>
                    <h1>Bio:{{ employeeDetail.bio }}</h1>
                </div>
                <div v-else>
                    <h1>Loading...</h1>
                </div>


            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue'
import DataService from '@/services/dataservice';
const props = defineProps({
    id: Number
})
const employeeDetail = ref([])
const error = ref(null)
const loading = ref(true)
async function getData() {
    await DataService.getDataById(props.id).then((resp) => {
        employeeDetail.value = resp.data
    }).catch((e) => {
        error.value = e
    }).finally(() => {
        loading.value = false; // Set loading to false regardless of success or failure
    });
}
onMounted(() => {
    getData()
})

</script>

<style scoped></style>