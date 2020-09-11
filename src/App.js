import React from 'react';

import { Cards, Charts, CountryPicker, DailyCharts } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {

    state = {
        data: [],
        country: "",
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);

        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state

        return (
            <div className={styles.image} className={styles.container} alt="COVID-19">
                <img src={coronaImage} className={styles.image}/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country}/>
                <DailyCharts data={data} country={country}/>
            </div>
        )
    }
}

export default App;