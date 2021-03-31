const Edit = {
  props: ['id'],
  data: function () {
    return {
      title: '',
      text: ''
    }
  },
  mounted: function () {
    db.collection('notes').doc(this.id).get()
      .then(doc => {
        if (doc.exists) {
          this.title = doc.data().title
          this.text = doc.data().text
        } else {
          console.error('No note found')
        }
      })
  },
  methods: {
    updateNote: function () {
      db.collection('notes').doc(this.id).update({
        title: this.title,
        text: this.text,
        date: new Date()
      }).then(() => router.push({ path: '/note/' + this.id }))
    },
    deleteNote: function () {
      db.collection('notes').doc(this.id).delete()
        .then(() => router.push({ path: '/' }))
    }
  },
  template: `
  <section class="row">
    <div class="col-12 d-flex">
      <router-link :to="'/note/' + id" class="text-secondary text-decoration-none">&lt; Back</router-link>
    </div>
    <div class="col-12">
      <h1 class="display-4">Edit Note</h1>
    </div>
    <div class="col-12">
      <form @submit.prevent="updateNote">
        <input type="text" class="form-control my-3" placeholder="Title" v-model="title">
        <textarea class="form-control my-3" placeholder="New Note" v-model="text"></textarea>
        <button type="submit" class="btn btn-outline-primary me-3">Update Note</button>
        <button class="btn btn-outline-danger" @click.prevent="deleteNote">Delete</button>
      </form>
    </div>
  </section>
  `
}
