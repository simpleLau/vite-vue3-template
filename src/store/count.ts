import { defineStore } from "pinia"
import { ref } from 'vue'

export  const useCounterStore = defineStore('counter', () => {
    const count = ref<number>(0)
    function increment() {
        console.log('count.value: ', count.value);
        count.value++
    }
    return { count, increment }
})