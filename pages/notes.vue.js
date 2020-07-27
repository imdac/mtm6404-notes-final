const Notes = {
  data: function () {
    return {
      notes: []
    }
  },
  mounted: function () {
    db.collection('notes')
      .orderBy('date', 'desc')
      .onSnapshot(snapshot => {
        const notesData = []
        snapshot.forEach(doc => notesData.push({
          date: doc.data().date,
          title: doc.data().title,
          text: doc.data().text,
          id: doc.id
        }))

        this.notes = notesData
      })
  },
  template: `
  <section class="row">
    <div class="col-12 d-flex justify-content-end">
      <router-link class="btn btn-outline-secondary" to="/new">+</router-link>
    </div>
    <div class="col-12">
      <h1 class="display-4">Notes</h1>
    </div>
    <div class="col-12">
      <ul class="list-group">
        <li class="list-group-item" v-for="note in notes">
          <router-link class="text-secondary text-decoration-none"  :to="'/note/' + note.id">{{ note.title }}</router-link>
        </li>
      </ul>
    </div>
  </section>
  `
}
