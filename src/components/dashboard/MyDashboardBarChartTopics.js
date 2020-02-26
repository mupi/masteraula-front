import React from 'react';
import { Bar } from 'react-chartjs-2';

const MyDashboardBarChartTopics = (props) => {
  const { topics } = props;
  const topicNames = topics.slice(0, 7).map(t => t.name);
  const numberQuestions = topics.slice(0, 7).map(t => t.num_questions);
  // const perQuestions = () => topics.map(t => t.per_questions);
  const dataBarChart = {
    labels: topicNames,
    datasets: [
      {
        label: 'Tópicos',
        backgroundColor: ['#27213C', '#77567A', '#B287A3', '#D6A2AD', '#E3BAC6'],
        borderColor: ['#27213C', '#77567A', '#B287A3', '#D6A2AD', '#E3BAC6'],
        borderWidth: 1,
        data: numberQuestions,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={dataBarChart}
        options={{
          title: {
            display: false,
            text: 'Tópicos e Assuntos',
            fontSize: 20,
          },
          legend: {
            display: false,
            position: 'right',
          },
          scales: {
            xAxes: [{
              ticks: {
                display: false,
              },
            }],
          },
        }}
      />
    </div>
  );
};
export default MyDashboardBarChartTopics;
