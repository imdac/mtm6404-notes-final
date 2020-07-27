const New = {
  data: function () {
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    addNote: function () {
      db.collection('notes').add({
        title: this.title,
        text: this.text,
        date: new Date()
      }).then(doc => router.push({ path: '/note/' + doc.id }))
    }
  },
  template: `
  <section class="row">
    <div class="col-12">
      <h1 class="display-4">New Note</h1>
    </div>
    <div class="col-12">
      <form @submit.prevent="addNote">
        <input type="text" class="form-control my-3" placeholder="Title" v-model="title">
        <textarea class="form-control my-3" placeholder="New Note" v-model="text"></textarea>
        <button class="btn btn-primary mr-3">Add Note</button>
        <router-link to="/">Cancel</router-link>
      </form> 
    </div>
  </section>
  `
}
