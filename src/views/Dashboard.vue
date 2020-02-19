<template>
  <div>
    <CCard>
      <CCardBody>
          <template v-if="getFetchingDashboardState.initial">
              <b-row class="justify-content-center">
                  <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
              </b-row>
          </template>
          <template v-if="!getFetchingDashboardState.initial">
              <CRow class="mb-2">
                  <CCol sm="5">
                      <h4 id="traffic" class="card-title mb-0">Dashboard</h4>
                      <div class="small text-muted">Updated as of {{ $moment(new Date).format(("LL")) }}</div>
                  </CCol>
              </CRow>
              <CRow class="mb-2" >
                  <CCol sm="12" lg="12">
                      <CRow>
                          <CCol sm="5">
                              <CCallout color="info">
                                  <small class="text-muted">Graduates</small><br>
                                  <strong class="h4">{{ getDashboardData.total }}</strong>
                              </CCallout>
                          </CCol>
                          <CCol sm="4">
                              <CCallout color="success">
                                  <small class="text-muted">Employed Graduates</small><br>
                                  <strong class="h4">{{ getDashboardData.employed }}</strong>
                              </CCallout>
                          </CCol>
                          <CCol sm="3">
                              <CCallout color="danger">
                                  <small class="text-muted">Unemployed Graduates</small><br>
                                  <strong class="h4">{{ getDashboardData.unemployed }}</strong>
                              </CCallout>
                          </CCol>
                      </CRow>
                  </CCol>
              </CRow>
              <br/>
                <CCol sm="7" class="d-none d-md-block">
                </CCol>
  <!--        <MainChartExample style="height:300px;margin-top:40px;"/>-->
              <b-row>
                  <b-col lg="12">
                      <b-row class="justify-content-center">
                          <CChartPieExample :cData="getDashboardData"  style="height:600px; width:600px;"/>
                      </b-row>
                  </b-col>
              </b-row>

        </template>
      </CCardBody>

    </CCard>
      <CRow>
          <CCol sm="6" md="6">
              <CCard>
                  <CCardHeader>
                      Employment / Unemployment Rate by Age
                  </CCardHeader>
                  <CCardBody>
                      <template v-if="getFetchingDashboardState.initial">
                          <b-row class="justify-content-center">
                              <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
                          </b-row>
                      </template>
                      <template v-else>
                        <CChartBarExample :cData="getDashboardData" style="height:400px"/>
                      </template>
                  </CCardBody>
              </CCard>
          </CCol>
          <CCol sm="6" md="6">
              <CCard>
                  <CCardHeader>
                      Employment / Unemployment Rate by Gender
                  </CCardHeader>
                  <CCardBody>
                      <template v-if="getFetchingDashboardState.initial">
                          <b-row class="justify-content-center">
                              <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
                          </b-row>
                      </template>
                      <template v-else>
                        <GenderBarChart :cData="getDashboardData" style="height:400px"/>
                      </template>
                  </CCardBody>
              </CCard>
          </CCol>
      </CRow>
      <CRow>
          <CCol sm="12" md="12">
              <CCard>
                  <CCardHeader>
                      Employment / Unemployment Rate by Year Graduate
                  </CCardHeader>
                  <CCardBody>
                      <template v-if="getFetchingDashboardState.initial">
                          <b-row class="justify-content-center">
                              <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
                          </b-row>
                      </template>
                      <template v-else>
                        <DateGraduated :cData="getDashboardData" style="height:400px"/>
                      </template>
                  </CCardBody>
              </CCard>
          </CCol>
      </CRow>
      <CRow>
          <CCol sm="12" md="12">
              <CCard>
                  <CCardHeader>
                      Job Accuracy of Graduates by Tier
                  </CCardHeader>
                  <CCardBody>
                      <template v-if="getFetchingDashboardState.initial">
                          <b-row class="justify-content-center">
                              <span> <i  class="fa fa-spinner fa-spin fa-3x"></i></span>
                          </b-row>
                      </template>
                      <template v-else>
                          <JobAccuracy :cData="getDashboardData"  style="height:820px; width:820px;"/>
                      </template>
                  </CCardBody>
              </CCard>
          </CCol>
      </CRow>
  </div>
</template>

<script>
import MainChartExample from '../components/charts/MainChartExample'
import CChartPieExample from '../components/charts/CChartPieExample'
import JobAccuracy from '../components/charts/JobAccuracy'
import CChartBarExample from '../components/charts/CChartBarExample'
import GenderBarChart from '../components/charts/GenderBarChart'
import DateGraduated from '../components/charts/DateGraduated'
import WidgetsDropdown from '../components/widgets/WidgetsDropdown'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    MainChartExample,
    CChartPieExample,
    GenderBarChart,
    CChartBarExample,
    DateGraduated,
    JobAccuracy,
    WidgetsDropdown,
  },

  data () {
    return {
      selected: 'Month',
    }
  },

  computed: {
    ...mapGetters([
      "getDashboardData",
      "getFetchingDashboardState",
    ])
  },
  mounted() {
    this.fetchingDashboard()
  },
  methods: {
    ...mapActions([
      "fetchingDashboard"
    ]),
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    }
  }
}
</script>
