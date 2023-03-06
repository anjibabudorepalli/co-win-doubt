import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashBoard extends Component {
  state = {chartData: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getChartsList()
  }

  getChartsList = async () => {
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/covid-vaccination-data',
      options,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(k => ({
          vaccineDate: k.vaccine_date,
          dose1: k.dose_1,
          dose2: k.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(m => ({
          age: m.count,
          count: m.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(p => ({
          count: p.count,
          gender: p.gender,
        })),
      }

      this.setState({chartData: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getFailureVeiw = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  getChartsData = () => {
    const {apiStatus, chartData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = chartData
    console.log(vaccinationByGender)
    switch (apiStatus) {
      case apiConstants.initial:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
          </div>
        )

      case apiConstants.success:
        return (
          <div>
            <VaccinationCoverage data={last7DaysVaccination} />
            <VaccinationByGender data={vaccinationByGender} />
            <VaccinationByAge data={vaccinationByAge} />
          </div>
        )

      case apiConstants.failure:
        return this.getFailureVeiw()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container-1">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="image-logo"
          />
          <h1 className="co-win-head">Co-Win</h1>
        </nav>
        <h1 className="co-win-india">CoWin Vaccination in India</h1>
        <div>{this.getChartsData()}</div>
      </div>
    )
  }
}

export default CowinDashBoard
