<template>
  <q-page padding v-if="election">
        <div>
            <div class="row" style="background-color: #f0f8fd">
              <div class="col-12">
                  <h4 class="text-center" style="color: #34495e;">{{election.name}}</h4>
                  <!-- <h6 class="text-center" style="color: #34495e;">Election Starts in: 2d: 12hrs: 40m: 33sec:</h6> -->
                  <Counter
                    v-if="!status"
                    :end="{
                      year: new Date(election.startTime).getFullYear(),
                      month: new Date(election.startTime).getMonth(),
                      date: new Date(election.startTime).getDate(),
                      hour: new Date(election.startTime).getHours(),
                      minute: new Date(election.startTime).getMinutes(),
                      second: new Date(election.startTime).getSeconds(),
                      millisecond: new Date(election.startTime).getMilliseconds(),
                    }"
                    :start="time"
                    @ended="status = true"
                  />
                  <!-- <p class="text-center">The Election Has not started Yet</p> -->
              </div>
          </div>
          <div class="row">
              <div class="col-4 q-pa-md"  v-for="(candidate,i) in election.candidates" :key="i">
                  <q-card>
                      <q-card-section 
                        class="row text-center" 
                        style="background:linear-gradient(to right, #2b5876, #4e4376)"
                      >
                      <div class="text-h6 col-12 text-center">
                          <div class="text-white q-pb-md">Candidate Card</div>
                          <q-avatar rounded size="100px">
                                  <img src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png">
                          </q-avatar>
                      </div>
                      </q-card-section>
                          <q-card-section>
                              <span class="text-body1" style="color: #34495e;">Name: {{candidate.label}}</span><br />
                              <span class="text-body1" style="color: #34495e;">Mandate: {{candidate.agenda}}</span> <br /> 
                              <span class="text-body1" style="color: #34495e;">
                                Votes: <q-avatar size="24px" v-for="(e,i) in `${candidate.votes}`" :key="i" style="background:linear-gradient(to right, #42275a, #734b6d)" text-color="white">{{e}}</q-avatar>
                              </span>
                      </q-card-section>
                  </q-card>
              </div>
          </div>
          <div v-if="isLoggedIn">
            <div class="row" v-if="!stat && new Date(Date.now()) > new Date(election.startTime) && new Date(Date.now()) < new Date(election.endTime)" style="background-color: #f0f8fd">
              <div class="col-12 text-center">
                <h5 style="color: #34495e;">Cast Your Votes</h5>
              </div>
              <div class="col-12">
                <q-option-group
                  v-model="vote"
                  :options="election.candidates"
                  left-label  
                />
              </div>
            <q-btn label="Vote" :disabled="!vote" @click="enterVote(vote, election.id)" color="primary" />
          </div>
            <div class="row" v-else>
              <div v-if="stat && new Date(Date.now()) < new Date(election.endTime)" class="col-12 text-center">
                <h5 style="color: #34495e;">Thank You for Voting</h5>
              </div>
              <div v-if="new Date(Date.now()) > new Date(election.endTime)" class="col-12 text-center">
                <span class="text-h5" style="color: #34495e;">This Election Has Ended</span> <br />
                
            </div>
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-12 text-center" v-if="new Date(Date.now()) < new Date(election.endTime) && new Date(Date.now()) > new Date(election.startTime)">
                <span class="text-h5" style="color: #34495e;">Please Login To Vote</span> <br />
                <q-btn label="Login" color="primary" class="text-white" to="/login" />
            </div>
            <div v-if="new Date(Date.now()) > new Date(election.endTime)" class="col-12 text-center">
                <span class="text-h5" style="color: #34495e;">This Election Has Ended</span> <br />
                <q-markup-table style="width: 350px" class="table">
                    <thead class="bg-indigo-8 text-white">
                       <tr>
                        <th colspan="5">
                            <div class="text-h6 q-ml-md text-white" v-if="winners.length === 1">Winner</div>
                            <div class="text-h6 q-ml-md text-white" v-if="winners.length > 1">Tie Winners</div>
                        </th>
                      </tr>
                      <tr>
                        <th class="text-left">S/N</th>
                        <th class="text-left">Candidate</th>
                        <th class="text-center">Votes</th>
                      </tr>
                    </thead>
                    <tbody class="bg-grey-4">
                      <tr v-for="(winner, i) in winners" :key="i">
                        <td class="text-left">{{i + 1}}</td>
                        <td class="text-left">{{winner.label}}</td>
                        <td class="text-center">{{winner.votes}}</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
            </div>
          </div>
        </div>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {channel} from 'boot/pusher'
import axios from 'axios'
import Counter from 'components/Counter'
export default {
  components: {
    Counter,
  },
data() {
    return {
      vote: false,
      time: new Date(),
      status: false,
      stat: true
    }
  },
  computed: {
    ...mapGetters('elections', ['election', 'getAllElections']),
    ...mapGetters('auth', ['isLoggedIn']),
    winners() {
      let x = 0
      let winners = []
      if(this.election){
        this.election.candidates.forEach((e, i) => {
          if(e.votes > x){
            x = e.votes
          }
        })
        winners = this.election.candidates.filter(e => e.votes === x)
      }
      return winners
    }
  },
  mounted() {
    // if(this.election === null){
      this.onLoadElection(this.$route.params.id)
      // this.$router.push('/*')
    // }
    if(this.election){
      this.subscribe(this.election.id)
    }
    if(this.isLoggedIn){
      this.checkVoter(this.election.id)
      }
  },
  created() {
    this.timer()
  },
  methods: {
    ...mapActions('elections', ['onLoadElection', 'userVote']),
    timer() {
      setInterval(() => {
        this.time = new Date()
      }, 1000)
    },
    async enterVote(value, electionId){
      const candidate = this.election.candidates.find(e => e.value === value)
      try {
      const res = await axios({
        method: 'POST',
        url: 'api/v1/voters',
        withCredentials: true,
        data: {
          election: electionId,
          candidate: candidate.id
        }
      })
      }catch(e){
        this.$q.notify({
          message: 'Something went wrong',
          icon: 'warning',
          color: 'negative',
          textColor: 'white',
      })
      }
    },
    subscribe(id){
      channel.bind('my-event', (data) => {
      this.userVote({elections: data.message, electionId: id})
      this.checkVoter(this.election.id)
      });
    },
    async checkVoter(id){
      try {
      const res = await axios({
        method: 'GET',
        url: 'api/v1/voters/' + id,
        withCredentials: true,
      })
      this.stat = res.data.data.stat
      }catch(e){
        if(e.response.data.message){
          this.$q.notify({
            message: e.response.data.message,
            icon: 'warning',
            color: 'negative',
            textColor: 'white',
        })
        }else {
          this.$q.notify({
            message: 'Something went wrong',
            icon: 'warning',
            color: 'negative',
            textColor: 'white',
          })
        }
      }
    }
  }
}
</script>

<style>
.table{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>