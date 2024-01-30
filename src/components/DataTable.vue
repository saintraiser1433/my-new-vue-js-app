<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Language</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in data" :key="row.id">
                <th scope="row">{{ row.id }}</th>
                <td>{{ row.name }}</td>
                <td>{{ row.language }}</td>
                <td>
                    <router-link :to="{ name: 'employeeDetail', params: { id: row.id } }">
                        <a href="#" class="badge bg-info text-white">View</a>
                    </router-link>
                    |
                    <a href="#" class="badge bg-warning text-white" @click="emitUpdate(row)">Edit</a> |
                    <a href="#" class="badge bg-danger" @click="emitDelete(row.id)">Delete</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
    data: Object
})
const emit = defineEmits({
    onUpdate: Object,
    onDelete: Number,
})



function emitUpdate(row) {
    emit('onUpdate', row);
}

function emitDelete(id) {
    emit('onDelete', id);
}

</script>

<style scoped></style>