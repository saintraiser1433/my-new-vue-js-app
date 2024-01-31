<template>
    <div class="container">

        {{ $store.state.title }}
        <ul>
            <li v-for="note in notes" :key="note"> {{ note }}</li>
        </ul>
        <input type="text" v-model="title" @keypress.enter="save" />
    </div>
    <div>
        Total Notes {{ totalNotes }}
    </div>



    <!---popup-->
</template>

<script>
import { ref } from "vue";
import { useActions, useGetters, useState } from "vuex-composition-helpers";

export default {
    name: 'LanguageView',
    setup() {
        const title = ref('')
        const { notes } = useState(['notes']);
        const { totalNotes } = useGetters(['totalNotes']);
        const { saveNote } = useActions(['saveNote']);
        // const store = useStore()
        function save() {
            saveNote(title.value)
            title.value='';
        }

        return {
            notes,
            title,
            save,
            totalNotes
        }
    }

}
</script>

<style scoped>
.modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

h1 {
    color: red;
}

.modal.sale {
    background-color: crimson;
    color: white;
}

.modal.sale h1 {
    color: white
}

.modal.dark {
    background-color: darkolivegreen;
    color: white;
}

.modal.dark h1 {
    color: white
}
</style>