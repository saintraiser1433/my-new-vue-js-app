<template>
    <div class="row">
        <div class="col-lg-4">
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <form @submit.prevent="submitData">
                            <div class="mb-3">
                                <label for="fname" class="form-label">Full Name</label>
                                <input type="text" class="form-control" id="fname" v-model="name">
                            </div>
                            <div class="mb-3">
                                <label for="fname" class="form-label">Language</label>
                                <select class="form-select" aria-label="language" v-model="language">
                                    <option selected>Open this select menu</option>
                                    <option value="Tagalog">Tagalog</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Taiwanese">Taiwanese</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="bio" class="form-label">Bio</label>
                                <textarea class="form-control" id="bio" rows="3" v-model="bio"></textarea>
                            </div>
                            <div class="mb-3">
                                <button class="btn btn-success">Submit</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="container">
                <div class="card">
                    <div class="card-body">
                        <Suspense>
                            <template #default>
                                <div v-if="error">
                                    {{ error }}
                                </div>
                                <div v-else>
                                    <EmployeeTable :data="data" @onUpdate="getEmployeeById" @onDelete="deleteData" @onView="viewData" />
                                </div>
                            </template>
                            <template #fallback>
                                <h1>...Loading</h1>
                            </template>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent, reactive, toRefs, ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import DataService from '@/services/dataservice';
const EmployeeTable = defineAsyncComponent({
    loader: () => import('../components/DataTable.vue')
});



export default {
    name: 'EmployeesView',
    components: {
        EmployeeTable
    },
    setup() {
        const data = ref([]);
        const error = ref(null);
        const isUpdate = ref(false);
        const state = reactive({
            id: uuidv4(),
            name: '',
            language: '',
            bio: ''
        })
        async function getData() {
            await DataService.fetchData().then((response) => {
                data.value = response.data
            }).catch((e) => {
                
                error.value = e
            })
        }

        function submitData() {
            if (!isUpdate.value) {
                addData(state)
            } else {
                updateData(state)
            }
        }

        async function addData(val) {
            await DataService.addData(val).then(() => {
                alert("Successfully added")
                data.value.push({ ...val })
                state.name = ''
                state.language = ''
                state.bio = ''
                isUpdate.value = false
          
            }).catch((e) => {
                error.value = e
            })
        }

        function getEmployeeById(val) {
            state.id = val.id
            state.name = val.name
            state.language = val.language
            state.bio = val.bio
            isUpdate.value = true
        }



        async function updateData(formData) {
            await DataService.updateData(formData.id, formData).then(() => {
                alert("Successfully updated")
                let index = data.value.findIndex(item => item.id === formData.id);
                data.value[index] = { ...formData };
                state.name = '';
                state.language = '';
                state.bio = '';
                isUpdate.value = false
                // data.value.push({ ...model })
            }).catch((e) => {
                error.value = e
            })
        }

        async function deleteData(id) {
            await DataService.deleteData(id).then(() => {
                alert("Successfully deleted")
                data.value = data.value.filter(res => res.id !== id)
            }).catch((e) => {
                error.value = e
            })
        }

        onMounted(() => {
            getData()
        })

        return {
            data,
            error,
            submitData,
            getEmployeeById,
            deleteData,
            ...toRefs(state)

        }
    }
}
</script>

<style scoped></style>