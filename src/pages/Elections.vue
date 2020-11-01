<template>
  <q-page>
      <div>
        <q-carousel
      swipeable
      animated
      v-model="slide"
      ref="carousel"
      infinite
      style="height: 100vh"
    >
     
      <q-carousel-slide :name="1" img-src="https://cdn2.vectorstock.com/i/1000x1000/36/66/e-voting-concept-characters-voting-using-tablet-vector-22713666.jpg" />

      <!-- <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
          <q-btn
            push round dense color="orange" text-color="black" icon="arrow_left"
            @click="$refs.carousel.previous()"
          />
          <q-btn
            push round dense color="orange" text-color="black" icon="arrow_right"
            @click="$refs.carousel.next()"
          />
        </q-carousel-control>
      </template> -->
    </q-carousel>
    </div>
      <div class="q-pa-md">
          <div class="row">
              <div class="col-6">
                <q-input 
                  rounded 
                  outlined 
                  v-model="setSearch" 
                  label="Search"  
                  type="text"
                  class="q-mb-sm"
                  dense
                  hint="Search Elections"
                />
              </div>
          </div>
    <q-markup-table>
      <thead class="bg-indigo-8 text-white">
        <tr>
          <th class="text-left">S/N</th>
          <th class="text-left">Organization</th>
          <th class="text-center">No of Candidates</th>
          <th class="text-right">Election start Date</th>
          <th class="text-right">Election end Date</th>
        </tr>
      </thead>
      <tbody class="bg-grey-4" v-if="getElections && getElections.length > 0">
        <tr v-for="(election, i) in getElections" :key="i" @click="gotoElection(election)">
          <td class="text-left">{{ i+1 }}</td>
          <td class="text-left">{{ election.name }}</td>
          <td class="text-center">{{election.candidates.length}}</td>
          <td class="text-right">
            {{new Date(election.startTime).toLocaleDateString()}} <br />
            {{new Date(election.startTime).getHours()}}:
            {{`${new Date(election.startTime).getMinutes() > 9 ? new Date(election.startTime).getMinutes() : `0${new Date(election.startTime).getMinutes()}`}`}}
          </td>
          <td class="text-right">
            {{new Date(election.endTime).toLocaleDateString()}} <br />
            {{new Date(election.endTime).getHours()}}:
            {{`${new Date(election.endTime).getMinutes() > 9 ? new Date(election.endTime).getMinutes() : `0${new Date(election.endTime).getMinutes()}`}`}}
          </td>
    <q-dialog v-model="setDialog" full-width>
      <q-card>
          <!-- <q-btn @click="setDialog = false" label="close" /> -->
          <edit-election
          :election="editableElelction"
          ></edit-election>
        <q-card-actions align="center">
          <q-btn color="negative" label="close" @click="setDialog = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
        </tr>
      </tbody>
      <tbody class="bg-grey-4" v-else>
        <tr>
          <td class="text-left">No Election Found</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  </q-page>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import EditElection from 'components/EditElection'
export default {
  components: {
    EditElection,
  },
  data () {
    return {
      slide: 1,
      autoplay: false,
      // search: ''
    }
  },
  computed: {
    ...mapGetters('elections', ['getElections', 'editableElelction']),
    ...mapState('elections', ['editDialog', 'search']),
    setDialog: {
      get() {
        return this.editDialog
      },
      set(value){
        this.closeDialog(value)
      }
    },
    setSearch: {
      get(){
        return this.search
      },
      set(value){
        return this.changeSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('elections', ['gotoElection', 'closeDialog', 'changeSearch'])
  }
}
</script>