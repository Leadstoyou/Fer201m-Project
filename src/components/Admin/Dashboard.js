import DefaultLayoutDetail from "../layouts/DefaultLayoutDetail";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:9999/api/orders").then((res) => res.json()),
    ]).then(([ordersData]) => {
      setOrders(ordersData);
    });
  }, []);

  const calculateTotalAmountByMonth = (orders) => {
    const totalsByMonth = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderTimestamp = new Date(order.timestamp);
      const orderMonth = orderTimestamp.getMonth();
      const orderYear = orderTimestamp.getFullYear();
      const orderTotal = order.total;

      const monthKey = `${orderYear}-${orderMonth}`;

      if (!totalsByMonth[monthKey]) {
        totalsByMonth[monthKey] = 0;
      }

      totalsByMonth[monthKey] += orderTotal;
    }

    return totalsByMonth;
  };

  function calculateTotalOrdersByMonth(orders) {
    const ordersByMonth = {};

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const orderTimestamp = new Date(order.timestamp);
      const orderMonth = orderTimestamp.getMonth();
      const orderYear = orderTimestamp.getFullYear();

      const monthKey = `${orderYear}-${orderMonth}`;

      if (!ordersByMonth[monthKey]) {
        ordersByMonth[monthKey] = 0;
      }
      console.log(monthKey);
      ordersByMonth[monthKey]++;
    }

    return ordersByMonth;
  }

  const totalsByMonth = calculateTotalAmountByMonth(orders);
  const ordersByMonth = calculateTotalOrdersByMonth(orders);

  const labelsOrderByMonth = [
    "2023-7",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];
  const labelsSaleValue = [
    "2023-7",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];

  const dataSaleValue = {
    labels: labelsSaleValue,
    datasets: [
      {
        label: "Sales value",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [totalsByMonth["2023-6"], 10, 5, 2, 20, 30, 45, 55],
      },
    ],
  };
  const dataOrderByMonth = {
    labels: labelsOrderByMonth,
    datasets: [
      {
        fill: true,
        label: "Orders by month",
        data: [ordersByMonth["2023-6"], 10, 5, 2, 20, 30, 45, 55],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options1 = {
    responsive: true,
    title: "Order by Month",
    aspectRatio: 5,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  };

  return (
    <div className="container border-0">
    <DefaultLayoutDetail>
      <div style={{ width: "500px", height: "200px",display:'flex' }}>
        <Bar data={dataSaleValue} options={options1} />
        <Line options={options1} data={dataOrderByMonth} />;
      </div>
    </DefaultLayoutDetail>
    </div>

  );
};

export default Dashboard;
