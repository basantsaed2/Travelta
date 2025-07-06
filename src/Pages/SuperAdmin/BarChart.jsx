import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  // ✅ بيانات وهمية ثابتة داخل الكومبوننت
  const All = {
    Jan: 12,
    Feb: 19,
    Mar: 3,
    Apr: 5,
    May: 2,
    June: 10,
    July: 7,
    Aug: 6,
    Sep: 15,
    Oct: 8,
    Nov: 11,
    Dec: 9,
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const values = [
      All.Jan ?? 0,
      All.Feb ?? 0,
      All.Mar ?? 0,
      All.Apr ?? 0,
      All.May ?? 0,
      All.June ?? 0,
      All.July ?? 0,
      All.Aug ?? 0,
      All.Sep ?? 0,
      All.Oct ?? 0,
      All.Nov ?? 0,
      All.Dec ?? 0,
    ];

    const maxValue = Math.max(...values);

    const backgroundColors = values.map((value) =>
      value === maxValue ? "#0D47A1" : "#E5ECF6"
    );

    const data = {
      labels: labels,
      datasets: [
        {
          label: "",
          data: values,
          backgroundColor: backgroundColors,
          borderRadius: 6,
          barThickness: 30,
        },
      ],
    };

    myChartRef.current = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Booking",
            align: "start",
            font: { size: 20 },
            padding: { top: 10, bottom: 20 },
            color:"#0D47A1"
          },
        },
        scales: {
          x: {
            ticks: {
              font: { size: 14 },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: { size: 14 },
            },
          },
        },
      },
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-[90%] h-[300px] p-4 bg-white rounded-lg shadow-lg">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
};

export default BarChart;
