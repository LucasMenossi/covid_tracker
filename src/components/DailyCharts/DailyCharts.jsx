import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line} from 'react-chartjs-2';
import moment from 'moment'

import styles from '../Charts/Charts.module.css'

const DailyCharts = ({ data: { daily }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
            ? (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => moment(date, "YYYY-MM-DD").format("DD-MM")),
                        datasets: [{
                            data: dailyData.map(({ daily }) => daily),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }],
                    }}
                    options={{
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Number of cases per day'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        legend: {
                            display: false
                        },
                    }}
                />
                ) : null
    );

    return (
        <div className={styles.container}>
            {country ? null : lineChart}
        </div>
    )
}

export default DailyCharts;