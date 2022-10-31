import { NavLink } from "react-router-dom";

import MainNavigation from "../layout/MainNavigation";
import classes from "./City.module.css";

const City = (props) => {
  const cities = [
    {
      id: 1,
      name: "Da Nang",
      imageUrl:
        "https://image.thanhnien.vn/w1024/Uploaded/2022/szyrbfly-bn/2021_11_13/da-nang-5242.jpg",
    },
    {
      id: 2,
      name: "Ho Chi Minh",
      imageUrl:
        "https://touristjourney.com/wp-content/uploads/2020/11/Ho-Chi-Minh-City.jpg",
    },
    {
      id: 3,
      name: "Ha Noi",
      imageUrl:
        "https://vietradeportal.vn/trung-tam-thanh-pho-ha-noi-o-dau/imager_11239.jpg",
    },
    {
      id: 4,
      name: "Can Tho",
      imageUrl:
        "https://media.vneconomy.vn/images/upload/2022/03/02/anh-thanh-pho-2-16355899477761013957557.jpg",
    },
    {
      id: 5,
      name: "Hai Phong",
      imageUrl:
        "https://haiphong.gov.vn/upload/haiphong/product/2020/10-2020/Hai-Phong-no-luc-doi-moi-53744.jpg",
    },
    {
      id: 6,
      name: "Hue",
      imageUrl:
        "https://tourdanangcity.vn/wp-content/uploads/2020/08/anh-dai-dien-thanh-pho-hue.jpg?v=1615420996",
    },
    {
      id: 7,
      name: "Nha Trang",
      imageUrl:
        "https://vcdn1-vnexpress.vnecdn.net/2021/03/19/NhaTrang-KhoaTran-27-1616120145.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=P6rNJD2Fm6OK-HTwBviZ4A",
    },
    {
      id: 8,
      name: "Thanh Hoa",
      imageUrl:
        "https://media.vneconomy.vn/images/upload/2022/02/25/thanh-hoa.jpeg",
    },
    {
      id: 9,
      name: "Binh Dinh",
      imageUrl:
        "https://www.icisequynhon.com/wp-content/uploads/2020/05/quynhon-binhdinh.jpg",
    },
    {
      id: 10,
      name: "Quang Tri",
      imageUrl:
        "https://bcp.cdnchinhphu.vn/Uploaded/nguyendieuhuong/2021_02_08/ANH3.jpg",
    },
    {
      id: 11,
      name: "Nghe An",
      imageUrl:
        "http://lienhehotro.vn/wp-content/uploads/2021/08/So-dien-thoai-bao-hiem-xa-hoi-Nghe-An.jpg",
    },
    {
      id: 12,
      name: "Hoi An",
      imageUrl:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/hoi-an-quang-nam-vntrip-1.jpg",
    },
    {
      id: 13,
      name: "Quang Nam",
      imageUrl:
        "https://media.baodautu.vn/Images/hoanganh/2018/09/10/tinh_quang_nam.jpg",
    },
    {
      id: 14,
      name: "Ca Mau",
      imageUrl:
        "https://fileapi.surego.vn//Upload/NewsImage/R637096778929414583.png",
    },
    {
      id: 15,
      name: "An Giang",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/T%C6%B0%E1%BB%A3ng_%C4%91%C3%A0i_B%C3%B4ng_l%C3%BAa_%E1%BB%9F_An_Giang.jpg/1200px-T%C6%B0%E1%BB%A3ng_%C4%91%C3%A0i_B%C3%B4ng_l%C3%BAa_%E1%BB%9F_An_Giang.jpg",
    },
    {
      id: 16,
      name: "Vung Tau",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/dc/Vung_Tau%2C_Viet_Nam_2021.jpg",
    },
    {
      id: 17,
      name: "Da Lat",
      imageUrl:
        "https://vcdn-dulich.vnecdn.net/2022/02/17/273705481-488864585935710-4390-4689-3264-1645093934.jpg",
    },
    {
      id: 18,
      name: "Dong Nai",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Nh%C3%A0_th%E1%BB%9D_ch%C3%ADnh_V%C4%83n_mi%E1%BA%BFu_Tr%E1%BA%A5n_Bi%C3%AAn.jpg",
    },
    {
      id: 19,
      name: "Binh Duong",
      imageUrl:
        "https://thmyphuoc.bencat.edu.vn/uploads/thmyphuoc/news/2018_08/images2601774_bd.jpg",
    },
    {
      id: 20,
      name: "Quang Binh",
      imageUrl:
        "https://dulichkhampha24.com/wp-content/uploads/2020/12/kinh-nghiem-du-lich-quang-binh-c.jpg",
    },
  ];
  return (
    <div className={classes.cityWrapper}>
      <div className={classes.titleWrapper}>
        <h3 className={classes.title}>View properties in popular cities</h3>
        <h3 className={classes.underTitle}>
          We have many properties in many cities.
        </h3>
      </div>

      <div className={classes.cityContainer}>
        {cities.map((city) => (
          <NavLink to={"/properties?city=" + city.name} target={"_blank"}>
            <div key={city.id} className={classes.singleCity}>
              <div
                key={city.id}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${city.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50px",
                }}
              ></div>
              <div className={classes.cityName}>
                <span>{city.name}</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default City;
