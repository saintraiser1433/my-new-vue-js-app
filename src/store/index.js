import { createStore } from "vuex";
// import { post } from "./post.module";
const store = createStore({
    state: {
        title: 'Vuex Store',
        notes: []
    },
    getters: {
        // posts: state => state.dataPost
        totalNotes(state) {
            return state.notes.length;
        }
    },
    mutations: {
        SAVE_NOTE(state, title) {
            state.notes.push(title);
        }
    },
    actions: {
        saveNote({ commit }, title) {
            commit('SAVE_NOTE', title)
        }
    },
    modules: {
        // post
    }
});

export default store;