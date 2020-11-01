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
     
      <q-carousel-slide :name="1" img-src="https://platform.keesingtechnologies.com/wp-content/uploads/2020/02/shutterstock_1510448354.jpg" />

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
      <div class="row text-center" style="background-color: #f0f8fd">
          <div class="col-12">
              <h4 class="text-center text-h4" style="color: #34495e;">Make your decision-making process modern, secure, and effective.</h4>
                <p class="text-center text-body1">Our online voting systems let
                     you upgrade from manually counting ballots without 
              sacrificing the integrity of your vote</p>
          </div>
      </div>
      <div class="row q-pb-lg">
          <div class="col-12 text-center">
              <h4 class="text-center" style="color: #34495e;">An online voting system with <br /> your needs at the forefront.</h4>
              <span class="text-body1">From&nbsp;secure polling software to the management of complex voting events 
              - we offer a range of eVoting <br /> solutions&nbsp;that&nbsp;exceed expectation.</span>
          </div>
      </div>
      <div class="row q-pt-lg" padding>
          <div class="col-6 q-pa-lg">
            <q-avatar rounded>
                <img src="~assets/home1.svg">
            </q-avatar>
            <span class="text-h6" style="color: #34495e;">Flexible implementation options</span>
            <p class="text-body1">Choose how involved you want to be. Self-administer your vote or let us manage the voting experience.</p>
          </div>
          <div class="col-6 q-pa-lg">
                <q-avatar rounded>
                    <img src="~assets/home2.svg">
                </q-avatar>
              <span class="text-h6" style="color: #34495e;">Key electronic voting features</span>  <br />
              <p class="text-body1">Never again worry about people voting twice or other forms of vote manipulation. Get 
              instantly.&nbsp;Dive deeper into vote statistics.</p>
          </div>
          <div class="col-6 q-pa-lg">
                <q-avatar rounded>
                    <img src="~assets/home3.svg">
                </q-avatar>
              <span class="text-h6" style="color: #34495e;">A pleasant way to cast votes</span> <br />
              <p class="text-body1">Your voters deserve a fair and easy to use voting website, accessible from any device.</p>
          </div>
          <div class="col-6 q-pa-lg">
                <q-avatar rounded>
                    <img src="~assets/home4.svg">
                </q-avatar>
              <span class="text-h6" style="color: #34495e;">Integrations & customizations</span> <br />
              <p class="text-body1">Each vote is unique. Customization options include 
              technical integrations, vote consulting, voter notifications services, and more.</p>
          </div>
      </div>
      <div class="row q-mx-none" style="background-color: #f0f8fd">
          <div class="col-12 q-pa-lg">
              <h2 class="text-center" style="color: #34495e;">Robust security measures you can rely on.</h2>
          </div>
          <div class="col-6 q-pa-lg">
              <span class="text-body1" style="color: #34495e;">Our online election software security measures protect you, 
              your data,&nbsp;and your organization against&nbsp;risk.</span>
            <ul style="font-size: 12px;">
                <li class="fs-20">
                    <strong class="text-h6" style="color: #34495e;">Safeguard organizational data.</strong>&nbsp;
                    <span class="text-body2">
                    Our cybersecurity measures protect your sensitive data.</span>
                </li>
            </ul>
            <ul style="font-size: 12px;">
                <li class="fs-20">
                    <strong class="text-h6" style="color: #34495e;">Eliminate the risk of double voting and voter fraud.&nbsp;</strong>
                    <span class="text-body2">
                    Closed voting events enable trustworthy decision making.</span>
                </li>
            </ul>
            <ul style="font-size: 12px;">
                <li class="fs-20">
                    <strong class="text-h6" style="color: #34495e;">Prove the integrity of your vote.&nbsp;</strong>
                    <span class="text-body2">
                    Our robust auditing&nbsp;tools&nbsp;let you&nbsp;demonstrate an accountable voting process.
                    </span>
                </li>
            </ul>
          </div>
          <div class="col-6 q-pa-lg">
              <q-img src="https://www.eballot.com/hs-fs/hubfs/EBA-03-Home-Online-Election-Software-Security.jpg?width=2600&height=1440&name=EBA-03-Home-Online-Election-Software-Security.jpg" />
          </div>
      </div>
      <div class="row" style="background-color: #34495e">
          <div class="col-12 text-center">
              <h2 class="text-center text-white">View All Features &amp; Capabilities</h2>
              <q-btn label="Learn More" class="bg-positive q-mb-lg" />
          </div>
      </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      slide: 1
    }
  }
}
</script>

<style>
    h4 {
        color: #07111b
    }
</style>