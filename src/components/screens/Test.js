import axios from "axios";
import { Image } from "cloudinary-react";
import { useState } from "react";
import BarChart from "../../BarChart";

const Test = () => {
  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [tesst, setTesst] = useState();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const uploadImage1 = async (formData) => {
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw6kh8vlg/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;
      return imageUrl;
    } catch (error) {
      throw error;
    }
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "assets_quan");
    try {
      const response = await uploadImage1(formData);
      setTesst({ id: response });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tesst);
  return (
    <div>
      <div style={{ width: 700 }}>
        <BarChart  chartData={userData} />
      </div>
      <input type="file" onChange={uploadImage} />
    </div>
  );
};

export default Test;
