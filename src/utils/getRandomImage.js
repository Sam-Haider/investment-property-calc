export default function getRandomHouseImage() {
  const urls = [
    "images/house1.jpg",
    "images/house2.jpg",
    "images/house3.jpg",
    "images/house4.jpg",
    "images/house5.jpg",
    "images/house6.jpg",
    "images/house7.jpg",
    "images/house8.jpg",
    "images/house9.jpg",
    "images/house10.jpg",
    "images/house11.jpg",
  ];
  const index = Math.floor(Math.random() * urls.length);
  const imageName = urls[index];
  return imageName;
}
