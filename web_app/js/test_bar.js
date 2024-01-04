function stackedBar(year) {




  // Fetch the CSV file
  fetch('js/master_merged_df_renamed.csv')
    .then(response => response.text())
    .then(csvData => {
      // Parse the CSV data using PapaParse
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: function (papaResults) {
          // papaResults.data contains the parsed data as an array of objects
          const monthlyData = papaResults.data;

          let samples = monthlyData.samples;
          let data2023 = monthlyData.filter((sample) => sample.Year === 2023);
          let dataVariable = monthlyData.filter((sample) => sample.Year === year);

          const trace1 = {
            x: dataVariable.map(entry => entry.Month).reverse(),
            y: dataVariable.map(entry => entry.cumulativeGross).reverse(),
            type: 'bar',
            marker: { color: '#000000' },
            opacity: .7,
            name: `${year} Cumulative Gross`
          }

          const trace2 = {
            x: dataVariable.map(entry => entry.Month).reverse(),
            y: dataVariable.map(entry => entry.holidayGross).reverse(),
            type: 'bar',
            marker: { color: '#596BC2' },
            opacity: .7,
            name: `${year} Holiday Gross`
          }

          var trace3 = {
            x: data2023.map(entry => entry.Month).reverse(),
            y: data2023.map(entry => entry.cumulativeGross).reverse(),
            mode: 'lines',
            name: 'seagreen',
            opacity: 0.8,
            line: {
              // color: 'rgb(245, 179, 66)',
              width: 6,
              opacity: .1
            },
            name: "2023 Cumulative Gross"
            // marker: { color: '#596BC2' }
          };

          // // Create a stacked bar chart using Plotly
          // const trace1 = {
          //   x: worldwideData.slice(0, 20).map(entry => entry.Rank),
          //   y: worldwideData.slice(0, 20).map(entry => entry.Foreign),
          //   type: 'bar',
          //   name: 'Foreign',
          //   hovertext: worldwideData.slice(0, 20).map(entry => entry['Release Group']),
          //   marker: { color: '#596BC2' }
          // };

          // const trace2 = {
          //   x: worldwideData.slice(0, 20).map(entry => entry.Rank),
          //   y: worldwideData.slice(0, 20).map(entry => entry.Domestic),
          //   type: 'bar',
          //   name: 'Domestic',
          //   hovertext: worldwideData.slice(0, 20).map(entry => entry['Release Group']),
          //   marker: { color: '#BED1E9' }
          // };

          const data = [trace1, trace2, trace3];
          // const data = [trace1, trace2];

          const layout = {
            xaxis: { title: 'Months' },
            yaxis: { title: 'Dollars' },
            legend: { title: '' },
            title: 'Gross Movie Revenue 2023 vs Previous Years',
            // hovermode: 'closest',
            // template: 'plotly_white',
            barmode: 'stack' // Stacked bar chart
          };

          // Render the chart
          Plotly.newPlot('myBar', data, layout);
        }
      });
    })
    .catch(error => console.error('Error fetching the CSV file:', error));
}
stackedBar(2023);