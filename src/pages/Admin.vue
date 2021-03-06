<template>
  <q-page padding>
      <div class="row">
          <div class="col-12 text-center" style="color: #34495e;">
              <h4>Admin User</h4>
          </div>
          <q-separator />
      </div>
      <div class="row">
          <div class="col-12 text-center" style="color: #34495e;">
              <h6>Create Election</h6>
          </div>
          <div class="col-12">
            <q-stepper
                v-model="step"
                ref="stepper"
                color="primary"
                animated
                >
                <q-step
                    :name="1"
                    title="Select campaign settings"
                    icon="settings"
                    :done="step > 1"
                    style="min-height: 200px;"
                >
                    <div class="row">
                        <q-input 
                        rounded 
                        outlined 
                        v-model="electionName" 
                        label="Election Name"  
                        type="text"
                        class="q-mb-sm col-6"
                        lazy-rules
                        dense
                        hint="Enter the name of the Election"
                        />
                    </div>
                </q-step>

                <q-step
                    :name="2"
                    title="Create an ad group"
                    caption="Optional"
                    icon="create_new_folder"
                    :done="step > 2"
                    style="min-height: 200px;"
                >
                    <div class="row">
                        <!-- start time -->
                        <q-input filled v-model="startTime" 
                        class="col-6 q-pa-sm" hint="when will the election start">
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="startTime" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="startTime" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                        </q-input>
                        <!-- end time -->
                        <q-input filled v-model="endTime" 
                        :rules="[val => val > startTime || 'end Time must be greater than start time']"
                        class="col-6 q-pa-sm" hint="when will the election end">
                        <template v-slot:prepend>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="endTime" mask="YYYY-MM-DD HH:mm">
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>

                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="endTime" mask="YYYY-MM-DD HH:mm" format24h>
                                <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                                </q-time>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                        </q-input>
                    </div>
                </q-step>
                <q-step
                    :name="3"
                    title="Create an ad"
                    icon="add_comment"
                    style="min-height: 200px;"
                >
                    <div class="row">
                        <div class="col-6">
                            <q-card>
                                <q-card-section class="row text-center bg-primary">
                                    <div class="text-h6 col-12 text-center text-white">Add Candidate</div>
                                </q-card-section>
                                <q-card-section>
                                    <q-form @submit="addCandidate">
                                        <q-input 
                                        rounded 
                                        outlined 
                                        v-model="candidateLabel" 
                                        label="Candidate Name"  
                                        type="text"
                                        class="q-mb-sm"
                                        lazy-rules
                                        :rules="[val => !!val || 'Field is required']"
                                        dense
                                        />
                                        <q-input 
                                        rounded 
                                        outlined 
                                        v-model="candidateMandate" 
                                        label="Candidate Mandate"  
                                        type="text"
                                        :rules="[val => !!val || 'Field is required']"
                                        class="q-mb-sm"
                                        lazy-rules
                                        dense
                                        />
                                    <q-card-actions align="center" class="bg-primary">
                                        <q-btn label="Add" type="submit" color="white" class="text-black" />
                                    </q-card-actions>
                                    </q-form>
                                </q-card-section>
                            </q-card>
                        </div>
                        <div class="col-6">
                            <div class="row">
                                <div class="col-12 text-center">
                                    <h6>Candidates</h6>
                                    <ol v-if="candidates.length > 0">
                                        <li v-for="(candidate, i) in candidates" :key="i">{{candidate.label}}</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-step>

                <template v-slot:navigation>
                    <q-stepper-navigation>
                    <q-btn @click="submit(step)" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" />
                    <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
                    </q-stepper-navigation>
                </template>

                <template v-slot:message>
                    <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
                    This is the Election Name
                    </q-banner>
                    <q-banner v-else-if="step === 2" class="bg-orange-8 text-white q-px-lg">
                    This is the start and end dates for the election <br />
                    NB: End Date has to be greater than start date
                    </q-banner>
                    <q-banner v-else class="bg-blue-8 text-white q-px-lg">
                    The final step is creating the ad...
                    </q-banner>
                </template>
            </q-stepper>
          </div>
      </div>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      step: 1,
      electionName: '',
      startTime: new Date(Date.now()).toLocaleString(),
      endTime: new Date(Date.now() + (3600 * 1000 * 24)).toLocaleString(),
      candidates: [],
      candidateLabel: '',
      candidateMandate: '',
      buttonStep: false
    }
  },
  methods: {
      ...mapActions('elections', [ 'createElection']),
      addCandidate(){
          this.candidates.push({
              label: this.candidateLabel,
              agenda: this.candidateMandate
          })
          this.candidateLabel = ' '
          this.candidateMandate = ' '
      },
      submit(value){
          let message = 'Field cannot be empty'
          if(value === 3){
            message = 'Candidates must be more than one or cannot be empty'
          }
          if(value <= 1 && this.electionName){
              this.$refs.stepper.next()
            //   ; $refs.stepper.next()
          }
          else if(value === 2){
              this.$refs.stepper.next()
          }else if(value === 3 && this.candidates.length > 1){
              const data = {
                  electionName: this.electionName,
                  startTime: this.startTime,
                  endTime: this.endTime,
                  candidates: this.candidates
              }
              this.createElection(data)
          }else {
              this.$q.notify({
                    message,
                    icon: 'warning',
                    color: 'negative',
                    textColor: 'white',
                })
          }
      }
  }
}
</script>


<style>

</style>