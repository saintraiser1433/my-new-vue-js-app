<template>
    <div class="container">

        {{ $store.state.title }}
        <ul>
            <li v-for="note in notes" :key="note"> {{ note }}</li>
        </ul>
        <input type="text" v-model="title" @keypress.enter="save"/>
    </div>
    <div>
        Total Notes {{ times2 }}
    </div>



    <!---popup-->
</template>

<script>
import {useStore} from 'vuex'
import { ref } from "vue";
import { useGetters,useState,useAction } from '../store/helpers'
// import { mapGetters, reactive, toRefs } from 'vuex';

export default {
    name: 'LanguageView',
    setup(){
        const title = ref('')
        const store = useStore()
        function save(){
            // notes.value.push(title.value)
            // title.value = ''
            // store.dispatch("saveNote")
            useAction(['saveNote'],title.value)
            title.value='';
        }
        const { times2 } = useGetters(['totalNotes'])
        const { notes } = useState(['notes'])
        // const notes = computed(() => store.state.notes)
        // const totalNotes = computed(() => store.getters.totalNotes)
        return {
            notes,
            title,
            save,
            times2
            // totalNotes
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