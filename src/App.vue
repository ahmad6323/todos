<script setup>
import 'bulma/css/bulma.min.css'
import {ref, onMounted, markRaw} from 'vue'
import {db} from './firebase'
import {collection, onSnapshot,doc, addDoc , deleteDoc, updateDoc} from 'firebase/firestore'

const todoCollectionRef = collection(db,'todos')
const todo = ref([
  // {
  //   id:1,
  //   content:'todo app',
  //   done:false
  // },
  // {
  //   id:2,
  //   content:'todo app',
  //   done:true
  // }
])
const newContent  = ref('')
const addTodo = ()=>{
  addDoc(collection(db,'todos'),{
    content:newContent.value,
      done:false
  })
  newContent.value=''
}
const deleteTodo = id=>{
  deleteDoc(doc(todoCollectionRef,id))
}
const toggle = id=> {
  const index = todo.value.findIndex(t => t.id === id)

   updateDoc(doc(todoCollectionRef,id),{
    done: ! todo.value[index].done
  })

}
onMounted(async ()=>{
  onSnapshot(collection(db,'todos'),(querySnapshot) =>{
    const fbtodos = []
    querySnapshot.forEach((doc)=>{
      console.log(doc.id,"=>", doc.data())
      const todo = {
        id:doc.id,
        content: doc.data().content,
        done: doc.data().done

      }
      fbtodos.push(todo)
  })
    todo.value = fbtodos
  })

})
</script>


<template>
  <div class="todo">
    <div class="title has-text-centered">TODO</div>
    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newContent" class="input" placeholder="Find a repository" type="text">
        </p>
        <p class="control">
          <button :disabled="!newContent" type="submit" class="button is-info">
            ADD
          </button>
        </p>
      </div>
    </form>

    <div v-for="t in todo" class="card mb-5"
    :class="{'has-background-success-light' : t.done}"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column"
            :class="{'has-text-success':t.done}"
            >{{t.content}}</div>
          <div
              @click="toggle(t.id)"
              class="column is-5 has-text-right">
            <button
                :class="t.done ? 'is-success': 'is-light'"
                class="button ">&check;</button>
            <button @click="deleteTodo(t.id)" class="button is-danger ml-1">&cross;</button>
          </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo {
  max-width: 400px;
  padding: 40px;
  margin: 0 auto;
}

</style>

<!--<template>-->
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->
<!--    </div>-->
<!--  </header>-->

<!--  <main>-->
<!--    <TheWelcome />-->
<!--  </main>-->
<!--</template>-->

<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--}-->
<!--</style>-->
