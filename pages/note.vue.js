const Note = {
  props: ['id'],
  data: function () {
    return {
      note: {
        date: '',
        title: '',
        text: '',
        id: ''
      }
    }
  },
  mounted: function () {
    db.collection('notes').doc(this.id).get()
      .then(doc => {
        if (doc.exists) {
          this.note.date = doc.data().date
          this.note.title = doc.data().title
          this.note.text = doc.data().text
        } else {
          console.error('No note found')
        }
      })
  },
  methods: {
    dateString: function (timestamp) {
      if (timestamp) {
        const date = new Date(timestamp.seconds * 1000)
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
      }
      return ''
    }
  },
  template: `
  <section class="row">
    <div class="col-6">
      <router-link class="text-secondary text-decoration-none" to="/">&lt; Back</router-link>
    </div>
    <div class="col-6 d-flex justify-content-end">
      <router-link class="btn btn-outline-secondary" :to="'/edit/' + id">Edit</router-link>
    </div>
    <div class="col-12">
      <p class="text-secondary text-center">{{ dateString(note.date) }}</p>
      <h1 class="display-4">{{ note.title }}</h1>
      <div>{{ note.text }}</div>
    </div>
  </section>
  `
}
